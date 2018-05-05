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
    pwdVerify: function (pwd) {
        if (!pwd) {
            return '登录密码不能为空!';
        }
        if (!/^[A-Za-z\.0-9]{4,20}/.test(pwd)) {
            return '登录密码格式不正确';
        }
        return null;
    },
    monthVerify: function (numStr) {
        let checkModel = {
            isCheck: false,
            data: ""
        };
        if (!numStr) {
            checkModel.data = "输入月份不能为空"
            return checkModel;
        }
        if (!/^[1,2,3,4,5,6,7,8,9]{1}$|^1[0,1,2]{1}$/.test(numStr)) {
            checkModel.data = "输入的月份不符合规范"
            return checkModel;
        }
        checkModel.isCheck = true;
        checkModel.data = parseInt(numStr);
        return checkModel;
    }
}