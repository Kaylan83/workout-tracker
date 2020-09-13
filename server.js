const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use(express.static("public"));

// If deployed, use the deployed database. Otherwise use the local workout database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/workout";

// Connect to the Mongo DB
mongoose.connect(MONGODB_URI)

require("./routes/htmlRoutes.js")(app);
require("./routes/apiRoutes.js")(app);

app.listen(PORT, function() {
  console.log(`Now listening on port: ${PORT}`);
})