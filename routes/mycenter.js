const express = require('express');
const router = express.Router();
const checkLogin = require('../middlewares/checklogin').checkLogin;
const checkNotLogin = require('../middlewares/checklogin').checkNotLogin;
const strVerify = require('../middlewares/checkstr');

router.get('/', function (req, res, next) {
    res.redirect('/mycenter/index');
});

router.get('/index', function (req, res, next) {

});

module.exports = router;