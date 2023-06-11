require('dotenv').config();
const SocketIO = require('socket.io');
// const { createClient } = require('@redis/client');
// const { createAdapter } = require('@socket.io/redis-adapter');
const { REACT_HOST, REACT_PORT, SPRING_HOST, SPRING_PORT } = process.env;
const onlineMap = {};

// const pubClient = createClient({
//   url: 'redis://redisc-gu43o.vpc-cdb.ntruss.com:6379',
// });
// const subClient = pubClient.duplicate();

module.exports = (server, app) => {
  const io = SocketIO(server, {
    path: '/socket.io',
    cors: {
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
        'http://gaga.works:80',
        'https://www.gaga.works',
        'https://www.gaga.works:443',
      ],
      methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    },
  });

  // io.adapter(createAdapter(pubClient, subClient));

  app.set('io', io);
  app.set('onlineMap', onlineMap);

  const dynamicNsp = io.of(/^\/ct-.+$/).on('connect', (socket) => {
    console.log('on connect');
    console.log(socket.nsp.name);
    const newNamespace = socket.nsp;

    if (!onlineMap[socket.nsp.name]) {
      onlineMap[socket.nsp.name] = {};
    }

    socket.emit('hello', socket.nsp.name);

    socket.on('login', ({ userNo, groupsData }) => {
      console.log('on login');
      onlineMap[socket.nsp.name][socket.id] = userNo;
      newNamespace.emit(
        'onlineList',
        Object.values(onlineMap[socket.nsp.name])
      );
      groupsData?.groups.forEach((group) => {
        if (group.meeting_no !== undefined) {
          socket.join(`${socket.nsp.name}-${group.meeting_no}`);
        } else if (group.club_no !== undefined) {
          socket.join(`${socket.nsp.name}-${group.club_no}`);
        }
      });
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
