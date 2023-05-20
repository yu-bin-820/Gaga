const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class RoomMessage extends Model {
  static init(sequelize) {
    return super.init(
      {
        message_no: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        content: {
          type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
      },
      {
        modelName: 'RoomMessage',
        tableName: 'room_messages',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        sequelize,
        timestamps: true, // timestamps 필드 사용
        createdAt: 'created_at', // 테이블의 createdAt 칼럼과 매핑
        updatedAt: 'updated_at', // updatedAt 필드 사용하지 않음
      }
    );
  }
  static associate(db) {
    db.RoomMessage.belongsTo(db.User, {
      foreignKey: 'sender_no',
      as: 'Sender',
    });
    db.RoomMessage.belongsTo(db.Meeting, {
      foreignKey: 'meeting_no',
      as: 'Meeting',
    });
    db.RoomMessage.belongsTo(db.Club, { foreignKey: 'club_no', as: 'Club' });
  }
};
