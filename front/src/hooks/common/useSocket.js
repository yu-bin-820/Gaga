import io, { Socket } from 'socket.io-client';

import { useCallback } from 'react';

const backUrl = `${import.meta.env.VITE_EXPRESS_HOST}`;

const sockets = {};
const useSocket = (chattype) => {
  console.log('rerender', chattype);

  const disconnect = useCallback(() => {
    if (chattype) {
      if (sockets[chattype]) {
        sockets[chattype].disconnect();
        delete sockets[chattype];
      }
    }
  }, [chattype]);

  if (!chattype) {
    return [undefined, disconnect];
  }

  if (!sockets[chattype]) {
    console.log(`${backUrl}/ct-${chattype}`);

    sockets[chattype] = io(`${backUrl}/ct-${chattype}`, {
      transports: ['websocket'],
      // credentials: true,
    });
  }

  return [sockets[chattype], disconnect];
};

export default useSocket;
