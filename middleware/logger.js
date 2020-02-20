module.exports = (format) => {
	return (req, res, next) => {
		const { method, url } = req;
		const dir = Date.now();
		const agent = req.get('User-Agent');

		if (format === 'short') {
			console.log(`${method} to ${url} ${dir}`);
		} else {
			console.log(` ${method} ${url}  `);
		}
		next();
	};
};
