import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet, handlePost,handleNews} from './handlers/routeHandlers.js'
import { sendResponse } from './utils/sendResponse.js'

const PORT=3000

const __dirname = import.meta.dirname

const server=http.createServer(async (req, res) => {
    if (req.url === '/api') {
        if (req.method === 'GET') {
            return handleGet(res)
        }
        else if (req.method === 'POST') {
            return await handlePost(req, res)        
        }
        else {
      //api was hit with an unsupported method (e.g. DELETE, PUT)
        return sendResponse(res, 405, 'application/json', JSON.stringify({
        error: `Method ${req.method} is not supported. Use GET or POST.`
    }))
        }
    } else if (req.url === "/api/news") {

        return await handleNews(req, res)
    
    }
    else{
        return await serveStatic(req, res, __dirname) 
    }
}) 

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`))