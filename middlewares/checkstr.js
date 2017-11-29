module.exports = {
    userNameVerify: function (username) {
        if (!username) {
            return '登录账号不能为空!';
        }
        if (!/^[0-9a-zA-Z]{2,20}\@91bihu\.com/.test(username)) {
            return '登录账号格式不正确';
        }
        return null;
    },
    pwdVerify:function(pwd){
        if (!pwd) {
            return '登录密码不能为空!';
        }
        if (!/^[A-Za-z\.0-9]{4,20}/.test(pwd)) {
            return '登录密码格式不正确';
        }
        return null;
    }
}