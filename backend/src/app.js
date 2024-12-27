const express = require("express");
const expressSanitizer = require("express-sanitizer");
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());

app.use("/", express.static("public"));

app.use("/categories", require("./routes/categoryRoutes"));
app.use("/musical_instruments", require("./routes/musicalInstrumentRoutes"));
app.use("/users", require("./routes/userRoutes"));

module.exports = app;
