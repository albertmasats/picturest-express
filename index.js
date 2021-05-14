const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");

global.appRoot = path.resolve(__dirname);

const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by");

const persimon = require("./utils/persimon");
const db = persimon("/resources/pins/pins.json"); // Relative to the project root

app.get("/test", (request, response) => {
  response.send("Soy un test!");
});

app.get("/numero/:numero", (request, response) => {
  const numero = request.params.numero;
  response.status(200).json(numero);
});

app.post("/miPrimerPost", (request, response) => {
  const body = request.body;
  response.status(200).json(body);
});

app.post("/suma", (request, response) => {
  const body = request.body;
  const suma = body.a + body.b;
  response.status(404).json({ "el resultado": suma });
});

app.get("/pins", (request, response) => {
  const pins = db.all();
  response.json(pins);
});

app.get("/pins/:id", (request, response) => {
  const pin = db.get(request.params.id);
  if (pin) {
    return response.status(200).json(pin);
  }
  return response.status(404).json({ error: "pin not found" });
});

app.post("/createPin", (request, response) => {
  const entities = db.create(request.body);
  response.status(201).json(entities);
});

const start = async () => {
  try {
    app.listen(5000, () => {
      console.log(`REST API on http://localhost:5000/api`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
