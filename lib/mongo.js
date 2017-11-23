const config = require('config-lite')(__dirname);
const Mongolass = require('mongolass');
const mongolass = new Mongolass();
mongolass.connect(config.mongodb);
//#region users 用户表
exports.users = mongolass.model('users', {
    UserId: { type: Number },
    Email: { type: String },
    Pwd: { type: String },
    CreateTime: { type: Date },
    RoleId: { type: Number },
    GroupId: { type: Number }
});
exports.users.index({ UserId: 1, _id: 1 }, { unique: true }).exec();//根据用户id找到用户，按照创建时间升序来查询数据，用户id全局唯一  
exports.users.index({ Email: 1 }, { unique: true }).exec();//根据用户Email查询数据，用户Email全局唯一
//#endregion  

//#region roles 权限表
exports.roles = mongolass.model('roles', {
    RoleId: { type: Number },
    RoleName: { type: String }
});
exports.roles.index({ RoleId: 1, _id: 1 }, { unique: true }).exec();//根据RoleId查询，按时间升序，唯一
//endregion 

//#region  groups 分组表
exports.groups = mongolass.model('groups', {
    GroupId: { type: Number },
    GroupName: { type: String }
});
exports.groups.index({ GroupId: 1, _id: 1 }).exec();//根据GroupId查询，按创建时间升序,唯一
//#endregion 

//#region attendance 用户备注表
exports.attendance = mongolass.model('attendance', {
    AttendanceId: { type: Number },
    UserId: { type: Number },
    TimeSlot: { type: Number },
    ClockYear: { type: Number },
    ClockMonth: { type: Number },
    ClockTime: { type: Date },
    UDayStateId: { type: Number },
    ClockContent: { type: String },
    CreateTime: { type: Date },
    IsPass: { type: Number }
});
exports.attendance.index({AttendanceId:1,_id: 1},{unique: true}).exec();//按AttendanceId，创建时间升序查询，唯一
//#endregion  

// 根据 id 生成创建时间 created_at
mongolass.plugin('addCreatedAt', {
    afterFind: function (results) {
        results.forEach(function (item) {
            item.created_at = moment(objectIdToTimestamp(item._id)).format('YYYY-MM-DD HH:mm');
        });
        return results;
    },
    afterFindOne: function (result) {
        if (result) {
            result.created_at = moment(objectIdToTimestamp(result._id)).format('YYYY-MM-DD HH:mm');
        }
        return result;
    }
});