const config = require('config-lite')(__dirname);
const mysql = require('mysql');
const sequelize = require('sequelize');

var linksequelize = new sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    'dialect': 'mysql',
    'host': config.mysql.host,
    'port': config.mysql.port
});

exports.linksequelize = linksequelize;