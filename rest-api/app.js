const express = require("express");

require("dotenv").config();

const app = express();
const port = "3000";
const dishes = require("./dishes.json");
const PWD = process.env.key;

let userLogin = false;

app.use(express.json());

app.get("/info", (request, response) => {
  response.setHeader("Content-Type", "text/html");
  response.writeHead(200);
  response.write("Type one of our dishes after the url like 'dish0'");
  response.end();
});

app.post("/signup", (request, response) => {
  let data = request.body;
  response.send(`The account for user ${data.user} is created.`);
});

app.post("/signin", (request, response, next) => {
  let data = request.query;
  console.log(data.key + " " + PWD);
  if (data.key != PWD) {
    userLogin = false;
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.write("Wrong login pwd!");
    response.send();
  } else {
    userLogin = true;
    response.send("Login successful.");
  }
});

// All the endpoints below this middleware will require to be authenticated
app.use((request, response, next) => {
  if (!userLogin) {
    response.status(401);
    response.send({ error: "You need to log in to access this endpoint" });
  } else next();
});

app.get("/", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  response.send(dishes);
});

app.get("/dish0", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  response.send(dishes.Dish0);
});

app.get("/dish1", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  response.send(dishes.Dish1);
});

app.get("/dish2", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  response.send(dishes.Dish2);
});

app.get("/dish3", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  response.send(dishes.Dish3);
});

app.get("/dish4", (request, response) => {
  console.log(`A request has been submitted to ${request.url}`);

  response.send(dishes.Dish4);
});

app.use((request, response, next) => {
  console.log("No matching route found!");
  next();
});

app.get("*", (request, response) =>
  response.status(404).send({ error: `Not found` })
);

app.listen(port, () => {
  console.log(`Server started on http://127.0.0.1:${port}`);
});
