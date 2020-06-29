const express = require("express");
const router = express.Router({ mergeParams: true });
const restaurantService = require("../services/restaurant");
const userService = require("../services/user");
const errorHandler = require("../handlers/errorHandler");

router.get("/winners", function (req, res) {
	try {
		const winners = restaurantService.getWinners();
		if (!winners) {
			const error = new Error("Nenhum restaurante votado ainda!");
			error.status = 404;
			throw error;
		}
		const restaurants = Object.keys(winners).reduce(
			(obj, weekDay) =>
				Object.assign(
					{ [weekDay]: winners[weekDay] !== null ? formatter(winners[weekDay], weekDay) : null },
					obj
				),
			{}
		);
		res.send({ winners: restaurants });
	} catch (error) {
		errorHandler(error, res);
	}
});

router.get("/winner/:weekDay", function (req, res) {
	try {
		const { weekDay } = req.params;
		const restaurantWinner = restaurantService.getTodayWinner(weekDay);
		if (!restaurantWinner) {
			const error = new Error("Nenhum restaurante votado ainda!");
			error.status = 404;
			throw error;
		}
		const restaurant = formatter(restaurantWinner, weekDay);
		res.send({ restaurant });
	} catch (error) {
		errorHandler(error, res);
	}
});

router.get("/:weekDay", function (req, res) {
	try {
		const { weekDay } = req.params;
		const restaurants = restaurantService.getAllRestaurants().map((restaurant) => formatter(restaurant, weekDay));
		res.send({ restaurants });
	} catch (error) {
		errorHandler(error, res);
	}
});

router.post("/", function (req, res) {
	try {
		const { email, restaurant_id } = req.body;

		const user = userService.getUserByEmail(email);
		const restaurant = restaurantService.setVote(user, restaurant_id);
		res.send({ restaurant });
	} catch (error) {
		errorHandler(error, res);
	}
});

const formatter = (restaurant, weekDay) => {
	const newRestaurant = { ...restaurant };
	if (Object.keys(newRestaurant.votes).length) {
		newRestaurant.votes = {
			emails: newRestaurant.votes[weekDay].votes,
			total: newRestaurant.votes[weekDay].total,
		};
	}
	return newRestaurant;
};

module.exports = router;
