const baseCheck = require('../modelfilter/base_check').basecheck;
module.exports = {
    /**
     * 验证用户打卡条件信息
     */
    monthInUserMarkFilter: function (req, res, next) {
        let userId = req.body.userId;
        let username = req.body.userName;
        let year = req.body.year;
        if (!username && !userId) {
            return res.json({
                MsgStatus: false,
                MsgContent: '用户名和用户Id至少有一个不能为空'
            });
        } else if (userId) {
            baseCheck.UserId(res, userId);
        } else if (username) {
            baseCheck.UserName(res, username);
        }
        if (!year) {
            return res.json({
                MsgStatus: false,
                MsgContent: '年份是必须的'
            });
        } else {
            baseCheck.Year(res, year);
        }
        next();
    },
    /**
     * 验证用户打卡传入信息
     */
    attendanceUserWhereFilter: function (req, res, next) {
        let userId = req.body.userId;
        let userName = req.body.userName;
        let year = req.body.year;
        let pageIndex = req.body.pageIndex;
        let pageSize = req.body.pageSize;
        let month = req.body.month;
        let groupId = req.body.groupId;

        if (userId) {
            baseCheck.UserId(userId);
        }
        if (username) {
            baseCheck.userName(username);
        }
        if (year) {
            baseCheck.Year(year);
        } else {
            return res.json({
                MsgStatus: false,
                MsgContent: '年份是必须的'
            });
        }

        if (pageIndex) {
            baseCheck.PageIndex(res, pageIndex);
        } else {
            return res.json({
                MsgStatus: false,
                MsgContent: '页码是必须的'
            });
        }
        if (pageSize) {
            baseCheck.PageSize(res, pageSize);
        } else {
            return res.json({
                MsgStatus: false,
                MsgContent: '页距是必须的'
            });
        }
        if (month) {
            baseCheck.Month(res, month);
        }
        if (groupId) {
            baseCheck.GroupId(res, groupId);
        }
        next();
    },
    /**
     * 审核打卡备注
     */
    editAttendanceIsPass: function (req, res, next) {
        let attendanceId = req.body.AttendanceId;
        let isPass = req.body.IsPass;
        if (!attendanceId) {
            return res.json({
                MsgStatus: false,
                MsgContent: '打卡备注Id是必须的'
            });
        } else if (attendanceId < 0) {
            return res.json({
                MsgStatus: false,
                MsgContent: '打卡备注Id不得小于0'
            });
        }
        let lastIsPass = parseInt(isPass);
        if (lastIsPass != isPass) {
            return res.json({
                MsgStatus: false,
                MsgContent: '审核状态是必须的'
            });
        }
        if (isPass < 1 || isPass > 2) {
            return res.json({
                MsgStatus: false,
                MsgContent: '审核状态不符合规范'
            });
        }
        next();
    }
}