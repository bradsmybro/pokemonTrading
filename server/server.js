const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);

const mongoose = require("mongoose");

// connect to the database
mongoose.connect("mongodb://localhost:27017/pokemon", {
  useNewUrlParser: true
});
//Also not needed i think
// Configure multer so that it will upload to '/public/images'

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const pokemon = require("./pokemon.js");
app.use("/api/pokemon", pokemon.routes);

const users = require("./users.js");
app.use("/api/users", users.routes);

app.listen(3003, () => console.log("Server listening on port 3003!"));
