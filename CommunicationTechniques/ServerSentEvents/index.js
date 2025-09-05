const express = require('express')
const app = express()
const port = 3000
const { join } = require('node:path')

app.get('/sse', (req, res) => {
//  setup sse logic

res.setHeader('Content-Type','text/event-stream');
res.setHeader('Connection','keep-alive');
res.setHeader('Cache-Control','no-cache');
res.write('data: Welcome to SSE \n\n');

//this is dummy otherwise get updated data from database and write
const intervalId = setInterval(()=>{
    res.write(`data: updated server time ${new Date().toLocaleTimeString()}\n\n`)
},5000)

req.on('close',()=>{
    clearInterval(intervalId);
})
})

app.get('/', (req, res) => {
 res.sendFile(join(__dirname,'index.html'))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
