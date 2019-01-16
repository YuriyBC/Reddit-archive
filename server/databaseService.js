var mysql = require('mysql');

const constants = {
    databaseName: 'reddit',
    subredditsTableTitle: 'subreddits'
};
let connection;

function makeConnectionToMysql () {
    connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'password'
    });
}

function createDatabase () {
    connection.connect(function(err) {
        if (err) throw err;
        connection.query("CREATE DATABASE IF NOT EXISTS " + constants.databaseName, function (err, result) {
            if (err) throw err;
        });
    });
}

function createTableSubreddits () {
    const useDatabaseQuery = 'use ' + constants.databaseName;
    const checkTableQuery = 'SHOW TABLES LIKE "' + constants.subredditsTableTitle +'"';
    const createTableQuery = "CREATE TABLE " + constants.subredditsTableTitle + " (" +
            "id INT(100) NOT NULL AUTO_INCREMENT PRIMARY KEY, " +
            "display_name VARCHAR(255), " +
            "community_icon VARCHAR(255), " +
            "title VARCHAR(255), " +
            "header_img VARCHAR(255), " +
            "subscribers VARCHAR(255), " +
            "key_color VARCHAR(255), " +
            "url VARCHAR(255), " +
            "display_name_prefixed VARCHAR(255)" +
            ")";


    function useDatabaseCallback (err) {
        if (err) throw err;
        connection.query(checkTableQuery, checkTableCallback);
    }

    function checkTableCallback (err, result) {
        if (!result.length) {
            connection.query(createTableQuery)
        }
    }

    connection.query(useDatabaseQuery, useDatabaseCallback)
}

function insertDataInTable (table, element) {
    const insertDataQuery = `INSERT INTO ${table}
    (display_name, community_icon, title, header_img, subscribers, key_color, url, display_name_prefixed) 
    VALUES (
    '${element.display_name}', 
    '${element.community_icon}',
    '${element.title}',
    '${element.header_img}',
    '${element.subscribers}',
    '${element.key_color}',
    '${element.url}',
    '${element.display_name_prefixed}'
    )`;

    connection.query(insertDataQuery, insertDataCallback)
}

function init () {
    makeConnectionToMysql();
    createDatabase();
    createTableSubreddits();
}

module.exports = {
    init,
    insertDataInTable
};