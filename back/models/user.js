const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class User extends Model {
  static init(sequelize) {
    return super.init(
      {
        user_no: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        user_id: {
          type: DataTypes.STRING(30), // STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME
          allowNull: false, // 필수
        },
        nick_name: {
          type: DataTypes.STRING(30),
          allowNull: false, // 필수
        },
        profile_img: {
          type: DataTypes.STRING(100),
          allowNull: true, // 필수
        },
      },
      {
        modelName: 'User',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        timestamps: false, // timestamps 필드 사용X
        sequelize,
      }
    );
  }
  static associate(db) {
    db.User.hasMany(db.Meeting, {
      as: 'OwnedMeeting',
      foreignKey: 'meeting_leader_no',
    });
    db.User.hasMany(db.Club, {
      as: 'OwnedClub',
      foreignKey: 'club_leader_no',
    });
    db.User.belongsToMany(db.Meeting, {
      through: 'members',
      as: 'Meetings',
      foreignKey: 'user_no',
      otherKey: 'meeting_no',
      timestamps: false,
    });
    db.User.belongsToMany(db.Club, {
      through: 'members',
      as: 'Clubs',
      foreignKey: 'user_no',
      otherKey: 'club_no',
      timestamps: false,
    });
    db.User.belongsToMany(db.RoomMessage, {
      through: 'readers',
      as: 'ReadedMessages',
      foreignKey: 'user_no',
      otherKey: 'message_no',
      timestamps: false,
    });
    db.User.hasMany(db.RoomMessage, {
      foreignKey: 'sender_no',
      as: 'SentMessages',
    });
  }
};
