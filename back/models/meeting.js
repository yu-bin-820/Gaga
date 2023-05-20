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
      },
      {
        modelName: 'Meeting',
        tableName: 'meetings',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Meeting.belongsTo(db.User, {
      foreignKey: 'meeting_leader_no',
      as: 'MeetingLeader',
    });
    db.Meeting.hasMany(db.RoomMessage, { as: 'MeetingMessages' });
    db.Meeting.belongsToMany(db.User, {
      through: db.Member,
      as: 'MeetingMembers',
    });
  }
};
