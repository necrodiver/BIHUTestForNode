module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            return res.redirect('/home/index');
        }
        next();
    },
    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            return res.redirect('back');// 返回之前的页面
        }
        next();
    }
}