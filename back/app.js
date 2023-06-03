require('dotenv').config();
const { sequelize } = require('./models');
const path = require('path');
const express = require('express');

const app = express();
app.set('PORT', process.env.PORT || 8909);
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

const { PORT, REACT_HOST, REACT_PORT, SPRING_HOST, SPRING_PORT } = process.env;

app.use(
  cors({
    origin: [
      `http://${REACT_HOST}:${REACT_PORT}`,
      `http://${SPRING_HOST}:${SPRING_PORT}`,
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
