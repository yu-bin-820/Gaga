const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class DirectMessage extends Model {
  static init(sequelize) {
    return super.init(
      {
        message_no: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        sender_no: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        receiver_no: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        content: {
          type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true, // 필수
        },
        content_type_no: {
          type: DataTypes.INTEGER, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        path: {
          type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: DataTypes.NOW,
        },
        read_state: {
          type: DataTypes.INTEGER,
          defaultValue: 1,
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
        modelName: 'DirectMessage',
        tableName: 'direct_messages',
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', // 이모티콘 저장
        timestamps: false, // timestamps 필드 사용X
        sequelize,
      }
    );
  }
  static associate(db) {
    db.DirectMessage.belongsTo(db.User, {
      foreignKey: 'sender_no',
      as: 'Sender',
    });
    db.DirectMessage.belongsTo(db.User, {
      foreignKey: 'receiver_no',
      as: 'Receiver',
    });
  }
};
