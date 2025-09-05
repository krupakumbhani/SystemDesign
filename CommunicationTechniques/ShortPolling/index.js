const express = require("express");
const app = express();
const port = 3000;
let data = "initial data";
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.get("/getdata", (req, res) => {
  res.send({ data });
});
// use put/post to update data
app.get("/updatedata", (req, res) => {
    data="updated data";
    res.send({ data });
  });
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
