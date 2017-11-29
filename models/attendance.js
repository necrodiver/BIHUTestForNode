/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attendance', {
    AttendanceId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    UserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    TimeSlot: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    ClockYear: {
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    ClockMonth: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    ClockTime: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    UDayStateId: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    },
    ClockContent: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    CreateTime: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    IsPass: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    }
  }, {
    tableName: 'attendance',
    timestamps: false
  });
};
