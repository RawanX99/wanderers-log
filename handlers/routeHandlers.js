import { getData } from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js'
import { parseJSONBody } from '../utils/parseJSONBody.js'
import { addNewStory } from '../utils/addNewStory.js'
import { sanitizeInput } from '../utils/sanitizeInput.js'
import { storyEvents } from '../events/storyEvents.js'
import { stories } from '../data/stories.js'


// handleGet
export async function handleGet(res) {
  const data = await getData()
  
  const content = JSON.stringify(data)
  sendResponse(res, 200, 'application/json', content)
}

// handlePost

export async function handlePost(req, res) {
      try {
    const parsedBody = await parseJSONBody(req)  

    const sanitizedBody= sanitizeInput(parsedBody)    
    await addNewStory(sanitizedBody)
    storyEvents.emit('story-added', sanitizedBody)
    sendResponse(res, 201, 'application/json', JSON.stringify(sanitizedBody))
  } catch (err) {
    sendResponse(res, 400, 'application/json', JSON.stringify({error: err}))
  }

}

// handleNews

export async function handleNews(req, res) {
  res.statusCode = 200

  res.setHeader("Content-Type", "text/event-stream")
  res.setHeader("Cache-Control", "no-cache")
  res.setHeader("Connection", "keep-alive")


  const interval=setInterval(() => {
    let randomIndex = Math.floor(Math.random() * stories.length)

    res.write(
      `data: ${JSON.stringify({
        event: 'news-update',
        story: stories[randomIndex]
      })}\n\n`
    )

  }, 3000)

  req.on('close', () => {
    clearInterval(interval)
  })
}
