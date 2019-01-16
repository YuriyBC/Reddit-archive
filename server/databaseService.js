var mysql = require('mysql');

const constants = {
    databaseName: 'reddit'
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

function connectToDatabase () {
    connection.query('use ' + constants.databaseName, function (err, result) {
        if (err) throw err;
        var sql = "CREATE TABLE subreddits (name VARCHAR(255), address VARCHAR(255))";
        connection.query(sql, function (err, result) {
            if (err) throw err;
            console.log("Table created");
        });

    })

}
function init () {
    makeConnectionToMysql();
    createDatabase();
    connectToDatabase();
}


module.exports = {
    init
};