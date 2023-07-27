const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Meeting extends Model {
  static init(sequelize) {
    return super.init(
      {
        meeting_no: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        meeting_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        meeting_leader_no: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        meeting_img: {
          type: DataTypes.STRING(255),
          allowNull: true,
        },
        last_message_time: {
          type: DataTypes.DATE,
        },
        last_message: {
          type: DataTypes.TEXT, // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: true,
        },
        meeting_state: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
      },
      {
        modelName: 'Meeting',
        tableName: 'meetings',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        timestamps: false, // timestamps 필드 사용X
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Meeting.belongsTo(db.User, {
      foreignKey: 'meeting_leader_no',
      as: 'MeetingLeader',
    });
    db.Meeting.hasMany(db.RoomMessage, {
      as: 'MeetingMessages',
      foreignKey: 'meeting_no',
    });
    db.Meeting.belongsToMany(db.User, {
      through: 'members',
      as: 'MeetingMembers',
      foreignKey: 'meeting_no',
      otherKey: 'user_no',
      timestamps: false,
    });
  }
};
