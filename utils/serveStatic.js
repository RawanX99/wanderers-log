import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {

  const publicDir = path.join(baseDir, 'public')

  const urlPath = req.url.startsWith('/api') ? '/404.html' : req.url

  const filePath = path.join(
    publicDir,
    urlPath === '/' ? 'index.html' : urlPath
  )

  const ext = path.extname(filePath)
  const contentType = getContentType(ext)

  try {
    const content = await fs.readFile(filePath)
    sendResponse(res, 200, contentType, content)

  } catch (err) {
    console.log(err.code)

    const errPagePath = path.join(baseDir, 'public', '404.html')
    const errPage = await fs.readFile(errPagePath)

    if (err.code === 'ENOENT') {
      sendResponse(res, 404, 'text/html', errPage)
    } else {
      sendResponse(res, 500, 'text/html', `<html><h1>Server Error: ${err.code}</h1></html>`)
    }
  }

}