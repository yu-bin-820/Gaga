const Sequelize = require('sequelize');

const club = require('./club');
const meeting = require('./meeting');
const roomMessage = require('./roomMessage');
const directMessage = require('./directMessage');
const user = require('./user');
const member = require('./member');
const reader = require('./reader');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Club = club;
db.Meeting = meeting;
db.RoomMessage = roomMessage;
db.DirectMessage = directMessage;
db.User = user;
db.Member = member;
db.Reader = reader;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
