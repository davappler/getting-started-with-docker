import express from "express";

import os from "os";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`Hello world from the ${os.hostname()}`);
});

app.listen(PORT, () => {
  console.log(`Web server is listening on ${PORT}`);
});
