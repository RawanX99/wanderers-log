import { EventEmitter } from 'node:events'
import { createAlert } from '../utils/createAlert.js'

export const storyEvents = new EventEmitter()

storyEvents.on('story-added', createAlert)
