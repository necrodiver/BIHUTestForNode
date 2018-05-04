const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checklogin').checkLogin;
const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
const strVerify = require('../middlewares/checkstr');
const users = require('../operate/usersoperate');
const aesHelper = require('../middlewares/aeshelper');
/**
 * 首页
 */
router.get('/', function (req, res, next) {
    res.redirect('/home/index');
});
/**
 * 首页
 */
router.get('/index',function (req, res, next) {
    let isLogin = false;
    if (req.session.user) {
        isLogin = true;
    }
    res.render('index', {
        title: '首页',
        isLogin: isLogin
    });
})

/**
 * 登录
 */
router.post('/signin', checkNotLogin, function (req, res, next) {
    let userName = req.body.Email;
    let pwd = req.body.Pwd;
    let readMe = req.body.ReadMe;
    let msgModel = {
        MsgTitle: '登录操作',
        MsgStatus: false,
        MsgContent: ''
    };
    let msg = '';

    msg = strVerify.userNameVerify(userName);
    if (msg) {
        msgModel.MsgContent = msg;
        return res.json(msgModel);
    }
    msg = strVerify.pwdVerify(pwd);
    if (msg) {
        msgModel.MsgContent = msg;
        return res.json(msgModel);
    }

    let pwdEncrypted = aesHelper.aesEncrypt(pwd);
    let user = {
        Email: userName,
        Pwd: pwdEncrypted
    };
    users.getList(user).then(function (userlist) {
        console.log('查询的用户数据', userlist);
        if (userlist == undefined || userlist.length == 0) {
            msgModel.MsgStatus = false;
            msgModel.MsgContent = "当前登录名或密码错误，请重新输入";
        } else if (userlist.length == 1) {
            let userModel = userlist[0];
            delete userModel.dataValues.Pwd;
            req.session.user = userModel; //只有这里是保存用户信息
            msgModel.MsgStatus = true;
            msgModel.MsgContent = userModel;
        } else {
            msgModel.MsgStatus = false;
            msgModel.MsgContent = '查询失败，数据错误！请检查数据库内容是否符合';
        }
        return res.json(msgModel);
    }).catch(next);

});
/**
 * 登出
 */
router.get('/signout', checkLogin, function (req, res, next) {
    req.session.user = null;
    res.redirect('/home/index');
});
router.get('/404', function (req, res, next) {
    req.session.user = null;
    res.render('404', {
        title: '404错误',
        isLogin: false
    });
});
router.get('/500', function (req, res, next) {
    req.session.user = null;
    res.render('500', {
        title: '500错误',
        isLogin: false
    });
});
module.exports = router;