require('dotenv').config();

module.exports = {
  development: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    dialectOptions: {
      // 여기에서 타임존 설정
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
  test: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    dialectOptions: {
      // 여기에서 타임존 설정
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
  production: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    dialect: 'mysql',
    dialectOptions: {
      // 여기에서 타임존 설정
      useUTC: false, //for reading from database
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+09:00',
  },
};
