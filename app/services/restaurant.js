const moment = require("moment");
moment.locale("en");
moment.updateLocale("en", {
	weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
});

let currentWeek = moment().week();

const restaurants = [
	{
		id: 1,
		name: "Coco Bambu - Porto Alegre",
		rating: "Avaliação: 4.4",
		menu: "Frutos Do Mar",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/201910292239_11ac6a47-0bcb-4aa2-8e0f-2181bb73f643.png",
	},
	{
		id: 2,
		name: "Divino Fogão - Manauara",
		rating: "Avaliação: 4.0",
		menu: "Brasileira",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/1b7282d7-e2ea-4a43-b6e0-c9590ea9f3e5/202005221311_e2gT_i.jpg",
	},
	{
		id: 3,
		name: "Jeronimo - Bela Vista",
		rating: "Avaliação: 4.2",
		menu: "Lanches",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/ee615fd4-9b9a-49fe-91ba-15a9adf5da5d/202005281945_V6R2_i.png",
	},
	{
		id: 4,
		name: "Severo Xis & Dogs - Centro",
		rating: "Avaliação: 4.7",
		menu: "Lanches",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/dbb2436a-3d26-414c-9b6d-b8275ef0965e/202005281424_324N_i.jpg",
	},
	{
		id: 5,
		name: "Croasonho - Poa Iguatemi",
		rating: "Avaliação: 4.9",
		menu: "Lanches",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/ae4a638f-e8a9-4363-804f-47537d75df0f/201906241149_KIZx_i.png",
	},
	{
		id: 6,
		name: "Black Beef - Protásio",
		rating: "Avaliação: 4.8",
		menu: "Lanches",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/e701c100-f0df-43b3-b0df-cb924ea02804/202001150924_gUDR_.jpeg",
	},
	{
		id: 7,
		name: "Madero Anita Garibaldi",
		rating: "Avaliação: 4.8",
		menu: "Lanches",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/7f13f154-58ea-4d86-82a4-d9508d21d392/202005141738_F8tC_i.jpg",
	},
	{
		id: 8,
		name: "Applebee's - Central de Delivery",
		rating: "Avaliação: 4.4",
		menu: "Variada",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/4b20c825-d89e-4d5b-800e-5789548c5961/201910161555_fTtt_i.png",
	},
	{
		id: 9,
		name: "Habib's - Mostardeiro",
		rating: "Avaliação: 3.4",
		menu: "Lanches",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/b3a1addf-63c1-4105-95a1-ee770a95c0ce/201912161810_pKEp_i.jpg",
	},
	{
		id: 10,
		name: "Ben & Jerry´s - Iguatemi Porto Alegre",
		rating: "Avaliação: 4.3",
		menu: "Sorvetes",
		votes: {},
		logo:
			"https://static-images.ifood.com.br/image/upload/t_thumbnail/logosgde/561c1a23-3bda-44d3-88e7-92053c2fbcc2/202003171203_432T_i.png",
	},
];

const winners = moment.weekdaysShort().reduce((obj, val) => {
	return Object.assign({ [val]: 0 }, obj);
}, {});

const clear = () => {
	Object.keys(winners).forEach((val) => (winners[val] = 0));
	restaurants.forEach((val) => {
		val.votes = Object.keys(winners).reduce(
			(obj, weekDay) => Object.assign({ [weekDay]: { votes: [], total: 0 } }, obj),
			{}
		);
	});
};

const checkShouldCleanData = () => {
	if (currentWeek !== moment().week()) {
		clear();
		currentWeek = moment().week();
	}
};

const getCurrentDayToVote = () => {
	const weekDay = moment().hours() < 12 ? moment().weekday() : moment().weekday() + 1;
	return moment.weekdaysShort(weekDay);
};

const restaurantHasBeenWinner = (restaurantId) => {
	const currentDay = getCurrentDayToVote();
	const restaurant = Object.keys(winners).filter(
		(weekDay) => weekDay !== currentDay && winners[weekDay] === restaurantId
	);
	return !!restaurant && restaurant.length > 0;
};

const userHasVoteToday = (userEmail) => {
	const votes = restaurants.filter(
		(restaurant) =>
			restaurant.votes[getCurrentDayToVote()] && restaurant.votes[getCurrentDayToVote()].votes.includes(userEmail)
	);

	return !!votes && votes.length > 0;
};

const getCurrentWinner = (weekDay) => {
	const restaurant = restaurants.reduce(
		(winner, restaurant) =>
			(!!restaurant.votes[weekDay] && (!winner.votes || !winner.votes[weekDay])) ||
			(!!restaurant.votes[weekDay] && restaurant.votes[weekDay].votes.length > winner.votes[weekDay].votes.length)
				? restaurant
				: winner,
		{}
	);

	return !!restaurant && restaurant.id ? restaurant : null;
};

const updateTodayWinner = (weekDay) => {
	const restaurant = getCurrentWinner(weekDay);
	winners[weekDay] = !!restaurant && restaurant.id ? restaurant.id : 0;
};

const getRestaurantById = (id) => {
	const restaurant = restaurants.filter((restaurant) => restaurant.id === id);
	return !!restaurant && restaurant.length > 0 ? restaurant[0] : null;
};

clear();

exports.setVote = (user, restaurantId) => {
	checkShouldCleanData();

	if (userHasVoteToday(user.email)) {
		const error = new Error("Não é permitido votar novamente.");
		error.status = 400;
		throw error;
	}

	if (restaurantHasBeenWinner(restaurantId)) {
		const error = new Error("O restaurante escolhido já foi vencedor essa semana.");
		error.status = 400;
		throw error;
	}

	const restaurant = getRestaurantById(restaurantId);
	const currentDay = getCurrentDayToVote();
	if (!restaurant.votes[currentDay]) {
		restaurant.votes[currentDay] = { votes: [], total: 0 };
	}

	restaurant.votes[currentDay].votes.push(user.email);
	restaurant.votes[currentDay].total = restaurant.votes[currentDay].votes.length;

	updateTodayWinner(currentDay);

	return restaurant;
};

exports.getAllRestaurants = () => restaurants;

exports.getTodayWinner = (weekDay) => getRestaurantById(winners[weekDay]);

exports.getWinners = () =>
	Object.keys(winners).reduce(
		(obj, weekDay) => Object.assign({ [weekDay]: getRestaurantById(winners[weekDay]) }, obj),
		{}
	);
