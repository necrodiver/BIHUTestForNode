const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checklogin').checkLogin;
const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
const strVerify = require('../middlewares/checkstr');

router.get('/', function (req, res, next) {
    res.redirect('/mycenter/index');
});

router.get('/index', checkLogin, function (req, res, next) {
    res.render('mycenter', {
        title: '个人中心',
        isLogin: true,
        User:req.session.user
    });
});

module.exports = router;