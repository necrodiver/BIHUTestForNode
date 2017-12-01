const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checklogin').checkLogin;
const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
const users = require('../operate/usersoperate');

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
router.post('/GetUserList', checkLogin, function (req, res, next) {
    const userId = req.body.UserId;
    const groupId = req.body.GroupId;
    const pageNum = req.body.pageNum;
    const pageSize = req.body.pageSize;
    const leftNum = (pageNum - 1) * pageSize;
    const where={};
    if(userId){
        where.UserId=userId;
    }
    if(groupId){
        where.GroupId=groupId;
    }
    const limit = {
        offset: leftNum,
        limit: pageSize
    };
    users.getPageList(where,limit).then(function (userAllList) {
        res.json(userAllList);
    }).catch(next);
});

// GetUserList: '/MyCenter/GetUserList',//获取用户列表
// AddUserList: '/MyCenter/AddUserList',//添加用户集合
// DeleteUserList: '/MyCenter/DeleteUserList',//删除用户集合
// EditUser: '/MyCenter/EditUser', //修改用户信息

router.post('/AddUserList',checkLogin,function(req,res,next){
    
});


module.exports = router;