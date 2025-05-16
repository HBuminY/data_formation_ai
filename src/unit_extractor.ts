import { readJson } from "./utils";

export const general_regexes = {
    numbers : '/^-?\d{1,3}(?:,\d{3})*(\.\d+)?$/'
}

export let unit_regexes = {
    
}


{let unit_regexes_from_file = await readJson('./data/unit_regexes.json')
if(unit_regexes_from_file){
    unit_regexes_from_file = JSON.parse(unit_regexes_from_file)
    unit_regexes = unit_regexes_from_file
}}


export function generate_unit_regex(value_arr:string[]){
    
}

export function extract_unit(text:string, unit_regx:string){
    let found_units = text.match(unit_regx);
    return found_units;
}

export function extract_number(text:string){
    let numbers = text.match(general_regexes.numbers)
    return numbers;
}