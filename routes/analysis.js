const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checklogin').checkLogin;
const helpers = require('../middlewares/heplers');
const fs = require('fs');
const multer = require('multer');
const upload = multer({
    dest: 'public/xls/'
});
const excelPath = './public/xls/';

router.get('/', function (req, res, next) {
    res.redirect('/analysis/index');
});

router.get('/index', function (req, res, next) {
    res.render('analysisexcel', {
        title: '考勤查询',
        IsAdmin: req.session.user.RoleId == 1,
        User: JSON.stringify(req.session.user)
    });
});
//上传Excel文件
router.post('/UploadXls', upload.single('requestFile'), function (req, res, next) {
    let msgModel = {
        MsgTitle: '上传Excel',
        MsgStatus: false,
        MsgContent: ''
    };
    let file = req.file;
    let fileName = file.originalname; //文件名
    fs.exists(excelPath + fileName, function (isexists) {
        if (isexists) {
            msgModel.MsgContent = "文件已存在，请勿重复上传！";
            res.json(msgModel);
        } else {
            fs.renameSync(excelPath + file.filename, excelPath + fileName);
            msgModel.MsgStatus = true;
            msgModel.MsgContent = "上传成功！";
            res.json(msgModel);
        }
    });

});

router.post('/getmonthdata', function (req, res, next) {
    //处理获取内容

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