const express = require('express');
const router = express.Router();
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
        }
        else if (userlist.length == 1) {
            let userModel = userlist[0];
            delete userModel.Pwd;
            req.session.user = userModel;//只有这里是保存用户信息
            msgModel.MsgStatus = true;
            msgModel.MsgContent = userModel;
        }
        else {
            msgModel.MsgStatus = false;
            msgModel.MsgContent = '查询失败，数据错误！请检查数据库内容是否符合';
        }
        return res.json(msgModel);
    }).catch(next);

});

router.post('/logout', checkLogin, function (req, res, next) {
    res.send('登出');
});

module.exports = router;