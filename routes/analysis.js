const express = require('express');
const router = express.Router();
const helpers = require('../middlewares/helpers');
const checkstr = require('../middlewares/checkstr');
const serializeattendance = require('../middlewares/serializeattendance');
const fs = require('fs');
const multer = require('multer');
const attendanceFilter = require('../modelfilter/month_in_usermark');
const attendanceOperate = require('../operate/attendanceoperate');
const upload = multer({
    dest: 'public/xls/'
});
const excelPath = "./public/xls/";

router.get('/', function (req, res, next) {
    res.redirect('/analysis/index');
});

router.get('/index', function (req, res, next) {
    let isLogin = false;
    if (req.session.user) {
        isLogin = true;
    }
    res.render('analysisexcel', {
        title: '考勤查询',
        IsAdmin: req.session.user.RoleId == 1,
        User: JSON.stringify(req.session.user),
        isLogin: isLogin
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
//获取考勤数据
router.get('/GetMonthData', function (req, res, next) {
    let msgModel = {
        MsgTitle: '获取考勤数据',
        MsgStatus: false,
        MsgContent: ''
    };
    var monthNum = req.query.monthNum;
    var checkModeled = checkstr.monthVerify(monthNum);
    if (!checkModeled.isCheck) {
        msgModel.MsgContent = checkModeled.data;
        return res.json(msgModel);
    }
    let excelfileStr = excelPath + `${checkModeled.data}月考勤.xls`;
    //后期添加redis存储，读取redis数据
    fs.exists(excelfileStr, function (isexists) {
        if (!isexists) {
            msgModel.MsgContent = "查询数据不存在,你可以先进行操作等待考勤数据导入";
        } else {
            var excelJson = serializeattendance.getUserAllList(excelfileStr);
            msgModel.MsgStatus = true;
            msgModel.MsgContent = excelJson;
            console.log(excelJson);
        }
        return res.json(msgModel);
    });
});

router.post('/AnalysisUserlist', function (req, res, next) {
    res.send('获取打卡备注列表');
});

router.post('/UploadXls', function (req, res, next) {
    res.send('上传xls文件');
});

router.post('/MonthData', function (req, res, next) {
    res.send('获取考勤数据');
});

router.post('/EditMarkStatus', function (req, res, next) {
    res.send('操作打卡备注(增删改)');
});
///获取打卡备注
router.post('/GetUserMarkData', attendanceFilter.monthInUserMarkFilter, function (req, res, next) {
    let msgModel = {
        MsgTitle: '获取打卡备注',
        MsgStatus: false,
        MsgContent: ''
    };
    let asModel = {
        UserId: req.body.userId,
        UserName: req.body.userName,
        ClockYear: req.body.year
    };
    attendanceOperate.getUserMarks(asModel).then(function (result) {
        msgModel.MsgContent = result;
        msgModel.MsgStatus = true;
        res.json(msgModel);
    }).catch(function (err) {
        next(err);
    });
});



module.exports = router;