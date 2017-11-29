/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('companygroup', {
    GroupId: {
      type: DataTypes.INTEGER(2),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    GroupName: {
      type: DataTypes.CHAR(20),
      allowNull: false
    }
  }, {
    tableName: 'companygroup',
    timestamps: false
  });
};
