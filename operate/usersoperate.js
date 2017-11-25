const linksequelize = require('../lib/linkmysql').linksequelize;
const usersModel = require('../models/users');
const Sequelize =require('sequelize');

const Users = usersModel(linksequelize, Sequelize);

exports.addUser = function (user) {
    return Users.create(user).then(function (result) {
        console.log(result)
    }).catch(function (err) {
        console.log(err);
    });
};
exports.addUsers = function (users) {
    var userAllList = getAllList();
    for (var childUser in users) {
        var selectUsers = userAllList.filter(function (item) {
            return item.Email == childUser.Email;
        });
        if (selectUsers != undefined && selectUsers.length > 0)
            return false;
    }

    Users.bulkCreate(users, {
        ignoreDuplicates: true   //唯一
    }).then(function (result) {
        console.log(result);
        Users.close();
    }).catch(function (err) {
        console.log(err);
        Users.close();
    });
}
exports.getAllList = function (next) {
    Users.findAll().then(function (userList) {
        next(userList);
    }).catch(function (err) {
        console.log(err);
        throw new Error(err);
    });
}
exports.getList = function (user) {
    Users.findAll({
        where: user
    }).then(function (userList) {

     }).catch(function (err) {
        console.log(err);
        throw new Error(err);
    });
}
exports.getPageList=function(leftNum,lengthNum){
    Users.findAll({ offset:leftNum, limit: lengthNum }).then(function(userList){
        
    }).catch(function(err){
        console.log(err);
        throw new Error(err);
    });
}

exports.deleteList = function (users) {
    Users.destroy({
        where: users
    }).then(function (result) {
        console.log(result);
        //    if(rowDeleted === 0){
        //       console.log('成功删除记录');
        //     }
    }).catch(function (err) {
        console.log(err);
        throw new Error(err);
    });
}


