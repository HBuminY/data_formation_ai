import { log } from "console";
import { find_all_unique_fields, find_all_unique_values, read_data, standartify_data_fields, typeify_data } from "./parser.ts";
import { readJson, readRawText, sendPrompt, writeJson, writeRawText } from "./utils.ts";
import { stringify } from "querystring";
import { formatted_data } from "../types/data_format_types.js";
import { api_parameters } from "../types/ai_api_types.js";
import { generate_unit_regex } from "./unit_extractor.js";


const api_parameters:api_parameters = await readJson("./parameters/model_api_data.json")
const sysPromt:string = await readRawText("./parameters/system_promt.txt")
const data:formatted_data = await readJson('./data/standartized_data.json');
const values = find_all_unique_values(data, 'Kalınlık');

let a = await generate_unit_regex(values, api_parameters, sysPromt)
console.log(a);

/*
let res = await sendPrompt("['Dahili Grafik Modeli', '13.Nesil İşlemciler İçin Intel UHD Grafik']", api_parameters, sysPromt);
console.log(JSON.stringify(res));
*/


/*
let listed_data = await read_data('./data/formatted_laptop_d.txt')
let typified_data = typeify_data(listed_data)
let unique_fields:string[] = find_all_unique_fields(typified_data)
writeJson('./data/unique_fields.json', unique_fields)
let std_data:formatted_data = standartify_data_fields(typified_data, unique_fields)
writeJson('./data/standartized_data.json', std_data)
*/

