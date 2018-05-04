var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checklogin').checkLogin;
var helpers=require('../middlewares/heplers');

router.get('/', checkLogin, function (req, res, next) {
    res.redirect('/analysis/index');
});

router.get('/index', checkLogin, function (req, res, next) {
    res.render('analysisexcel', {
        title: '考勤查询',
        IsAdmin: req.session.user.RoleId == 1,
        User:JSON.stringify(req.session.user)
    });
});

router.post('/analysisuserlist', checkLogin, function (req, res, next) {
    res.send('获取打卡备注列表');
});

router.post('/uploadxls', checkLogin, function (req, res, next) {
    res.send('上传xls文件');
});

router.post('/monthdata', checkLogin, function (req, res, next) {
    res.send('获取考勤数据');
});

router.post('/editmarkstatus', checkLogin, function (req, res, next) {
    res.send('操作打卡备注(增删改)');
});

router.post('/usermarkyeardata', checkLogin, function (req, res, next) {
    res.send('获取用户打卡年记录');
});

module.exports = router;