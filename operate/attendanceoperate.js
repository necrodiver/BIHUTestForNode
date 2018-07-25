const linksequelize = require('../lib/linkmysql').linksequelize;
const attendanceModel = require('../models/attendance');
const usersModel = require('../models/users');
const Sequelize = require('sequelize');

const Attendance = attendanceModel(linksequelize, Sequelize);
const Users = usersModel(linksequelize, Sequelize);

module.exports = {
    /**
     * 查询打卡记录单条备注
     * @param  {Attendance} adModel 模型实体类
     */
    getSingleAttendance: function (adModel) {
        console.log(`[打卡备注] 查询打卡记录单条备注 adModel:${JSON.stringify(adModel)}`);
        let whereModel = disposeAttendanceModel(adModel);
        return Attendance.findOne({
            where: whereModel
        });
    },
    /**
     * 添加一条打卡备注
     * @param  {Attendance} adModel 模型实体 
     */
    addAttendance: function (adModel) {
        console.log(`[打卡备注] 添加一条打卡备注 adModel:${JSON.stringify(adModel)}`);
        return Attendance.create(adModel);
    },
    /**
     * 删除一条打卡备注
     * @param {number} attendanceId 考勤备注Id  
     */
    deleteAttendance: function (attendanceId) {
        console.log(`[打卡备注] 删除一条打卡备注 attendanceId:${attendanceId}`)
        Attendance.destroy({
            id: attendanceId
        });
    },
    /**
     * 读取用户打卡备注集合
     * @param {AttendanceSearchModel}  asModel 模型实体
     */
    getUserMarks: function (asModel) {
        console.log(`[打卡备注] 读取用户打卡备注集合 asModel:${JSON.stringify(asModel)}`);
        let whereModel = {};
        if (asModel.UserId) {
            whereModel.UserId = parseInt(asModel.UserId);
        }
        if (asModel.UserName) {
            whereModel.UserName = asModel.UserName;
        }
        let whereAttendanceWhere = {};
        whereAttendanceWhere.ClockYear = parseInt(asModel.ClockYear);

        Users.hasMany(Attendance, {
            foreignKey: 'userId',
            sourceKey: 'userId',
            //as:"user9"
        });
        Attendance.belongsTo(Users,{
            foreignKey:'userId',
            sourceKey: 'userId'
        });
        return Attendance.findAll({
            where: whereAttendanceWhere,
            attributes: ["user.UserName", "attendance.*"],
            include: [{
                model: Users,
                where:whereModel
            }],
            raw:true
        });
    },
    /**
     * 获取分页打卡备注集合
     * @param  {AttendanceSearchModel} asModel 模型实体  
     */
    getAttendanceList: function (asModel) {
        console.log(`[打卡备注] 获取分页打卡备注集合 ${JSON.stringify(asModel)}`);
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
     * @param {Attendance} adModel 模型实体   
     */
    updateAttendance: function (adModel) {
        console.log(`[打卡备注] 更新打卡备注 adModel:${JSON.stringify(adModel)}`);
        let updateModel = disposeAttendanceModel(adModel);
        let whereModel = {
            AttendanceId: adModel.AttendanceId
        }
        Attendance.update(updateModel, {
            where: whereModel
        });
    },
    /**
     * 执行修改打卡备注通过
     * @param {number} attendanceId 考勤Id   
     * @param {boolean} isPass 是否通过    
     */
    editAttendanceIsPass: function (attendanceId, isPass) {
        console.log(`[打卡备注] 执行修改打卡备注通过 attendanceId:${attendanceId},isPass:${isPass}`);
        let whereModel = {
            AttendanceId: attendanceId
        }
        let updateModel = {
            IsPass: isPass
        }
        Attendance.update(updateModel, {
            where: whereModel
        });
    },

};
/**
 * 处理Attendance，拼接where条件
 * @param {Attendance} adModel 模型实体   
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