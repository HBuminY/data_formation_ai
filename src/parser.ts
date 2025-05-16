import { PathLike } from 'fs';
import { readRawText } from "./utils";
import * as Types from '../types/data_format_types'
import { features } from 'process';
import { log } from 'console';

export async function read_data(directory:PathLike){
    let rawdata:string = await readRawText(directory)
    let listed_data:string[] = rawdata.split('\n')
    return listed_data;
}


export function typeify_data(listed_data: string[]): Types.formatted_data {
    let formatted_data: Types.formatted_data = [];
    
    for (let i = 0; i < listed_data.length; i+=2) {
      let featuresList:Types.featureField[]=[]
      let features_json:Types.d_specsObj = JSON.parse(listed_data[i+1]);
      let features_obj_list:Types.d_featureObj[] = features_json.features;

      features_obj_list.forEach((n:Types.d_featureObj)=>{
        let feature:Types.featureField={
          featureName: n.key,
          featureValue: n.val,
        }
        featuresList.push(feature)
      });

      let productInfo:Types.productInfo={
        productName:listed_data[i],
        features:featuresList
      }
      formatted_data.push(productInfo);
    }

    return formatted_data; 
}


export function find_all_unique_fields(formatted_data:Types.formatted_data){
    let unique_fields:string[]=[];
    formatted_data.forEach((n:Types.productInfo)=>{
      n.features.forEach((nn)=>{
        let fn = nn.featureName;
        if(!unique_fields.includes(fn)){
          unique_fields.push(fn)
        }
      })
    })
    return unique_fields;
}

export function find_all_unique_values(formatted_data:Types.formatted_data, key:string){
  let unique_values:string[] = [];

  formatted_data.forEach((product:Types.productInfo)=>{
    product.features.forEach((feature:Types.featureField)=>{
      if(!unique_values.includes(feature.featureValue) && feature.featureName==key){
        unique_values.push(feature.featureValue);
      }
    })
  })

  return unique_values;
}

export function standartify_data_fields(formatted_data:Types.formatted_data, unique_fields:string[]){
  //makes sure all products share the same feature fields
  //other_features field is used as an escape
  let standartified_data:Types.formatted_data=[]
  
  for (let i = 0; i < formatted_data.length; i++) {
    let d_product = formatted_data[i]
    
    //create one to one product from original with empty unique fields
    let std_product:Types.productInfo={
      productName: d_product.productName,
      features: []
    } 

    unique_fields.forEach((n:string)=>{
      let field:Types.featureField={
        featureName: n,
        featureValue: ''
      }
      std_product.features.push(field)
    })

    //fill up empty fields if name matches from the original
    d_product.features.forEach((og_field:Types.featureField)=>{
      
      let matching_field = std_product.features.find(
        (std_field:Types.featureField)=>{
           return std_field.featureName == og_field.featureName
        }
      )


      if(matching_field!=undefined){
        matching_field.featureValue = og_field.featureValue;
      }else{
        if(!std_product.otherFeatures){std_product.otherFeatures=[]}
        std_product.otherFeatures.push(og_field)
      }
      
    })
   standartified_data.push(std_product); 
  }
  return standartified_data;
}