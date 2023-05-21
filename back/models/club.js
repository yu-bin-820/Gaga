const DataTypes = require('sequelize');
const { Model } = DataTypes;

module.exports = class Club extends Model {
  static init(sequelize) {
    return super.init(
      {
        club_no: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        club_name: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        club_leader_no: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        club_img: {
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
      },
      {
        modelName: 'Club',
        tableName: 'clubs',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        timestamps: false, // timestamps 필드 사용X
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Club.belongsTo(db.User, {
      foreignKey: 'club_leader_no',
      as: 'ClubLeader',
    });
    db.Club.hasMany(db.RoomMessage, {
      as: 'ClubMessages',
      foreignKey: 'club_no',
    });
    db.Club.belongsToMany(db.User, {
      through: 'members',
      as: 'ClubMembers',
      foreignKey: 'club_no',
      otherKey: 'user_no',
      timestamps: false,
    });
  }
};
