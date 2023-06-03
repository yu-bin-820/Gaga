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
        sender_no: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        content_type_no: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        lat: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
        lng: {
          type: DataTypes.DOUBLE,
          allowNull: true,
        },
      },
      {
        modelName: 'RoomMessage',
        tableName: 'room_messages',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        timestamps: false, // timestamps 필드 사용X
        sequelize,
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
      sourceKey: 'meeting_no',
    });
    db.RoomMessage.belongsTo(db.Club, {
      foreignKey: 'club_no',
      as: 'Club',
      sourceKey: 'club_no',
    });
    db.RoomMessage.belongsToMany(db.User, {
      through: 'readers',
      as: 'Readers',
      foreignKey: 'message_no',
      otherKey: 'user_no',
      timestamps: false,
    });
  }
};
