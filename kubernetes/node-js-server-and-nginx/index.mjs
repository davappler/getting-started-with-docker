import express from "express";
import fetch from "node-fetch";
import os from "os";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send(`Version 2: Hello world from the ${os.hostname()}`);
});

app.get("/nginx", async (req, res) => {
  const url = "http://nginx"; // connecting to another service via the name of the service 'nginx'
  const response = await fetch(url);
  const body = await response.text();
  res.send(body);
});

app.listen(PORT, () => {
  console.log(`Web server is listening on ${PORT}`);
});
