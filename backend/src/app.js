require("dotenv").config();
const express = require("express");
const expressSanitizer = require("express-sanitizer");
const session = require("express-session");
const passport = require("passport");

const app = express();

require("./config/passport");


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
app.use("/orders", require("./routes/orderRoutes"));
app.use("/test", require("./routes/testRoutes"));

module.exports = app;
