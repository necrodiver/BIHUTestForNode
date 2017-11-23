/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('authority', {
    AuthorityId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    Explain: {
      type: DataTypes.CHAR(200),
      allowNull: false
    },
    RoleId: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    ActionName: {
      type: DataTypes.CHAR(30),
      allowNull: false
    },
    ControllerName: {
      type: DataTypes.CHAR(30),
      allowNull: false
    }
  }, {
    tableName: 'authority'
  });
};
