const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Reader extends Model {
  static init(sequelize) {
    return super.init(
      {
        reader_no: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        message_no: {
          type: DataTypes.INTEGER,
        },
        user_no: {
          type: DataTypes.INTEGER,
        },
      },
      {
        modelName: 'Reader',
        tableName: 'readers',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        timestamps: false, // timestamps 필드 사용X
        sequelize,
      }
    );
  }
  static associate(db) {}
};
