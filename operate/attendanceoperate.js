const linksequelize = require('../lib/linkmysql').linksequelize;
const attendanceModel = require('../models/attendance');
const usersModel = require('../models/users');
const Sequelize = require('sequelize');

const Attendance = attendanceModel(linksequelize, Sequelize);

module.exports = {
    /**
     * 查询考勤单条数据
     * @param  模型实体 Attendance 
     */
    getSingleAttendance: function (adModel) {
        let whereModel = disposeAttendanceModel(adModel);
        return Attendance.findOne({
            where: whereModel
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    },
    /**
     * 添加一条考勤数据
     * @param  模型实体 Attendance 
     */
    addAttendance: function (adModel) {
        return Attendance.create(adModel).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    },
    /**
     * 删除一条考勤数据
     * @param 考勤备注Id attendanceId 
     */
    deleteAttendance: function (attendanceId) {
        Attendance.destroy({
            id: attendanceId
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    },
    /**
     * 读取用户打卡备注集合
     * @param  模型实体 AttendanceSearchModel 
     */
    getUserMarks: function (asModel) {
        let whereModel = {};
        if (asModel.UserId) {
            whereModel.UserId = asModel.UserId;
        }
        if (asModel.UserName) {
            whereModel.UserName = asModel.UserName;
        }
        whereModel.ClockYear = asModel.ClockYear;
        return Attendance.findAll({
            where: whereModel,
            attributes: ["users.UserName", "attendance.*"],
            include: [{
                model: usersModel,
                where: {
                    UserId: Sequelize.col('users.UserId')
                }
            }]
        });
    },
    /**
     * 获取分页打卡备注数据
     * @param  模型实体 AttendanceSearchModel 
     */
    getAttendanceList: function (asModel) {
        let whereModel = {};
        if (asModel.UserId) {
            whereModel.UserId = asModel.UserId;
        }
        if (asModel.UserName) {
            whereModel.UserName = asModel.UserName;
        }
        if (asModel.ClockMonth) {
            whereModel.ClockMonth = asModel.ClockMonth;
        }
        if (asModel.GroupId) {
            whereModel.GroupId = asModel.GroupId;
        }
        whereModel.ClockYear = asModel.ClockYear;

        return Attendance.findAndCountAll({
            attributes: [],
            where: whereModel,
            offset: asModel.LeftNum,
            limit: asModel.PageCount,
            include: [{
                model: usersModel,
                where: {
                    UserId: Sequelize.col('users.UserId')
                }
            }]
        });
    },
    /**
     * 更新打卡备注
     * @param  模型实体  Attendance 
     */
    updateAttendance: function (adModel) {
        let updateModel = disposeAttendanceModel(adModel);
        let whereModel = {
            AttendanceId: adModel.AttendanceId
        }
        Attendance.update(updateModel, {
            where: whereModel
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    },
    /**
     * 修改考勤是否通过
     * @param  考勤Id  attendanceId 
     * @param  是否通过 isPass   
     */
    editAttendanceIsPass: function (attendanceId, isPass) {
        let whereModel = {
            AttendanceId: attendanceId
        }
        let updateModel = {
            IsPass: isPass
        }
        Attendance.update(updateModel, {
            where: whereModel
        }).then(result => {
            console.log(result);
        }).catch(err => {
            console.log(err);
        });
    },

};
/**
 * 处理Attendance，拼接where条件
 * @param  模型实体  adModel 
 */
function disposeAttendanceModel(adModel) {
    let whereModel = {};
    if (adModel.AttendanceId) {
        whereModel.AttendanceId = adModel.AttendanceId;
    }
    if (adModel.ClockContent) {
        whereModel.ClockContent = adModel.ClockContent;
    }
    if (adModel.ClockTime) {
        whereModel.ClockTime = adModel.ClockTime;
    }
    if (adModel.IsPass) {
        whereModel.IsPass = adModel.IsPass;
    }
    whereModel.ClockYear = adModel.ClockYear;
    whereModel.TimeSlot = adModel.TimeSlot;
    whereModel.UDayStateId = adModel.UDayStateId;
    if (adModel.UserId) {
        whereModel.UserId = adModel.UserId;
    }
    return adModel;
}