exports.userNameFilter = function (req, res, next) {
    let usernames = req.body.UserNames;
    if (!/^[\u4E00-\u9FA5\,]+$/.text(usernames)) {
        return res.json({
            MsgStatus: false,
            MsgContent: '用户姓名集合格式错误！'
        });
    }
    if (usernames.length > 1000) {
        return res.json({
            MsgStatus: false,
            MsgContent: '用户姓名集合长度不得超过1000个字符串！'
        });
    }
    let usernameList = usernames.split(',');
    let usercheckList = usernameList.filter(function (item) {
        if (item && item.length > 1 && item.length <= 5)
            return false;
        return true;
    });
    if (usercheckList && usercheckList.length > 0) {
        return res.json({
            MsgStatus: false,
            MsgContent: '有 '+usercheckList.length+' 处单个用户姓名长度不符合规范！'
        });
    }
    next();
}