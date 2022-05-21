var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var passport = require("passport");
const mongoose = require("mongoose");

const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

var radio = require("./routes/radio");

var app = express();

// database connection
mongoose
  .connect("mongodb://localhost/stations", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection Successful!"))
  .catch((err) => console.log(err));


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

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
// app.use("/", api);
// app.use("/api", api);
app.use("/api/station", radio);
// app.use("/api/oauth/token", oauth2.token);

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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
console.log(process.env.APP_NAME)
//create server
app.listen(3100, () => {
  console.log(`Example app listening on port ${3100}`);
});

module.exports = app;
