const init = require('../middlewares/init');
const userVersion = require('../middlewares/userversion');

module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    app.use(init.InitRole);
    app.use(init.InitAuthority);
    app.use('/home', require('./home'));
    app.use('/analysis', require('./analysis'));
    app.use('/mycenter', require('./mycenter'));
}