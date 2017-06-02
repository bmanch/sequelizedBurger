var express = require("express");
var router = express.Router();
var db = require("../models");
var path = require("path");

router.get("/", function(req, res) {
	db.hamburgers.findAll({ order: "burger_name ASC" }).then(function(dbHamburgers) {
		var hbsObject = {
			burgers: [],
			customers: []
		};
		for (var i = 0; i < dbHamburgers.length; i++) {
			hbsObject.burgers.push(dbHamburgers[i].dataValues);
		}
		db.customers.findAll({ order: "customer_name ASC" }).then(function(dbCustomers) {
			for (var j = 0; j < dbCustomers.length; j++) {
				hbsObject.customers.push(dbCustomers[j].dataValues)
			}
			res.render("index", hbsObject);
		});
	});
});

router.post("/", function(req, res) {
	db.hamburgers.create({
		burger_name: req.body.burgerName
	}).then(function(dbHamburgers) {
		res.redirect("/");
	});
});

// Question: I tried this code, and tried navigating to it as a redirect from the put method below. But it didn't work, so I had to put it in the put method below. I wonder if you have any thoughts on it?
// router.post("/customer", function(req, res) {
// 	db.customers.create({
// 		customer_name: req.body.customer,
// 		burgers_eaten: req.body.number
// 	}).then(function(dbCustomers) {
// 		res.redirect("/");
// 	});
// });

router.put("/:id", function(req, res) {
	db.hamburgers.update({
		devoured: req.body.devoured
	}, {
		where: {
			id: req.params.id
		}
	}).then(function(dbHamburgers) {
		db.customers.create({
			customer_name: req.body.customer,
			burgers_eaten: req.body.number
		}).then(function(dbCustomers) {
			res.redirect("/");
		});
	});
});

router.delete("/:id", function(req, res) {
	db.hamburgers.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(dbHamburgers) {
		res.redirect("/");
	});
});

router.delete("/customers/:id", function(req, res) {
	db.customers.destroy({
		where: {
			id: req.params.id
		}
	}).then(function(dbCustomers) {
		res.redirect("/");
	});
});

router.get("/test", function(req, res) {
	res.sendFile(path.join(__dirname, "/../public/test.html"));
});

module.exports = router;