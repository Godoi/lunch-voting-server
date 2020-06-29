const users = [
	{
		id: 1,
		name: "Darth Vader",
		username: "vader",
		email: "darth.vader@darkside.sith",
		password: "palpatine",
	},
	{
		id: 2,
		name: "Darth Sidiou",
		username: "darth-sidiou",
		email: "darth.sidiou@starwars.com",
		password: "darth.sidiou"
	},
	{
		id: 3,
		name: "Leia Organa",
		username: "leia-organa",
		email: "leia.organa@starwars.com",
		password: "leia.organa"
	},
	{
		id: 4,
		name: "Luke Skywalker",
		username: "luke-skywalker",
		email: "luke.skywalker@starwars.com",
		password: "luke.skywalker"

	},
	{
		id: 5,
		name: "Yoda",
		username: "yoda",
		email: "yoda@starwars.com",
		password: "yoda"
	},
	{
		id: 6,
		name: "Jabba the Hutt",
		username: "jabba-hutt",
		email: "jabba.hutt@starwars.com",
		password: "jabba.hutt"
	},
	{
		id: 7,
		name: "Boba Fett",
		username: "boba-fett",
		email: "boba.fett@starwars.com",
		password: "boba.fett"
	},
	{
		id: 8,
		name: "Han Solor",
		username: "han-solo",
		email: "han.solo@starwars.com",
		password: "han.solo"
	},
	{
		id: 9,
		name: "Chewbacca",
		username: "chewbacca",
		email: "chewbacca@starwars.com",
		password: "chewbacca"
	},
	{
		id: 10,
		name: "C-3PO",
		username: "C-3PO",
		email: "c3po@starwars.com",
		password: "C3PO"
	}
];

exports.getAllUsers = () => users;
exports.getUserById = (id) => {
	const user = users.filter((user) => user.id === id);

	if (!user || user.length === 0) {
		const error = new Error("Nenhum usuário encontrado!");
		error.status = 404;
		throw error;
	}

	return user[0];
};
exports.getUserByEmail = (email) => {
	const user = users.filter((user) => user.email === email);

	if (!user || user.length === 0) {
		const error = new Error("Nenhum usuário encontrado!");
		error.status = 404;
		throw error;
	}

	return user[0];
};
exports.getUserByUsernameAndPassword = (username, password) => {
	const user = users.filter((user) => user.username === username && user.password === password);

	if (!user || user.length === 0) {
		const error = new Error("Nenhum usuário encontrado!");
		error.status = 404;
		throw error;
	}

	return user[0];
};
