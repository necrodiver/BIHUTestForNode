var express = require('express');
var router = express.Router();
var checkLogin = require('../middlewares/checklogin').checkLogin;
var helpers=require('../middlewares/heplers');

router.get('/', function (req, res, next) {
    res.redirect('/analysis/index');
});

router.get('/index', function (req, res, next) {
    res.render('analysisexcel', {
        title: '考勤查询',
        IsAdmin: req.session.user.RoleId == 1,
        User:JSON.stringify(req.session.user)
    });
});


router.post('/GetMonthData',function(req,res,next){
    //处理
});

router.post('/analysisuserlist', function (req, res, next) {
    res.send('获取打卡备注列表');
});

router.post('/uploadxls', function (req, res, next) {
    res.send('上传xls文件');
});

router.post('/monthdata', function (req, res, next) {
    res.send('获取考勤数据');
});

router.post('/editmarkstatus', function (req, res, next) {
    res.send('操作打卡备注(增删改)');
});

router.post('/usermarkyeardata', function (req, res, next) {
    res.send('获取用户打卡年记录');
});

module.exports = router;