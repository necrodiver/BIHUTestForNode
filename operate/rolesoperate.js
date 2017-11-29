const linksequelize = require('../lib/linkmysql').linksequelize;
const rolesModel = require('../models/roles');
const Sequelize = require('sequelize');

const Roles = rolesModel(linksequelize, Sequelize);

exports.getAllList = function () {
    return Roles.findAll();
}