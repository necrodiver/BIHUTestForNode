/**
 * 检测路由权限
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.urlFilter = function (req, res, next) {
    if (!req.session.user) {
        return res.json({
            MsgStatus: false,
            MsgContent: '未检测到登录状态，请重新登录！'
        });
    }

    if (req.originalUrl != "") {
        let urlData = req.originalUrl;
        urlData = urlData.split('?')[0];
        let urlDatas = urlData.split('/');
        if (urlDatas.length < 2) {
            return res.json({
                MsgStatus: false,
                MsgContent: '调用地址错误！'
            });
        }
        let controllerName = userDatas[0].toLowerCase();
        let actionName = userDatas[1].toLowerCase();
        var ctrlList = req.session.user.filter(function (item) {
            return item.ControllerName.toLowerCase() == controllerName;
        });
        if (ctrlList.length == 0) {
            return res.json({
                MsgStatus: false,
                MsgContent: '操作失败，权限不足！'
            });
        }
        var actionList = ctrlList.filter(function (item) {
            return item.ActionName == actionName;
        });
        if (actionList && actionList.length == 1) {
            next();
        }
        return res.json({
            MsgStatus: false,
            MsgContent: '操作失败，权限不足！'
        });
    }

    // if()
    if (req.session.user.RoleId >= 0 && req.session.user.RoleId <= 3) {
        res.json({
            MsgStatus: false,
            MsgContent: '操作失败，权限不足！'
        });
    }
}
/**
 * 检测第一权限
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.UserVersion1 = function (req, res, next) {
    if (!req.session.user) {
        return res.json({
            MsgStatus: false,
            MsgContent: '未检测到登录状态，请重新登录！'
        });
    }
    if (req.session.user.RoleId > 1) {
        return res.json({
            MsgStatus: false,
            MsgContent: '操作失败，权限不足！'
        });
    }
}
/**
 * 检测第二权限
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.UserVersion2 = function (req, res, next) {
    if (!req.session.user) {
        return res.json({
            MsgStatus: false,
            MsgContent: '未检测到登录状态，请重新登录！'
        });
    }
    if (req.session.user.RoleId > 2) {
        return res.json({
            MsgStatus: false,
            MsgContent: '操作失败，权限不足！'
        });
    }
}
/**
 * 检测第三权限
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.UserVersion3 = function (req, res, next) {
    if (!req.session.user) {
        return res.json({
            MsgStatus: false,
            MsgContent: '未检测到登录状态，请重新登录！'
        });
    }
    if (req.session.user.RoleId > 3) {
        return res.json({
            MsgStatus: false,
            MsgContent: '操作失败，权限不足！'
        });
    }
}