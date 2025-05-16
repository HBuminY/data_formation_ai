import { api_parameters } from "../types/ai_api_types";
import { readJson, sendPrompt } from "./utils";


//OBJECTS
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


//FUNCTIONS
export async function generate_unit_regex(value_arr:string[], api_parameters:api_parameters, sys_promt){
    let promt = '';
    promt+='This is the list of all possible values that will be parsed:';
    promt+=JSON.stringify(value_arr);
    promt+=`
        you need to find if there is a unit thats being used in all of 
        these values and give me a regex(regular expression) that will find said unit in any of given examples 
        when used with a javascript string.match() function.
    `
    let answer = await sendPrompt(promt, api_parameters, sys_promt);
    return answer;
}

export function extract_unit(text:string, unit_regx:string){
    let found_units = text.match(unit_regx);
    return found_units;
}

export function extract_number(text:string){
    let numbers = text.match(general_regexes.numbers)
    return numbers;
}