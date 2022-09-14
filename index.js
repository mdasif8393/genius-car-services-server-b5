const express = require("express");
const port = process.env.port || 5000;
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Running port 5000");
});

app.listen(port, () => {
  console.log("Running server");
});
