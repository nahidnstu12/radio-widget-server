var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var passport = require("passport");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieSession = require("cookie-session");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
var radio = require("./routes/radio");
var auth = require("./routes/auth");
require("dotenv").config();
require("./service/passport-setup");

var app = express();

// database connection
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful!"))
  .catch((err) => console.log(err));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());

// Initializes passport and passport sessions
app.use(
  require("express-session")({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// For an actual app you should configure this with an experation time, better keys, proxy and secure
// app.use(cookieSession({
//     name: 'tuto-session',
//     keys: ['key1', 'key2']
//   }))
// swagger options
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "RadioStaion Api Server",
      description:
        "A REST API built with Express and MongoDB. This API provides Radio Stations functionality.",
    },
  },
  apis: ["./routes/radio.js"],
};

app.use("/api", auth);
app.use("/api/stations", radio);
// app.use("/api/oauth/token", oauth2.token);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.status(404);
  res.json({
    error: "Not found",
  });
  return;
});

// Error handlers
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    error: err.message,
  });
  return;
});
// console.log(process.env.COOKIE_NAME);
//create server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});

module.exports = app;
