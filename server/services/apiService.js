const redditFetcher = require('./redditService');
const databaseService = require('./databaseService');
const constants = require('../constants');
const {
    SUBREDDITS_TABLE_TITLE,
    POSTS_TABLE_TITLE,
    STATUS_CODE_OK,
    STATUS_CODE_FAIL,
    ERROR_MESSAGE_SUBREDDIT_NOT_FOUND,
    ERROR_MESSAGE_SUBREDDIT_ALREADY_EXISTS
} = constants;

function init (app) {
    allowCors(app);

    app.get('/', (request, response) => {
        response.sendFile(path.resolve(__dirname, '../public/public', 'index.html'));
    });

    app.get('/api/subreddits', (request, response) => {
        const subreddits = databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE);
        subreddits.then(subreddits => {
            response.send(subreddits)
        });
    });

    app.post('/api/subreddit', (request, response) => {
        if (typeof request.body.payload === 'string') {
            const potentialSubreddit = request.body.payload;

            const isSubredditExistsPromise = isSubredditExists(potentialSubreddit);
            const isSubredditAlreadyInDatabasePromise = isSubredditAlreadyInDatabase(potentialSubreddit);

            Promise.all([
                isSubredditExistsPromise,
                isSubredditAlreadyInDatabasePromise
            ]).then(result => {
                if (result[0] && !result[1]) {
                    databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE).then((subreddits => {
                        response.status(STATUS_CODE_OK).send(subreddits);
                    }));
                    addNewSubredditDatabase(potentialSubreddit);
                } else {
                    if (result[1] && result[1].isArchived === 0) {
                        changeArchiveType(result[1].id, response);
                    } else {
                        const errorMessage = result[1] ? ERROR_MESSAGE_SUBREDDIT_ALREADY_EXISTS : ERROR_MESSAGE_SUBREDDIT_NOT_FOUND;
                        response.status(STATUS_CODE_FAIL).
                        send({ error: errorMessage });
                    }
                }
            })

        }

        if (typeof request.body.payload === 'number') {
            const subredditId = request.body.payload;
            changeArchiveType(subredditId, response);
        }
    });
}

function changeArchiveType (subredditId, response) {
    if (subredditId) {
        databaseService.getRowById(SUBREDDITS_TABLE_TITLE, subredditId).then((subreddit) => {
            const isArchived = subreddit ? subreddit.isArchived : 0;
            const newValue = isArchived === 0 ? 1 : 0;
            databaseService.updateTable(SUBREDDITS_TABLE_TITLE, 'isArchived', subredditId, newValue).then(resolve => {
                const subreddits = databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE);
                subreddits.then(subreddits => {
                    response.send(subreddits);
                    response.send(STATUS_CODE_OK)
                });
                if (newValue) startRedditArchivation(subreddit.display_name);
            }).catch(() => {
                response.send(STATUS_CODE_FAIL)
            })
        })
    }
}

function isSubredditExists (subreddit) {
    return redditFetcher.checkIsSubredditExists(subreddit).then(result => {
        return result.length
    }).catch(() => false);
}

function isSubredditAlreadyInDatabase (subredditTitle) {
    if (subredditTitle) {
        return databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE).then((result => {
            const subreddit = result.filter(el => el.display_name.toLowerCase() === subredditTitle.toLowerCase());
            return subreddit.length ? subreddit[0] : false
        }))
    } else {
        return false
    }
}

function addNewSubredditDatabase (subreddit) {
    const subredditObj = {
        title: subreddit,
        display_name: subreddit,
        isArchived: 1
    };
    databaseService.insertDataInTable(SUBREDDITS_TABLE_TITLE, subredditObj);
    console.log(subreddit)
}

function startRedditArchivation (subredditTitle) {
    redditFetcher.getSubredditPosts(subredditTitle).then(result => {
        if (result && result.length) {
            result.forEach((post) => {
                databaseService.insertDataInTable(POSTS_TABLE_TITLE, post)
            });
        }
    })
}

function allowCors (app) {
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });
}


module.exports = {
    init
};