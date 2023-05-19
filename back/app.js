require('dotenv').config();

const express = require('express');

const app = express();
const server = require('http').createServer(app);
const cors = require('cors');

const restRouter = require('./routes/rest');
const webSocket = require('./socket');

const { PORT, REACT_HOST, REACT_PORT } = process.env;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: `http://${REACT_HOST}:${REACT_PORT}`,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  })
);

app.use('/rest', restRouter);
app.get('*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

webSocket(server, app);
