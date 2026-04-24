import {getData} from '../utils/getData.js'
import fs from 'node:fs/promises'
import path from 'node:path'
import sanitizeHtml from 'sanitize-html';
import { randomUUID } from 'node:crypto';



export async function addNewStory(newStory) {

  try {
    const data=await getData();
    const filePath=path.join('data','data.json');
    // console.log(data);
    const storyWithId = { uiid: randomUUID(), ...newStory }
    data.push(storyWithId);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    throw new Error(err)
  }

}








