import path from 'node:path'
import fs from 'node:fs/promises'

export async function getData() {

  try{

    const content=JSON.parse(await fs.readFile('./data/data.json','utf8'));
    return content;
    
  }catch(err){
    return []
  }


}