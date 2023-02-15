const http = require("http");
const path = require("path");
const fs = require("fs");
const port = "3000";

function send404response(response, err) {
  response.setHeader("Content-Type", "text/html");
  response.writeHead(404);
  response.write("ERROR 404: ");
  response.end(err.message);
}

const server = http.createServer();

server.on("request", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);
  if (request.method == "GET") {
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

    const stream = fs.createReadStream(filePath);
    stream.once("readable", () => {
      // If the stream becomes readable, then set the Content-Type header and a 200 OK status.
      // Then pipe the file reader stream to the response. The pipe will automatically call response.end() when the stream ends.
      response.setHeader("Content-Type", contentType);

      response.writeHead(200);
      stream.pipe(response);
      // .pipe() feeds a readable stream into a writable stream so that as the contents are incrementally read from the readable stream,
      // they are automatically forwarded to the writable stream. It manages the reading from one stream and writing to another stream automatically for you.
    });

    stream.on("error", (err) => {
      send404response(response, err);
    });
  }
});

server.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
