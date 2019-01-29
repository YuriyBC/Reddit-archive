const constants = require('../../constants');
const {
    DATABASE_NAME,
    SUBREDDITS_TABLE_TITLE,
    POSTS_TABLE_TITLE,
    COMMENTS_TABLE_TITLE
} = constants;

function createTable (connection, type) {
    const useDatabaseQuery = 'use ' + DATABASE_NAME;
    const checkTableQuery = 'SHOW TABLES LIKE "' + type +'"';

    const createTableSubredditsQuery = "CREATE TABLE " + SUBREDDITS_TABLE_TITLE + " (" +
        "id INT(100) NOT null AUTO_INCREMENT PRIMARY KEY, " +
        "display_name VARCHAR(255), " +
        "community_icon VARCHAR(255), " +
        "icon_img VARCHAR(255), " +
        "title VARCHAR(255), " +
        "header_img VARCHAR(255), " +
        "public_description VARCHAR(2000), " +
        "subscribers VARCHAR(255), " +
        "key_color VARCHAR(255), " +
        "url VARCHAR(255), " +
        "display_name_prefixed VARCHAR(255), " +
        "isArchived TINYINT(1)" +
        ")";

    const createTablePostsQuery = "CREATE TABLE " + POSTS_TABLE_TITLE + " (" +
        "id INT(100) NOT null AUTO_INCREMENT PRIMARY KEY, " +
        "subreddit VARCHAR(255), " +
        "title VARCHAR(855), " +
        "subreddit_name_prefixed VARCHAR(255), " +
        "created VARCHAR(255), " +
        "reddit_id VARCHAR(255), " +
        "sorting INT(100), " +
        "num_comments INT(100), " +
        "thumbnail_height VARCHAR(255), " +
        "thumbnail_width VARCHAR(255), " +
        "subreddit_subscribers VARCHAR(255), " +
        "score INT(100), " +
        "thumbnail VARCHAR(255), " +
        "author_fullname VARCHAR(255), " +
        "selftext TEXT, " +
        "subreddit_id INT(100)" +
        ")";

    const createTableCommentsQuery = "CREATE TABLE " + COMMENTS_TABLE_TITLE + " (" +
        "id INT(100) NOT null AUTO_INCREMENT PRIMARY KEY, " +
        "subreddit VARCHAR(255), " +
        "body TEXT, " +
        "author VARCHAR(255), " +
        "created VARCHAR(255), " +
        "subreddit_id VARCHAR(255), " +
        "score VARCHAR(255), " +
        "depth VARCHAR(255), " +
        "name VARCHAR(255), " +
        "parent_id VARCHAR(255), " +
        "postId VARCHAR(255), " +
        "author_flair_text VARCHAR(255)" +
        ")";

    let createTableQuery;
    if (type === SUBREDDITS_TABLE_TITLE) {
        createTableQuery = createTableSubredditsQuery;
    } else if (type === POSTS_TABLE_TITLE) {
        createTableQuery = createTablePostsQuery;
    } else if (type === COMMENTS_TABLE_TITLE) {
        createTableQuery = createTableCommentsQuery;
    }

    function useDatabaseCallback (err) {
        if (err) {}
        connection.query(checkTableQuery, checkTableCallback);
    }

    function checkTableCallback (err, result) {
        if (result && !result.length) {
            connection.query(createTableQuery)
        }
    }
    connection.query(useDatabaseQuery, useDatabaseCallback)
}

module.exports = {
    createTable
};