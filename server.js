var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var exphbs = require("express-handlebars");
var routes = require("./controllers/burgers_controller.js");
var app = express();
var PORT = process.env.PORT || 3030;
var db = require("./models");

app.use(express.static(path.join(__dirname + "/public")));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use("/", routes);

db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, console.log("Listening on port: " + PORT));
});