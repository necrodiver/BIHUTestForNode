/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('roles', {
    RoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    RoleName: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    tableName: 'roles',
    timestamps: false
  });
};
