import { PathLike } from 'fs';
import * as fsp from 'fs/promises'; 
import * as fs from 'fs'
import { api_parameters } from '../types/ai_api_types';

export async function readJson(directory: PathLike){
    if(!fs.existsSync(directory)){return false}
    try {
        const data = await fsp.readFile(directory, 'utf-8');
        const result = JSON.parse(data);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function writeJson(directory: PathLike | fsp.FileHandle, data:any){
    let dataStr:string = JSON.stringify(data, null, "  "); 
    try {
        await fsp.writeFile(directory, dataStr)
    } catch (err) {
        throw err;
    }
}

export async function readRawText(directory: PathLike | fsp.FileHandle):Promise<string>{
    try {
        const data = await fsp.readFile(directory, 'utf-8');
        const result = data;
        return result;
    } catch (err) {
        throw err;
    }
}

export async function writeRawText(directory: PathLike | fsp.FileHandle, data:string){
    try {
        await fsp.writeFile(directory, data)
    } catch (err) {
        throw err;
    }
}

export async function sendPrompt(promptText: string, endPData:api_parameters, sysPromt: string){
    if (!endPData) throw new Error("Missing endpoint data");
    
    let endpoint = endPData.endpoint;
    let modelID = endPData.modelID;
    let temperature = endPData.temperature;
    let max_tokens = endPData.max_tokens;
    let dostream = endPData.dostream;

    const headers = new Headers({
        "Content-Type": "application/json",
    });
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify({
                messages: [ 
                    { "role": "system", "content": sysPromt },
                    { "role": "user", "content": promptText }
                ], 
                model: modelID,
                temperature: temperature,
                max_tokens: max_tokens,
                stream: dostream
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Fetch error:", error);
        throw error;
    }
}
