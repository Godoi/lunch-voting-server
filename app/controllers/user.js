const express = require("express");
const router = express.Router({ mergeParams: true });
const userService = require("../services/user");
const errorHandler = require("../handlers/errorHandler");

router.get("/", function (req, res) {
	try {
		const users = userService.getAllUsers().map((user) => formatter(user));
		res.send({ users });
	} catch (error) {
		errorHandler(error, res);
	}
});

router.post("/login", function (req, res) {
	try {
		const { username, password } = req.body;
		const user = userService.getUserByUsernameAndPassword(username, password);

		res.send({ user: formatter(user) });
	} catch (error) {
		errorHandler(error, res);
	}
});

const formatter = (user) => {
	const newUser = { ...user };
	delete newUser.password;
	return newUser;
};

module.exports = router;
