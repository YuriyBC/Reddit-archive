const mysql = require('mysql');
const tableCreationService = require('./tableCreationService');
const constants = require('../../constants');
const {
    DATABASE_NAME,
    SUBREDDITS_TABLE_TITLE,
    POSTS_TABLE_TITLE,
    COMMENTS_TABLE_TITLE
} = constants;
const { createTable } = tableCreationService;

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
        banner_background_color,
        banner_background_image,
        icon_img,
        public_description,
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
                                banner_background_color,
                                banner_background_image,  
                                display_name_prefixed,
                                public_description,
                                icon_img,
                                isArchived) 
                                VALUES ( 
                                '${display_name || null}',  
                                '${community_icon || null}',
                                '${title || null}', 
                                '${header_img || null}',
                                '${subscribers || null}',
                                '${key_color || null}',
                                '${url || null}',
                                '${banner_background_color || null}',
                                '${banner_background_image || null}',
                                '${display_name_prefixed || null}',
                                '${public_description || null}',
                                '${icon_img || null}',
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


function insertPost (table, dataObject, subredditId, index) {
    const checkIfPostExistQuery = `SELECT * FROM ${table} WHERE reddit_id = '${dataObject.id}'`;
    let {
        subreddit,
        title,
        subreddit_name_prefixed,
        created,
        id,
        num_comments,
        thumbnail_height,
        thumbnail_width,
        subreddit_subscribers,
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
                                    sorting,
                                    reddit_id, 
                                    num_comments,
                                    subreddit_subscribers,
                                    score,
                                    thumbnail,
                                    thumbnail_height,
                                    thumbnail_width,
                                    author_fullname,
                                    selftext,
                                    subreddit_id) 
                                    VALUES (
                                    '${subreddit.display_name || subreddit || null}',  
                                    '${title || null}',
                                    '${subreddit_name_prefixed || null}',
                                    '${created || null}',
                                    '${index || 0}',
                                    '${id || null}',
                                    '${num_comments || 0}',
                                    '${subreddit_subscribers || null}',
                                    '${score || 0}',
                                    '${thumbnail || null}',
                                    '${thumbnail_height || null}',
                                    '${thumbnail_width || null}',
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
                                    '${depth || '0'}',
                                    '${parent_id || null}',
                                    '${name || null}',
                                    '${postId || null}',
                                    '${author_flair_text || null}'
                                    )`;

    if (body) {
        connection.query(checkIfCommentExistQuery, function (err, result) {
            if (result && !result.length) {
                connection.query(insertDataQuery, (err) => {
                    if (err) throw err
                })
            }
        });
    }
}

function updatePost (table, dataObject, subredditId, index) {
    const checkIfPostExistQuery = `SELECT * FROM ${table} WHERE reddit_id = '${dataObject.id}'`;
    let {
        title,
        num_comments,
        score,
        thumbnail,
        selftext
    } = dataObject;
    if (title) { title = title.split("'").join("''")}
    if (selftext) { selftext = selftext.split("'").join("''")}

    const updateDataQuery = `UPDATE ${table} SET
    title='${title}', 
    num_comments='${num_comments}', 
    sorting='${index}', 
    score='${score}', 
    thumbnail='${thumbnail}', 
    selftext='${selftext}'
    WHERE reddit_id = '${dataObject.id}'`;

    connection.query(checkIfPostExistQuery, function (err, result) {
        if (result && result.length) {
            connection.query(updateDataQuery, (err) => {
                if (err) throw err
            })
        } else {
            insertPost(table, dataObject, subredditId, index)
        }
    });

}

function updateComment (table, dataObject, callback) {
    const newObj = removeQuotesFromObject({...dataObject.data});
    let {
        score,
        body,
        depth,
        parent_id,
        name
    } = newObj;
    const checkIfCommentExistQuery = `SELECT * FROM ${table} WHERE body = '${body}'`;
    const updateDataQuery = `UPDATE ${table} SET 
        score='${score || 0}', 
        body='${body}', 
        depth='${depth || '0'}', 
        parent_id='${parent_id}', 
        name='${name}'
        WHERE body = '${body}'`;
    if (body) {
        connection.query(checkIfCommentExistQuery, function (err, result) {
            if (result && result.length) {
                connection.query(updateDataQuery, (err) => {
                    if (err) throw err;
                    if (callback) callback()
                })
            } else {
                insertComment(table, dataObject)
                if (callback) callback()
            }
        });
    }
}

function insertDataInTable (table, dataObject, subredditId, index) {
    if (table === SUBREDDITS_TABLE_TITLE) {
        insertSubreddit(table, dataObject, subredditId)
    } else if (table === POSTS_TABLE_TITLE) {
        insertPost(table, dataObject, subredditId, index)
    } else if (table === COMMENTS_TABLE_TITLE) {
        insertComment(table, dataObject)
    }
}

function updateDataInTable (table, dataObject, subredditId, index) {
    if (table === POSTS_TABLE_TITLE) {
        updatePost(table, dataObject, subredditId, index)
    } else if (table === COMMENTS_TABLE_TITLE) {
        updateComment(table, dataObject, subredditId)
    }
}

function getDataFromDatabase (table) {
    return new Promise ((resolve, reject) => {
        const checkIfSubredditExistQuery = `SELECT * FROM ${table}`;
        connection.query(checkIfSubredditExistQuery, function (err, result) {
            if (err) return reject()
            resolve(result)
        });
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
            if (err) return reject(err);
            if (result.length) {
                resolve(result[0])
            }
        })
    })
}

function getAllPostsBySubredditId (subredditId) {
    return new Promise ((resolve, reject) => {
        const findRoByIdQuery = `SELECT * FROM ${POSTS_TABLE_TITLE} WHERE subreddit_id = '${subredditId}'`;
        connection.query(findRoByIdQuery, function (err, result) {
            if (result.length) {
                resolve(result)
            } else {
                if (err) reject(error);
                reject()
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

function getPostData (subredditId, postId) {
    return new Promise ((resolve, reject) => {
        const findPostQuery = `SELECT * FROM ${POSTS_TABLE_TITLE} WHERE reddit_id = '${postId}'`;

        connection.query(findPostQuery, function (err, postData) {
            if (err) reject(error);
            if (postData.length) {
                resolve({
                    data: postData[0]
                })
            }
        })
    })

}

function getPostComments (subredditId, postId) {
    return new Promise ((resolve, reject) => {
        const findComments = `SELECT * FROM ${COMMENTS_TABLE_TITLE} WHERE postId = '${postId}'`;

        connection.query(findComments, function (err, commentsData) {
            if (err) reject(error);
            resolve({
                comments: commentsData
            })
        })
    })
}

function init () {
    makeConnectionToMysql();
    createDatabase();
    createTable(connection, SUBREDDITS_TABLE_TITLE);
    createTable(connection, POSTS_TABLE_TITLE);
    createTable(connection, COMMENTS_TABLE_TITLE);
}

module.exports = {
    init,
    insertDataInTable,
    getDataFromDatabase,
    getRowByTitle,
    updateTable,
    getAllPostsBySubredditId,
    removeRowsFromTable,
    getPostData,
    getPostComments,
    updateDataInTable
};