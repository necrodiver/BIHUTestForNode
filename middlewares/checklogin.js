module.exports = {
    checkLogin: function checkLogin(req, res, next) {
        if (!req.session.user) {
            req.flash('error', '未登录');
            return res.redirect('/home/index');
        }
        next();
    },
    checkNotLogin: function checkNotLogin(req, res, next) {
        if (req.session.user) {
            req.flash('error', '已登录');
            return res.redirect('back');// 返回之前的页面
        }
        next();
    },
    checkVersion:function checkVersion(req,res,next){
        if (!req.session.user) {
            req.flash('error', '未登录');
            return res.redirect('/home/index');
            next();
        }else if(req.session.user.RoleId){}
    }
}