/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    Email: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    UserName: {
      type: DataTypes.CHAR(20),
      allowNull: false
    },
    Pwd: {
      type: DataTypes.CHAR(50),
      allowNull: false
    },
    CreateTime: {
      type: DataTypes.DATE,
      allowNull: false
    },
    RoleId: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    GroupId: {
      type: DataTypes.INTEGER(2),
      allowNull: false
    }
  }, {
    tableName: 'users',
    timestamps: false
  });
};
