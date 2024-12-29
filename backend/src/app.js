require("dotenv").config();
const express = require("express");
const expressSanitizer = require("express-sanitizer");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(expressSanitizer());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "123456",
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/", express.static("public"));

passport.use(require("./strategies/localStrat"));
passport.use(require("./strategies/jwtStrat"));

app.use(passport.initialize());
app.use(passport.session());

app.use("/categories", require("./routes/categoryRoutes"));
app.use("/musical_instruments", require("./routes/musicalInstrumentRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/carts", require("./routes/cartRoutes"));
app.use("/auth", require("./routes/authRoutes"));

module.exports = app;
