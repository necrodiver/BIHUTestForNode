const roles = require('../operate/rolesoperate');
const authoritys = require('../operate/authorityoperate');

/**
 * 首页调用初始化，如果有则初始化，没有则不初始化
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.InitRole = function (req, res, next) {
    if (!req.session.roleList) {
        roles.getAllList().then(function (roleList) {
            if (roleList != undefined && roleList.length > 0) {
                req.session.roleList == roleList;
            } else {
                throw new Error('获取权限列表失败！');
            }
            next();
        }).catch(next);
    }
}
exports.InitAuthority=function(req,res,next){
    if (!req.session.authorityList) {
        authoritys.getAllList().then(function (auList) {
            if (auList != undefined && auList.length > 0) {
                req.session.authorityList == auList;
            } else {
                throw new Error('获取权限列表失败！');
            }
            next();
        }).catch(next);
    }
}