const express = require("express");
const app = express();

app.use(express.json()); // for parsing application/json

exports = module.exports = app;

exports.init = function () {
	const port = 3000;
	app.server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
};
