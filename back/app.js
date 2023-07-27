require('dotenv').config();
const { sequelize } = require('./models');
const path = require('path');
const express = require('express');
const app = express();

const { PORT, REACT_HOST, REACT_PORT, SPRING_HOST, SPRING_PORT } = process.env;

app.set('PORT', PORT || 8909);

sequelize
  .sync()
  .then(() => {
    console.log('DB연결 성공');
  })
  .catch(console.error);

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const cors = require('cors');

const restRouter = require('./routes/rest');
const webSocket = require('./socket');
const { log } = require('console');

app.use(
  cors({
    origin: [
      `http://${REACT_HOST}:${REACT_PORT}`,
      `http://${SPRING_HOST}:${SPRING_PORT}`,
      `http://localhost:${REACT_PORT}`,
      `http://localhost:${SPRING_PORT}`,
      `http://127.0.0.1:${REACT_PORT}`,
      `http://127.0.0.1:${SPRING_PORT}`,
      'http://223.130.145.151:80',
      'http://223.130.144.173:80',
      'http://www.gaga.works',
      'https://www.gaga.works',
      'https://www.gaga.works:443',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/rest', restRouter);

app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const server = require('http').createServer(app);
server.listen(app.get('PORT'), () =>
  console.log(`Server listening on port ${app.get('PORT')}`)
);

webSocket(server, app);
