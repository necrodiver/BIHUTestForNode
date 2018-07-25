/**
 * 验证打卡模型内容
 */
class checkAttendance {
    /**
     * 验证用户Id
     * @param {res} res 回传请求信息
     * @param {number} userId 用户id
     */
    static UserId(res, userId) {
        let lastUserId = parseInt(userId);
        if (lastUserId != userId) {
            return res.json({
                MsgStatus: false,
                MsgContent: '用户Id格式不正确'
            });
        }
        if (userId <= 0) {
            return res.json({
                MsgStatus: false,
                MsgContent: '用户Id数据无效'
            });
        }

    }
    /**
     * 验证用户名
     * @param {res} res 回传请求信息
     * @param {string} userName 用户名 
     */
    static UserName(res, userName) {
        if (!/^[\u4E00-\u9FA5]+$/.test(userName)) {
            return res.json({
                MsgStatus: false,
                MsgContent: '用户名格式不正确'
            });
        }
    }
    /**
     * 验证年份
     * @param {res} res 回传请求信息
     * @param {number} year 年份 
     */
    static Year(res, year) {
        let lastYear = parseInt(year);
        if (lastYear != year) {
            return res.json({
                MsgStatus: false,
                MsgContent: '年份格式不正确'
            });
        }
        if (year < 2017 || year > 2020) {
            return res.json({
                MsgStatus: false,
                MsgContent: '年份区域不正确'
            });
        }
    }
    /**
     * 验证页码
     * @param {res} res 回传请求信息 
     * @param {number} pageIndex 页码 
     */
    static PageIndex(res, pageIndex) {
        let lastPageIndex = parseInt(pageIndex);
        if (lastPageIndex != pageIndex) {
            return res.json({
                MsgStatus: false,
                MsgContent: '分页页码格式不正确'
            });
        }
        if (pageIndex <= 0) {
            return res.json({
                MsgStatus: false,
                MsgContent: '分页页码数不正确'
            });
        }
    }
    /**
     * 验证每页数量
     * @param {res} res 回传请求信息  
     * @param {number} pageSize 每页数量  
     */
    static PageSize(res, pageSize) {
        let lastPageSize = parseInt(pageSize);
        if (lastPageSize != pageSize) {
            return res.json({
                MsgStatus: false,
                MsgContent: '分页页距格式不正确'
            });
        }
        if (pageSize < 0 || pageSize > 100) {
            return res.json({
                MsgStatus: false,
                MsgContent: '分页页距不得小于0、不得大于100'
            });
        }
    }
    /**
     * 验证月份
     * @param {res} res 回传请求信息
     * @param {number} month 月份
     */
    static Month(res, month) {
        let lastMonth = parseInt(month);
        if (lastMonth != month) {
            return res.json({
                MsgStatus: false,
                MsgContent: '月份格式不正确'
            });
        }
        if (month < 1 || month > 12) {
            return res.json({
                MsgStatus: false,
                MsgContent: '月份不得小于1、不得大于12'
            });
        }
    }
    static GroupId(res, groupId) {
        let lastGroupId = parseInt(groupId);
        if (lastGroupId != groupId) {
            return res.json({
                MsgStatus: false,
                MsgContent: '分组格式不正确'
            });
        }
        if (groupId < 0 || groupId > 20) {
            return res.json({
                MsgStatus: false,
                MsgContent: '分组范围不得小于0、不得大于20'
            });
        }
    }
}
exports.basecheck = checkAttendance;