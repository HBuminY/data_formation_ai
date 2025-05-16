//internal usage types
export interface featureField{
  featureName:string,
  featureValue:string,
  featureUnit?:any
}


export interface productInfo{
  productName:string,
  features:featureField[],
  otherFeatures?:featureField[],
}

export type formatted_data = productInfo[]

//external expected types
export interface d_featureObj{
  key:string,
  val:string
}

export interface d_specsObj{
  features:d_featureObj[]
}