const linksequelize = require('../lib/linkmysql').linksequelize;
const authorityModel = require('../models/authority');
const Sequelize = require('sequelize');

const Authority = authorityModel(linksequelize, Sequelize);

exports.getAllList = function () {
    return Authority.findAll();
}
