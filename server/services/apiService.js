const redditFetcher = require('./redditService');
const databaseService = require('./database/databaseService');
const constants = require('../constants');
const {
	SUBREDDITS_TABLE_TITLE,
	POSTS_TABLE_TITLE,
	STATUS_CODE_OK,
	STATUS_CODE_FAIL,
	ERROR_MESSAGE_SUBREDDIT_NOT_FOUND,
	ERROR_MESSAGE_SUBREDDIT_ALREADY_EXISTS,
	ERROR_MESSAGE_POSTS_NOT_FOUND,
	COMMENTS_TABLE_TITLE
} = constants;

function init (app) {
	allowCors(app);

	app.get('/', (request, response) => {
		response.sendFile(path.resolve(__dirname, '../public/public', 'index.html'));
	});

	app.get('/api/subreddits', (request, response) => {
		const subreddits = databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE);
		subreddits.then(subreddits => {
			response.send(subreddits);
		});
	});

	app.get('/api/posts/:id', (request, response) => {
		databaseService.getAllPostsBySubredditId(request.params.id)
			.then(result => {
				response.status(STATUS_CODE_OK).send(result);
			}).catch(() => {
				response.status(STATUS_CODE_FAIL).send({ error: ERROR_MESSAGE_POSTS_NOT_FOUND });
			});
	});

	app.get('/api/post/:subredditId/:postId', (request, response) => {
		const { subredditId, postId } = request.params;
		databaseService.getPostData(subredditId, postId)
			.then(result => {
				response.status(STATUS_CODE_OK).send(result);
			}).catch(() => {
				response.status(STATUS_CODE_FAIL).send({ error: ERROR_MESSAGE_POSTS_NOT_FOUND });
			});
	});

	app.get('/api/comments/:subredditId/:postId', (request, response) => {
		const { subredditId, postId } = request.params;
		databaseService.getPostComments(subredditId, postId)
			.then(result => {
				response.status(STATUS_CODE_OK).send(result);
			}).catch(() => {
				response.status(STATUS_CODE_FAIL).send({ error: ERROR_MESSAGE_POSTS_NOT_FOUND });
			});
	});

	app.post('/api/subreddit', (request, response) => {
		const potentialSubreddit = request.body.payload;

		const subredditNameFromAPI = getSimilarSubredditNameFromAPI(potentialSubreddit);
		const subredditFromDatabase = getSimilarSubredditFromDatabase(potentialSubreddit);

		Promise.all([
			subredditNameFromAPI,
			subredditFromDatabase
		]).then(result => {
			const [subredditApiName, subredditFromDatabase] = result;

			if (subredditApiName && !subredditFromDatabase) {
				databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE).then((subreddits => {
					const newId = subreddits.length + 1;
					addNewSubredditDatabase(subredditApiName, newId);
					response.status(STATUS_CODE_OK).send(subreddits);
				}));

			} else if (subredditFromDatabase) {
				changeArchiveType(potentialSubreddit, response);
			} else {
				const errorMessage = result[1] ? ERROR_MESSAGE_SUBREDDIT_ALREADY_EXISTS : ERROR_MESSAGE_SUBREDDIT_NOT_FOUND;
				response.status(STATUS_CODE_FAIL).
					send({ error: errorMessage });
			}
		});
	});
}

function changeArchiveType (title, response) {
	databaseService.getRowByTitle(SUBREDDITS_TABLE_TITLE, title).then((subreddit) => {
		const isArchived = subreddit ? subreddit.isArchived : 0;
		const newValue = isArchived === 0 ? 1 : 0;

		databaseService.updateTable(SUBREDDITS_TABLE_TITLE, 'isArchived', subreddit.id, newValue).then(resolve => {
			const subreddits = databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE);
			subreddits.then(subreddits => {
				response.status(STATUS_CODE_OK).send(subreddits);
			});

			if (newValue) startRedditArchivation(subreddit.display_name, subreddit.id);
			if (!newValue) removePostsAndComments(subreddit.display_name);
		}).catch(() => {
			response.send(STATUS_CODE_FAIL);
		});
	});
}

function removePostsAndComments (subredditName) {
	databaseService.removeRowsFromTable(POSTS_TABLE_TITLE, 'subreddit', subredditName);
	databaseService.removeRowsFromTable(COMMENTS_TABLE_TITLE, 'subreddit', subredditName);
}

function getSimilarSubredditNameFromAPI (subreddit) {
	return redditFetcher.checkIsSubredditExists(subreddit).then(result => {
		if (result.length && result[0].subreddit && result[0].subreddit.display_name) {
			return result[0].subreddit.display_name;
		}
		return false;
	}).catch(() => false);
}

function getSimilarSubredditFromDatabase (subredditTitle) {
	if (subredditTitle) {
		return databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE).then((result => {
			const subreddit = result.filter(el => el.display_name.toLowerCase() === subredditTitle.toLowerCase());
			return subreddit.length ? subreddit[0] : null;
		}));
	}
	return null;
}

function addNewSubredditDatabase (subreddit, subredditId) {
	const subredditObj = {
		title: subreddit,
		display_name: subreddit,
		isArchived: 1
	};
	databaseService.insertDataInTable(SUBREDDITS_TABLE_TITLE, subredditObj);
	startRedditArchivation(subreddit.display_name, subredditId);
}

function startRedditArchivation (subredditTitle, subredditId) {
	redditFetcher.getSubredditPosts(subredditTitle).then(result => {
		if (result && result.length) {
			result.forEach((post, index) => {
				databaseService.insertDataInTable(POSTS_TABLE_TITLE, post, subredditId, index);
				redditFetcher.fetchPostSubmission(post.subreddit.display_name, post.id).then(el => {
					const comments = getAllComments(el[1].data.children);
					comments.forEach((comment) => {
						if (comment) {
							comment.data.postId = post.id;
							databaseService.insertDataInTable(COMMENTS_TABLE_TITLE, comment);
						}
					});
				});
			});
			return result;
		}
	});
}

function updateData (subredditTitle, subredditId) {
	redditFetcher.getSubredditPosts(subredditTitle).then(result => {
		if (result && result.length) {
			result.forEach((post, index) => {
				databaseService.updateDataInTable(POSTS_TABLE_TITLE, post, subredditId, index);
				redditFetcher.fetchPostSubmission(post.subreddit.display_name, post.id).then(el => {
					const comments = getAllComments(el[1].data.children);
					comments.forEach(comment => {
						if (comment) {
							comment.data.postId = post.id;
							databaseService.updateDataInTable(COMMENTS_TABLE_TITLE, comment);
						}
					});
				});
			});
			return result;
		}
	});
}

function getAllComments (initialComments) {
	let storedData = [];

	function checkIfNextDepth (children) {
		return !!(children.data.replies && children.data.replies.data.children);
	}

	function storeFromComments (comments) {
		comments.forEach((comment) => {
			storedData.push(comment);
			if (checkIfNextDepth(comment)) {
				storeFromComments(comment.data.replies.data.children);
			}
		});
	}
	storeFromComments(initialComments);
	return storedData;
}


function allowCors (app) {
	app.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		next();
	});
}

module.exports = {
	init,
	updateData
};