const mysql = require('mysql');
const constants = require('../constants');
const {
    DATABASE_NAME,
    SUBREDDITS_TABLE_TITLE,
    POSTS_TABLE_TITLE,
    COMMENTS_TABLE_TITLE
} = constants;

let connection;

function makeConnectionToMysql () {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        charset: 'utf8mb4',
        debug: false,
        stringifyObjects: true
    });
}

function createDatabase () {
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("CREATE DATABASE IF NOT EXISTS " + DATABASE_NAME + " CHARACTER SET utf8mb4", function (err) {
                if (err) throw err;
            });
    });
}

function createTable (type) {
    const useDatabaseQuery = 'use ' + DATABASE_NAME;
    const checkTableQuery = 'SHOW TABLES LIKE "' + type +'"';

    const createTableSubredditsQuery = "CREATE TABLE " + SUBREDDITS_TABLE_TITLE + " (" +
            "id INT(100) NOT null AUTO_INCREMENT PRIMARY KEY, " +
            "display_name VARCHAR(255), " +
            "community_icon VARCHAR(255), " +
            "title VARCHAR(255), " +
            "header_img VARCHAR(255), " +
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
        "num_comments INT(100), " +
        "subreddit_subscribers VARCHAR(255), " +
        "preview VARCHAR(255), " +
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
    }
    if (type === POSTS_TABLE_TITLE) {
        createTableQuery = createTablePostsQuery;
    }
    if (type === COMMENTS_TABLE_TITLE) {
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


function removeQuotesFromObject (object) {
    Object.keys(object).forEach(key => {
        if (object[key] && object[key].split) {
            object[key] = object[key].split("'").join("''");
        }
    });
    return object
}


function insertSubreddit (table, dataObject) {
    const checkIfSubredditExistQuery = `SELECT * FROM ${table} WHERE display_name = '${dataObject.display_name}'`

    dataObject = removeQuotesFromObject (dataObject);
    let {
        display_name,
        community_icon,
        title,
        header_img,
        subscribers,
        key_color,
        url,
        display_name_prefixed,
        isArchived
    } = dataObject;

    const insertDataQuery = `INSERT INTO ${table}(
                                display_name, 
                                community_icon, 
                                title, 
                                header_img, 
                                subscribers, 
                                key_color, 
                                url,  
                                display_name_prefixed,
                                isArchived) 
                                VALUES ( 
                                '${display_name || null}',  
                                '${community_icon || null}',
                                '${title || null}',
                                '${header_img || null}',
                                '${subscribers || null}',
                                '${key_color || null}',
                                '${url || null}',
                                '${display_name_prefixed || null}',
                                ${isArchived || 0}
                                )`;
    connection.query(checkIfSubredditExistQuery, function (err, result) {
        if (result && !result.length) {
            connection.query(insertDataQuery, (err) => {
                if (err) throw err
            })
        }
    });
}


function insertPost (table, dataObject, subredditId) {
    const checkIfPostExistQuery = `SELECT * FROM ${table} WHERE title = '${dataObject.title}'`;
    let {
        subreddit,
        title,
        subreddit_name_prefixed,
        created,
        id,
        num_comments,
        subreddit_subscribers,
        preview,
        score,
        thumbnail,
        author_fullname,
        selftext
    } = dataObject;

    if (title) { title = title.split("'").join("''")}
    if (selftext) { selftext = selftext.split("'").join("''")}

    const insertDataQuery = `INSERT INTO ${table}(
                                    subreddit,
                                    title,
                                    subreddit_name_prefixed,
                                    created,
                                    reddit_id, 
                                    num_comments,
                                    subreddit_subscribers,
                                    preview,
                                    score,
                                    thumbnail,
                                    author_fullname,
                                    selftext,
                                    subreddit_id) 
                                    VALUES (
                                    '${subreddit.display_name || subreddit || null}',  
                                    '${title || null}',
                                    '${subreddit_name_prefixed || null}',
                                    '${created || null}',
                                    '${id || null}',
                                    '${num_comments || 0}',
                                    '${subreddit_subscribers || null}',
                                    '${preview || null}',
                                    '${score || 0}',
                                    '${thumbnail || null}',
                                    '${author_fullname || null}',
                                    '${selftext || null}',
                                    '${subredditId || 0}'
                                    )`;
    connection.query(checkIfPostExistQuery, function (err, result) {
        if (result && !result.length) {
            connection.query(insertDataQuery, (err) => {
                if (err) throw err
            })
        }
    });
}


function insertComment (table, dataObject) {
    const newObj = removeQuotesFromObject({...dataObject.data});

    let {
        score,
        subreddit_id,
        created,
        author,
        body,
        subreddit,
        author_flair_text,
        depth,
        parent_id,
        name,
        postId,
    } = newObj;

    const checkIfCommentExistQuery = `SELECT * FROM ${table} WHERE body = '${body}'`;

    const insertDataQuery = `INSERT INTO ${table}(
                                    subreddit,
                                    body,
                                    author,
                                    created,
                                    subreddit_id,
                                    score,
                                    depth,
                                    parent_id,
                                    name,
                                    postId,
                                    author_flair_text) 
                                    VALUES (
                                    '${subreddit || null}',  
                                    '${body || null}',
                                    '${author || null}',
                                    '${created || null}',
                                    '${subreddit_id || null}',
                                    '${score || 0}',
                                    '${depth || null}',
                                    '${parent_id || null}',
                                    '${name || null}',
                                    '${postId || null}',
                                    '${author_flair_text || null}'
                                    )`;

    connection.query(checkIfCommentExistQuery, function (err, result) {
        if (result && !result.length) {
            connection.query(insertDataQuery, (err) => {
                if (err) throw err
            })
        }
    });

}

function insertDataInTable (table, dataObject, subredditId) {
    if (table === SUBREDDITS_TABLE_TITLE) {
        insertSubreddit(table, dataObject, subredditId)
    }

    if (table === POSTS_TABLE_TITLE) {
        insertPost(table, dataObject, subredditId)
    }

    if (table === COMMENTS_TABLE_TITLE) {
        insertComment(table, dataObject)
    }

}

function getDataFromDatabase (table) {
    return new Promise (resolve => {
        const checkIfSubredditExistQuery = `SELECT * FROM ${table}`;
        connection.query(checkIfSubredditExistQuery, function (err, result) {
            resolve(result)
        });
    })
}

function getRowById (table, rowId) {
    return new Promise ((resolve, reject) => {
        const findRoByIdQuery = `SELECT * FROM ${table} WHERE id = '${rowId}'`
        connection.query(findRoByIdQuery, function (err, result) {
            if (err) reject(error);
            if (result.length) {
                resolve(result[0])
            }
        })
    })
}

function updateTable (tableTitle, column, rowId, newValue) {
    return new Promise ((resolve, reject) => {
        const updateTableQuery = `UPDATE ${tableTitle} SET ${column}='${newValue}' WHERE id=${rowId};`;
        connection.query(updateTableQuery, function (err, result) {
            if (err) reject(err);
            resolve(result)
        })
    })
}

function getRowByTitle (table, title) {
    return new Promise ((resolve, reject) => {
        const findRoByIdQuery = `SELECT * FROM ${table} WHERE display_name = '${title}'`
        connection.query(findRoByIdQuery, function (err, result) {
            if (err) reject(error);
            if (result.length) {
                resolve(result[0])
            }
        })
    })
}

function getAllPostsBySubredditId (subredditId) {
    return new Promise ((resolve, reject) => {
        const findRoByIdQuery = `SELECT * FROM ${POSTS_TABLE_TITLE} WHERE subreddit_id = '${subredditId}'`
        connection.query(findRoByIdQuery, function (err, result) {
            if (err) reject(error);
            if (result.length) {
                resolve(result)
            }
        })
    })
}

function removeRowsFromTable (table, columnName, value) {
    return new Promise ((resolve, reject) => {
        const deleteRowQuery = `DELETE FROM ${table} WHERE ${columnName} = '${value}'`;
        connection.query(deleteRowQuery, function (err, result) {
            if (err) reject(error);
            if (result.length) {
                resolve(result)
            }
        })
    })
}

function getPostDataWithComments (subredditId, postId) {
    return new Promise ((resolve, reject) => {
        const findPostQuery = `SELECT * FROM ${POSTS_TABLE_TITLE} WHERE reddit_id = '${postId}'`;
        const findComments = `SELECT * FROM ${COMMENTS_TABLE_TITLE} WHERE postId = '${postId}'`;

        connection.query(findPostQuery, function (err, postData) {
            if (err) reject(error);
            if (postData.length) {
                connection.query(findComments, function (err, commentsData) {
                    resolve({
                        data: postData[0],
                        comments: commentsData
                    })
                })
            }
        })
    })
}

function init () {
    makeConnectionToMysql();
    createDatabase();
    createTable(SUBREDDITS_TABLE_TITLE);
    createTable(POSTS_TABLE_TITLE);
    createTable(COMMENTS_TABLE_TITLE);
}

module.exports = {
    init,
    insertDataInTable,
    getDataFromDatabase,
    getRowByTitle,
    updateTable,
    getAllPostsBySubredditId,
    removeRowsFromTable,
    getPostDataWithComments
};