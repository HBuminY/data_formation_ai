import { PathLike } from 'fs';
import * as fs from 'fs/promises'; 

export async function readJson(directory: PathLike | fs.FileHandle){
    try {
        const data = await fs.readFile(directory, 'utf-8');
        const result = JSON.parse(data);
        return result;
    } catch (err) {
        throw err;
    }
}

export async function writeJson(directory: PathLike | fs.FileHandle, data:any){
    let dataStr:string = JSON.stringify(data, null, "  "); 
    try {
        await fs.writeFile(directory, dataStr)
    } catch (err) {
        throw err;
    }
}

export async function readRawText(directory: PathLike | fs.FileHandle):Promise<string>{
    try {
        const data = await fs.readFile(directory, 'utf-8');
        const result = data;
        return result;
    } catch (err) {
        throw err;
    }
}

export async function writeRawText(directory: PathLike | fs.FileHandle, data:string){
    try {
        await fs.writeFile(directory, data)
    } catch (err) {
        throw err;
    }
}

export async function sendPrompt(promptText: string, endPData: { endpoint: any; modelID: any; temperature: any; max_tokens: any; dostream: any; }, sysPromt: string){
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
