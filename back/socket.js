require('dotenv').config();
const SocketIO = require('socket.io');
const { REACT_HOST, REACT_PORT } = process.env;
const onlineMap = {};

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
      origin: `http://${REACT_HOST}:${REACT_PORT}`,
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    },
  });
  app.set('io', io);
  app.set('onlineMap', onlineMap);

  const dynamicNsp = io.of(/^\/ct-.+$/).on('connect', (socket) => {
    console.log('on connect');
    const newNamespace = socket.nsp;

    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }

    socket.emit('hello', socket.nsp.name);

    socket.on('login', ({ id, channel }) => {
      console.log('on login');
      onlineMap[socket.nsp.name][socket.id] = id;
      newNamespace.emit(
        'onlineList',
        Object.values(onlineMap[socket.nsp.name])
      );

      socket.join(`${socket.nsp.name}-${channel}`);
    });

    socket.on('disconnect', () => {
      delete onlineMap[socket.nsp.name][socket.id];
      newNamespace.emit(
        'onlineList',
        Object.values(onlineMap[socket.nsp.name])
      );
    });
  });
};
