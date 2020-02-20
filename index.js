// code away!
const express = require('express');
const logger = require('./middleware/logger');
const helmet = require('helmet');
const userRouter = require('./users/userRouter');
const postRouter = require('./posts/postRouter');

const server = express();
const port = 4000;

server.use(logger('short'));
server.use(helmet());

server.use(express.json());
server.use('/api/posts', postRouter);
server.use('/api/users', userRouter);

server.use((err, req, res, next) => {
	console.log(err);
	res.status(500).json({
		// keep server errors generic, we don't want to expose details of potential bugs
		message: 'Something went wrong'
	});
});

server.listen(port, () => {
	console.log(`Server running at http://localhost:${port}`);
});
