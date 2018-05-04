const init = require('../middlewares/init');
const userVersion = require('../middlewares/userversion');
const checkLogin = require('../middlewares/checklogin').checkLogin;

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    app.use(init.InitRole);
    app.use(init.InitAuthority);
    app.use('/home', require('./home'));
    app.use('/analysis', checkLogin, require('./analysis'));
    app.use('/mycenter', checkLogin, require('./mycenter'));
}