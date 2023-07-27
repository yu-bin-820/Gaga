const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Member extends Model {
  static init(sequelize) {
    return super.init(
      {
        member_no: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_no: {
          type: DataTypes.INTEGER,
        },
        club_no: {
          type: DataTypes.INTEGER,
        },
        meeting_no: {
          type: DataTypes.INTEGER,
        },
        state: {
          type: DataTypes.INTEGER,
        },
      },
      {
        modelName: 'Member',
        tableName: 'members',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        timestamps: false, // timestamps 필드 사용X
        sequelize,
      }
    );
  }
  static associate(db) {}
};
