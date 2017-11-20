module.exports = function (app) {
    app.get('/', function (req, res) {
        res.redirect('/home');
    });
    app.use('/home', require('./home'));
    app.use('/analysis', require('./analysis'));
    app.use('/mycenter', require('./mycenter'));
}