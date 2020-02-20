const express = require('express');
const userDB = require('./userDb');
const router = express.Router();

router.post('/', (req, res) => {
	// do your magic!
	const newUser = {
		name: req.body.name
	};
	users.push(newUser);
	res.status(201).json(newUser);
});

router.post('/:id/posts', validateUserId(), (req, res) => {
	// do your magic!
	const { user, text } = req.body;
	if (!user || !text) {
		return res.status(400).json({
			message: 'Need sender and text values'
		});
	}
	userDB
		.getUserPosts(req.params.id, req.body)
		.then((newPost) => {
			res.status(201).json(newPost);
		})
		.catch((err) => {
			next(err);
		});
});

router.get('/', (req, res) => {
	// do your magic!
	userDB
		.get()
		.then((userDB) => {
			res.json(userDB);
		})
		.catch((err) => {
			next(err);
		});
});

router.get('/:id', validateUserId(), (req, res) => {
	// do your magic!
	res.status(200).json(req.user);

	// const { id } = req.params;
	// userDB
	// 	.getById(id)
	// 	.then((user) => {
	// 		if (user) {
	// 			res.json(user);
	// 		} else {
	// 			res.status(404).json({
	// 				message: 'User not found'
	// 			});
	// 		}
	// 	})
	// 	.catch((err) => {
	// 		next(err);
	// 	});
});

router.get('/:id/posts', validateUserId(), (req, res) => {
	// do your magic!
	userDB
		.getUserPosts(req.params.id)
		.then((post) => {
			res.json(post);
		})
		.catch((err) => {
			next(err);
		});
});

router.delete('/:id', validateUserId(), (req, res) => {
	// do your magic!
	userDB
		.remove(req.params.id)
		.then((count) => {
			if (count > 0) {
				res.status(200).json({
					message: 'The user has been nuked'
				});
			} else {
				res.status(404).json({
					message: 'The user could not be found'
				});
			}
		})
		.catch((error) => {
			next();
		});
});

router.put('/:id', validateUserId(), (req, res) => {
	// do your magic!
	if (!req.body.name) {
		return res.status(400).json({
			message: 'Missing user name'
		});
	}

	userDB
		.update(req.params.id, req.body)
		.then((user) => {
			if (user) {
				res.status(200).json(user);
			} else {
				res.status(404).json({
					message: 'The user could not be found'
				});
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: 'Error updating the user'
			});
		});
});

//custom middleware

function validateUserId(req, res, next) {
	// do your magic!
	return (req, res, next) => {
		const { id } = req.params;
		userDB
			.getById(id)
			.then((user) => {
				if (user) {
					req.user = user;
					next();
				} else {
					res.status(404).json({
						message: 'User not found'
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	};
}

function validateUser(req, res, next) {
	// do your magic!
}

function validatePost(req, res, next) {
	// do your magic!
}

module.exports = router;
