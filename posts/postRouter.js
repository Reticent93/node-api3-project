const express = require('express');
const dbPosts = require('./postDb');

const router = express.Router();

router.get('/', (req, res, next) => {
	// do your magic!
	dbPosts
		.get()
		.then((dbPosts) => {
			res.json(dbPosts);
		})
		.catch((err) => {
			next(error);
		});
});

router.get('/:id', (req, res, next) => {
	// do your magic!
	dbPosts
		.getById(req.params.id)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'Post not found'
				});
			}
		})
		.catch((err) => {
			next(err);
		});
});

router.delete('/:id', (req, res, next) => {
	// do your magic!
	dbPosts.remove(req.params.id).then((post) => {
		res.status(204).end();
	});
});

router.put('/:id', (req, res) => {
	// do your magic!
	const { id } = req.params;
	dbPosts.getById(id).then((user) => {
		if (user) {
			res.json(user);
		} else {
			res.status(404).json({
				message: 'User not found'
			});
		}
	});

	dbPosts
		.update(req.params.id, req.body)
		.then((post) => {
			if (post) {
				res.status(200).json(post);
			} else {
				res.status(404).json({
					message: 'Could not update the post'
				});
			}
		})
		.catch((err) => {
			next(err);
		});
});

// custom middleware

function validatePostId(req, res, next) {
	// do your magic!
}

module.exports = router;
