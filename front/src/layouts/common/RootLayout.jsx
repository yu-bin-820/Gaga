import useSocket from '@hooks/common/useSocket';
import fetcher from '@utils/fetcher';
import React, { useEffect } from 'react';
import { Outlet } from 'react-router';
import useSWR from 'swr';
const RootLayout = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  //-------------------------채팅 ------------------------------------------

  const { data: groupsData, mutate: mutateGroups } = useSWR(
    `http://${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/group/list/userno/${
      myData?.userNo
    }`,
    fetcher
  );

  const [clubSocket, clubDisconnect] = useSocket('club');
  const [meetingSocket, meetingDisconnect] = useSocket('meeting');
  const [directSocket, directDisconnect] = useSocket('direct');
  useEffect(() => {
    if (
      myData?.userId !== undefined &&
      myData?.userId !== null &&
      clubSocket &&
      meetingSocket &&
      directSocket &&
      groupsData
    ) {
      clubSocket.emit('login', {
        userNo: myData.userNo,
        groupsData,
      });
      meetingSocket.emit('login', {
        userNo: myData.userNo,
        groupsData,
      });
      directSocket.emit('login', {
        userNo: myData.userNo,
        groupsData,
      });
    }
  }, [myData, clubSocket, meetingSocket, directSocket, groupsData]);

  useEffect(() => {
    return () => {
      clubDisconnect();
      meetingDisconnect();
      directDisconnect();
    };
  }, [clubDisconnect, meetingDisconnect, directDisconnect]);

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
