const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000
// Middleware: parse incoming requests with JSON payloads
app.use(bodyParser.json());
// Webhook endpoint (POST request)
// This will be triggered when an external service sends data to your server
app.post('/webhook', (req,res)=>{
const payload = req.body; // Extract the JSON payload

//any logic
console.log('recived webhook payload ', payload);

// Send back a success response to acknowledge the webhook
res.status(200).send('webhook recieved successfully ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
