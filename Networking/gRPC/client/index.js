// Import the gRPC client (we created earlier to talk to gRPC server)
const client = require('./client');

// Node.js built-in path module (not used here yet but usually helpful for paths)
const path = require('path');

// Express framework for REST API
const express = require('express');

// Middleware to parse incoming request bodies (JSON & form data)
const bodyParser = require('body-parser');

// Create an Express application
const app = express();

// Port number where this REST API will run
const port = 3000;

// Register middleware to parse JSON bodies
app.use(bodyParser.json());

// Register middleware to parse URL-encoded form bodies
app.use(bodyParser.urlencoded({ extended: false }));

// GET API - fetch all customers
// Calls the gRPC method `getAll` from our gRPC client and sends response to browser
// Fetch all customers
app.get('/', (req, res) => {
  client.GetAll({}, (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data.customers);
  });
});

// Create
app.post('/create', (req, res) => {
  client.Insert(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});

// Update
app.post('/update', (req, res) => {
  client.Update(req.body, (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});

// Remove
app.post('/remove', (req, res) => {
  client.Remove({ id: req.body.id }, (err, data) => {
    if (err) return res.status(500).send(err);
    res.send(data);
  });
});


// Start Express REST API server
app.listen(port, () => {
  console.log(`🚀 REST API listening at http://localhost:${port}`);
});
