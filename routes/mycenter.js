const express = require('express');
const pinyin = require('pinyin');
const moment = require('moment');
const config = require('config-lite')(__dirname);
const router = express.Router();

const checkLogin = require('../middlewares/checklogin').checkLogin;
const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
const users = require('../operate/usersoperate');
const userVersion = require('../middlewares/userversion');
const userFilter = require('../modelfilter/userfilter');
const aesHelper = require('../middlewares/aeshelper');
router.get('/', function (req, res, next) {
    res.redirect('/mycenter/index');
});

router.get('/index', checkLogin, function (req, res, next) {
    res.render('mycenter', {
        title: '个人中心',
        isLogin: true,
        User: req.session.user
    });
});

/**
 * 获取分页用户列表
 */
router.post('/GetUserList', userVersion.urlFilter, userVersion.UserVersion1, function (req, res, next) {
    const userId = req.body.UserId;
    const groupId = req.body.GroupId;
    const pageNum = req.body.pageNum;
    const pageSize = req.body.pageSize;
    const leftNum = (pageNum - 1) * pageSize;
    const where = {};
    if (userId) {
        where.UserId = userId;
    }
    if (groupId) {
        where.GroupId = groupId;
    }
    const limit = {
        offset: leftNum,
        limit: pageSize
    };
    users.getPageList(where, limit).then(function (userAllList) {
        res.json(userAllList);
    }).catch(next);
});

// GetUserList: '/MyCenter/GetUserList',//获取用户列表
// DeleteUserList: '/MyCenter/DeleteUserList',//删除用户集合
// EditUser: '/MyCenter/EditUser', //修改用户信息
/**
 * 添加用户集合
 */
router.post('/AddUserList', checkLogin, userVersion.urlFilter, userVersion.UserVersion1, userFilter.userNameFilter, function (req, res, next) {
    let userNames = req.body.UserNames;
    let userNamesList = userNames.split(',');
    let userModelList = [];
    userNamesList.array.forEach(element => {
        var namePY = pinyin(element, {
            style: pinyin.STYLE_NORMAL
        }).join();
        userModelList.push({
            UserName: element,
            Email: namePY + config.defaultConf.lastEmail,
            Pwd: aesHelper.aesEncrypt(namePY),
            CreateTime: moment().format('YYYY-MM-DD HH:mm:ss'),
            RoleId: config.defaultConf.addRoleId,
            GroupId: req.session.user.GroupId
        });
    });
});
router.post('/MyCenter/DeleteUserList', checkLogin, userVersion.UserVersion1, userVersion.urlFilter, function (req, res, next) {
    //这里删除用户合集
});
router.post('/MyCenter/EditUser', checkLogin, userVersion.urlFilter, userVersion.UserVersion1, (req, res, next) => {

});
//26cm*18cm

module.exports = router;