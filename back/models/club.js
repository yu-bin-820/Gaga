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
      },
      {
        modelName: 'Club',
        tableName: 'clubs',
        charset: 'utf8',
        collate: 'utf8_general_ci', // 한글 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Club.belongsTo(db.User, {
      foreignKey: 'club_leader_no',
      as: 'ClubLeader',
    });
    db.Club.hasMany(db.RoomMessage, { as: 'ClubMessages' });
    db.Club.belongsToMany(db.User, {
      through: db.Member,
      as: 'ClubMembers',
    });
  }
};
