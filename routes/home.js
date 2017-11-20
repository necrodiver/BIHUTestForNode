const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/check').checkLogin;
const checkNotLogin = require('../middlewares/check').checkNotLogin;

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
    res.send('登录');
});

router.post('/logout', checkLogin, function (req, res, next) {
    res.send('登出');
});

module.exports = router;