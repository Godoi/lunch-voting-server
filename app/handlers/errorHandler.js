module.exports = function (err, res) {
	res.status(err.status || 500);
	res.send({ message: err.message });
};
