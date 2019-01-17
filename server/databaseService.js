const mysql = require('mysql');
const constants = require('./constants');
const {
    DATABASE_NAME,
    SUBREDDITS_TABLE_TITLE
} = constants;

let connection;

function makeConnectionToMysql () {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password',
        charset: 'utf8'
    });
}

function createDatabase () {
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("CREATE DATABASE IF NOT EXISTS " + DATABASE_NAME, function (err) {
                if (err) throw err;
            });
    });
}

function createTableSubreddits () {
    const useDatabaseQuery = 'use ' + DATABASE_NAME;
    const checkTableQuery = 'SHOW TABLES LIKE "' + SUBREDDITS_TABLE_TITLE +'"';
    const createTableQuery = "CREATE TABLE " + SUBREDDITS_TABLE_TITLE + " (" +
            "id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
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


    function useDatabaseCallback (err) {
        if (err) {}
        connection.query(checkTableQuery, checkTableCallback);
    }

    function checkTableCallback (err, result) {
        if (!result.length) {
            connection.query(createTableQuery)
        }
    }
    connection.query(useDatabaseQuery, useDatabaseCallback)
}

function insertDataInTable (table, subreddit) {
    const checkIfSubredditExistQuery = `SELECT * FROM ${table} WHERE display_name = '${subreddit.display_name}'`

    let {
        display_name,
        community_icon,
        title,
        header_img,
        subscribers,
        key_color,
        url,
        display_name_prefixed
    } = subreddit;

    function removeEmoji (string) {
        const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|[\ud83c[\ude01\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|[\ud83c[\ude32\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|[\ud83c[\ude50\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return string.replace(regex, '');
    }
    title = title.split("'").join(" ");
    title = title.replace("|", "");
    title = removeEmoji(title);

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
    0
    )`;
    connection.query(checkIfSubredditExistQuery, function (err, result) {
        if (!result.length) {
            connection.query(insertDataQuery, (err) => {
                if (err) throw err
            })
        }
    });
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

function init () {
    makeConnectionToMysql();
    createDatabase();
    createTableSubreddits();
}

module.exports = {
    init,
    insertDataInTable,
    getDataFromDatabase,
    getRowById,
    updateTable
};