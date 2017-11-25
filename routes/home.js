const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const checkLogin = require('../middlewares/checklogin').checkLogin;
const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
const strVerify = require('../middlewares/checkstr');
const users = require('../operate/usersoperate');
const aesHelper = require('../middlewares/aeshelper');

router.get('/', function (req, res, next) {
    res.redirect('/home/index');
});

router.get('/index', function (req, res, next) {
    res.render('index', {
        title: '首页',
        isLogin: false
    });
})

router.post('/login', checkNotLogin, function (req, res, next) {
    var userName = req.body.Email;
    var pwd = req.body.Pwd;
    var readMe = req.body.ReadMe;
    var msgModel = {
        msgTitle: '登录操作',
        msgStatus: false,
        msgContent: ''
    };
    var msg = '';

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

    var pwdEncrypted = aesHelper.aesEncrypt(pwd);
    console.log('加密后字符串：',pwdEncrypted);
    var pwdDeEncrypted=aesHelper.aesUnEncrypt(pwdEncrypted);
    console.log('解密字符串：',pwdDeEncrypted);
    
    res.send('登录');
});

router.post('/logout', checkLogin, function (req, res, next) {
    res.send('登出');
});

module.exports = router;