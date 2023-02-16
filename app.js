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

const sendFile = (request, response) => {
  const stream = fs.createReadStream(request.filePath);
  stream.once("readable", () => {
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    stream.pipe(response);
  });

  stream.on("error", (err) => {
    send404response(response, err);
  });
};

app.get(
  "/",
  (request, response, next) => {
    console.log(`A request has been submitted to ${request.url}`);

    request.filePath = path.join("./client", "index.html");

    next();
  },
  sendFile
);

app.get(
  "/about",
  (request, response, next) => {
    console.log(`A request has been submitted to ${request.url}`);
    const filePath = path.join("./client", "about", "index.html");
    request.filePath = filePath;
    next();
  },
  sendFile
);

app.get(
  "/blog",
  (request, response, next) => {
    console.log(`A request has been submitted to ${request.url}`);
    const filePath = path.join("./client", "blog", "index.html");
    request.filePath = filePath;
    next();
  },
  sendFile
);

app.get(
  "/contact",
  (request, response, next) => {
    console.log(`A request has been submitted to ${request.url}`);
    const filePath = path.join("./client", "contact", "index.html");
    request.filePath = filePath;
    next();
  },
  sendFile
);

app.get(
  "/style.css",
  (request, response, next) => {
    console.log(`A request has been submitted to ${request.url}`);

    let subFolder = path.basename(request.headers.referer);

    filePath = path.join(
      "./client",
      !subFolder.includes(port) ? subFolder : "",
      "style.css"
    );
    request.filePath = filePath;
    next();
  },
  sendFile
);

app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
