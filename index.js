const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const pins = require('./src/pins/pins.router');

global.appRoot = path.resolve(__dirname);
const app = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
app.disable("x-powered-by Nuclio");

app.use('/pins', pins);

const start = async () => {
  try {
    app.listen(5001, () => {
      console.log(`REST API on http://localhost:5001/`);
    });
  } catch (e) {
    console.error(e);
  }
};

start();
