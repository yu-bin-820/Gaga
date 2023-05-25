import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import useSocket from '@hooks/common/useSocket';
import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
export default function MainBottomNav({ pageName }) {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(pageName);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  //-------------------------채팅 ------------------------------------------

  // const { data: groupsData, mutate: mutateGroups } = useSWR(
  //   `http://${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/group/list/userno/${
  //     myData?.userNo
  //   }`,
  //   fetcher
  // );

  // const [clubSocket, clubDisconnect] = useSocket('club');
  // const [meetingSocket, meetingDisconnect] = useSocket('meeting');
  // const [directSocket, directDisconnect] = useSocket('direct');
  // useEffect(() => {
  //   if (
  //     myData?.userId !== undefined &&
  //     myData?.userId !== null &&
  //     clubSocket &&
  //     meetingSocket &&
  //     directSocket &&
  //     groupsData
  //   ) {
  //     clubSocket.emit('login', {
  //       userNo: myData.userNo,
  //       groupsData,
  //     });
  //     meetingSocket.emit('login', {
  //       userNo: myData.userNo,
  //       groupsData,
  //     });
  //     directSocket.emit('login', {
  //       userNo: myData.userNo,
  //       groupsData,
  //     });
  //   }
  // }, [myData, clubSocket, meetingSocket, directSocket, groupsData]);

  // useEffect(() => {
  //   return () => {
  //     clubDisconnect();
  //     meetingDisconnect();
  //     directDisconnect();
  //   };
  // }, [clubDisconnect, meetingDisconnect, directDisconnect]);

  //-------------------------onClickNavigating ------------------------------------------
  const onClickHome = React.useCallback((MouseEvent) => {
    navigate(`/`);
  }, []);

  const onClickAddGrop = React.useCallback((MouseEvent) => {
    navigate(`/meeting/addmeeting`);
  }, []);

  const onClickProfile = React.useCallback(() => {
    navigate(`/community/profile/${myData.userNo}`);
  }, [myData, navigate]);

  const onClickChat = React.useCallback(() => {
    navigate(`/chat/list`);
  }, [navigate]);

  console.log(myData);

  return (
    <BottomNavigation
      sx={{ width: '100%', position: 'fixed', bottom: '0rem' }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeIcon />}
        onClick={onClickHome}
      />

      <BottomNavigationAction
        label="Create"
        value="create"
        icon={<AddCircleOutlineIcon />}
        onClick={onClickAddGrop}
      />
      <BottomNavigationAction
        label="Chat"
        value="chat"
        icon={<QuestionAnswerIcon />}
        onClick={onClickChat}
      />
      <BottomNavigationAction
        label="Profile"
        value="profile"
        icon={<PersonIcon />}
        onClick={onClickProfile}
      />
    </BottomNavigation>
  );
}

MainBottomNav.propTypes = {
  pageName: PropTypes.array,
};
