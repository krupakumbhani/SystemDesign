const express = require("express");
const app = express();
const port = 3000;

let data = "initial data";       // Current shared data
const waitingClients = [];       // List of pending client responses

// Serve HTML page
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Long polling endpoint
app.get("/getdata", (req, res) => {
  const lastdata = req.query.lastdata;

  if (data !== lastdata) {
    // If data is new → respond immediately
    res.json({ data });
  } else {
    // Else → keep request open (waiting for update)
    waitingClients.push(res);

    // Safety: timeout after 30s (prevent hanging forever)
    setTimeout(() => {
      const index = waitingClients.indexOf(res);
      if (index !== -1) {
        waitingClients.splice(index, 1);
        res.json({ data: lastdata }); // No change, return old data
      }
    }, 30000);
  }
});

// Update data endpoint
app.get("/updatedata", (req, res) => {
  data = req.query.data;

  // Notify all waiting clients
  while (waitingClients.length > 0) {
    const client = waitingClients.pop();
    client.json({ data });
  }

  res.send({ success: "data has been updated" });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
