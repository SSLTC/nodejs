const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = "3000";

function send404response(response, err) {
  response.setHeader("Content-Type", "text/html");
  response.writeHead(404);
  response.write("ERROR 404: ");
  response.end(err.message);
}

app.get("/", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  const contentType = request.headers.accept.split(",")[0];
  let filePath = `./client${request.url}`;

  if (contentType == "text/html") {
    filePath = path.join("./client", request.url, "index.html");
  }
  if (contentType == "text/css") {
    let subFolder = path.basename(request.headers.referer);
    if (!subFolder.includes(port)) {
      filePath = path.join("./client", subFolder, request.url);
    }
  }
  console.log(filePath);
  const stream = fs.createReadStream(filePath);
  stream.once("readable", () => {
    response.setHeader("Content-Type", contentType);
    response.writeHead(200);
    stream.pipe(response);
  });

  stream.on("error", (err) => {
    send404response(response, err);
  });
});

app.get("/about", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  const contentType = request.headers.accept.split(",")[0];
  let filePath = `./client${request.url}`;

  if (contentType == "text/html") {
    filePath = path.join("./client", request.url, "index.html");
  }
  if (contentType == "text/css") {
    let subFolder = path.basename(request.headers.referer);
    if (!subFolder.includes(port)) {
      filePath = path.join("./client", subFolder, request.url);
    }
  }
  console.log(filePath);
  const stream = fs.createReadStream(filePath);
  stream.once("readable", () => {
    response.setHeader("Content-Type", contentType);
    response.writeHead(200);
    stream.pipe(response);
  });

  stream.on("error", (err) => {
    send404response(response, err);
  });
});

app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
