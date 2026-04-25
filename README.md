# Wanderer's Log
 
A backend-focused web server built with **Node.js** — no frameworks, just native Node from scratch.
 
## Tech Stack
- Node.js native `http`, `fs/promises`, `crypto`, `events`
- `sanitize-html` for XSS prevention

🔗 [Live Demo](https://wanderers-log.onrender.com)
 
> ⚠️ First load may take ~30 seconds
 
------------------------------------------------------------

 ## Key Concepts
- Manual routing and HTTP server from scratch
- Streamed POST body parsing
- Server-Sent Events (SSE) for real-time data
- File system storage with `fs/promises`
- Server-side sanitization and validation
- UUID generation with `crypto.randomUUID()`
- Custom 404, 405, and 500 error handling
- Event-driven architecture with `EventEmitter`

------------------------------------------------------------

- ## Run Locally
```bash
npm install
npm start
# http://localhost:3000
```


Built as part of the [Scrimba](https://scrimba.com) Node.js course.
