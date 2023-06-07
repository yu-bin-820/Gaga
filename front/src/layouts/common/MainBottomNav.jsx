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
import {
  Badge,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import useCommonStore from '@stores/common/useCommonStore';
export default function MainBottomNav({ pageName }) {
  const navigate = useNavigate();

  const [value, setValue] = React.useState(pageName);
  const [noProfileImgDialogOpen, setNoProfileImgDialogOpen] =
    React.useState(false);

  const handleChange = (event, newValue) => {
    if (isAuthenticated) {
      setValue(newValue);
    }
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const { data: unreadsData, mutate: mutateUnreads } = useSWR(
    `${
      import.meta.env.VITE_EXPRESS_HOST
    }/rest/chat/group/message/unreads/userno/${myData?.userNo}`,
    fetcher
  );

  const isAuthenticated = myData?.userNo && myData?.profileImg;
  //-------------------------채팅 (상황봐서 지울예정)------------------------------------------

  // const { data: groupsData, mutate: mutateGroups } = useSWR(
  //   `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/group/list/userno/${
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

  const [totalUnreads, setTotalUnreads] = React.useState(0);
  const { groupType } = useCommonStore();

  useEffect(() => {
    setTotalUnreads(
      unreadsData?.countDirectUnreads + unreadsData?.countGroupUnreads
    );
  }, [unreadsData]);

  const onCloseNoProfileImgDialog = React.useCallback(() => {
    setNoProfileImgDialogOpen(false);
  }, []);

  const onClickHome = React.useCallback(() => {
    navigate(`/`);
  }, [navigate]);

  const onClickAddGroup = React.useCallback(() => {
    if (isAuthenticated) {
      if (groupType == 'meeting') {
        navigate(`/meeting/addmeeting`);
      } else {
        navigate('/club/addclub');
      }
    } else {
      setNoProfileImgDialogOpen(true);
    }
  }, [navigate, groupType, isAuthenticated]);

  const onClickProfile = React.useCallback(() => {
    navigate(`/community/profile/mine`);
  }, [navigate]);

  const onClickChat = React.useCallback(() => {
    if (isAuthenticated) {
      navigate(`/chat/list`);
    } else {
      setNoProfileImgDialogOpen(true);
    }
  }, [navigate, isAuthenticated]);

  console.log(myData);

  return (
    <>
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
          onClick={onClickAddGroup}
        />
        <BottomNavigationAction
          label="Chat"
          value="chat"
          icon={
            <Badge badgeContent={totalUnreads} color="error">
              <QuestionAnswerIcon />
            </Badge>
          }
          onClick={onClickChat}
        />
        <BottomNavigationAction
          label="Profile"
          value="profile"
          icon={<PersonIcon />}
          onClick={onClickProfile}
        />
      </BottomNavigation>
      <Dialog open={noProfileImgDialogOpen} onClose={onCloseNoProfileImgDialog}>
        <DialogTitle>{'프로필 사진을 등록해 주세요'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            프로필 사진 등록 시 가가의 모든 서비스를 이용하실 수 있습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseNoProfileImgDialog}>확인</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

MainBottomNav.propTypes = {
  pageName: PropTypes.string,
};
