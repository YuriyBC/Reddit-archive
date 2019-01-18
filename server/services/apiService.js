const redditFetcher = require('./redditService');
const databaseService = require('./databaseService');
const constants = require('../constants');
const {
    SUBREDDITS_TABLE_TITLE,
    POSTS_TABLE_TITLE,
    STATUS_CODE_OK,
    STATUS_CODE_FAIL,
    ERROR_MESSAGE_SUBREDDIT_NOT_FOUND,
    ERROR_MESSAGE_SUBREDDIT_ALREADY_EXISTS,
    ERROR_MESSAGE_POSTS_NOT_FOUND
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

    app.get('/api/posts/:id', (request, response) => {
         databaseService.getAllPostsBySubredditId(request.params.id)
             .then(result => {
                 response.status(STATUS_CODE_OK).send(result);
             }).catch(() => {
             response.status(STATUS_CODE_FAIL).send({ error: ERROR_MESSAGE_POSTS_NOT_FOUND });
         })
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
                    response.status(STATUS_CODE_OK).send(subreddits);
                    addNewSubredditDatabase(subredditApiName, newId);
                }));
            } else if (subredditFromDatabase) {
                changeArchiveType(potentialSubreddit, response);
            } else {
                const errorMessage = result[1] ? ERROR_MESSAGE_SUBREDDIT_ALREADY_EXISTS : ERROR_MESSAGE_SUBREDDIT_NOT_FOUND;
                response.status(STATUS_CODE_FAIL).
                send({ error: errorMessage });
            }
        })
    });
}

function changeArchiveType (title, response) {
    databaseService.getRowByTitle(SUBREDDITS_TABLE_TITLE, title).then((subreddit) => {
        console.log(subreddit)
        const isArchived = subreddit ? subreddit.isArchived : 0;
        const newValue = isArchived === 0 ? 1 : 0;

        databaseService.updateTable(SUBREDDITS_TABLE_TITLE, 'isArchived', subreddit.id, newValue).then(resolve => {
            const subreddits = databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE);
            subreddits.then(subreddits => {
                response.status(STATUS_CODE_OK).send(subreddits);
            });

            if (newValue) startRedditArchivation(subreddit.display_name, subreddit.id);
        }).catch(() => {
            response.send(STATUS_CODE_FAIL)
        })
    })
}

function getSimilarSubredditNameFromAPI (subreddit) {
    return redditFetcher.checkIsSubredditExists(subreddit).then(result => {
        if (result.length && result[0].subreddit && result[0].subreddit.display_name) {
            return result[0].subreddit.display_name
        }
        return false
    }).catch(() => false);
}

function getSimilarSubredditFromDatabase (subredditTitle) {
    if (subredditTitle) {
        return databaseService.getDataFromDatabase(SUBREDDITS_TABLE_TITLE).then((result => {
            const subreddit = result.filter(el => el.display_name.toLowerCase() === subredditTitle.toLowerCase());
            return subreddit.length ? subreddit[0] : null
        }))
    }
    return null
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
            result.forEach((post) => {
                databaseService.insertDataInTable(POSTS_TABLE_TITLE, post, subredditId)
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