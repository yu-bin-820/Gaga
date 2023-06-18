import { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/system';
import { Menu } from '@mui/icons-material';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';
import useCommunityStore from '@stores/communication/useCommunityStore';

const GetDirectTop = ({ receiverNo }) => {
  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: userData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/userno/${receiverNo}`,
    fetcher
  );

  const {
    setField,
    prevGetDirectChatPath,
    prevProfilePath,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
  } = useCommunityStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatMenuOpen, setChatMenuOpen] = useState(false);

  const onClickChatMenu = useCallback(() => {
    // navigate('/settings');
    setChatMenuOpen(true);
  }, []);
  const onClickChatMember = useCallback(
    (e) => {
      setField('prevProfilePath', [...prevProfilePath, location.pathname]);
      navigate(`/community/profile/userno/${e.currentTarget.dataset.value}`);
    },
    [navigate, setField, location, prevProfilePath]
  );

  const toggleChatMenuOpen = useCallback(
    (state) => () => {
      setChatMenuOpen(state);
    },
    []
  );
  const onClickPrevDirect = useCallback(() => {
    const prevPath = prevGetDirectChatPath[prevGetDirectChatPath.length - 1];
    const isArray = Array.isArray(prevChatRoomEntryNo);
    const isPrevPathArray = Array.isArray(prevGetDirectChatPath);
    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    setField('prevChatRoomEntryNo', prevChatRoomEntryNo.pop());
    setField('prevChatType', prevChatType.pop());
    setField('prevChatRoomLeader', prevChatRoomLeader.pop());
    setField(
      'chatRoomEntryNo',
      prevChatRoomEntryNo[prevChatRoomEntryNo.length - 1]
    );
    setField('chatType', prevChatType[prevChatType.length - 1]);
    setField(
      'chatRoomLeader',
      prevChatRoomLeader[prevChatRoomLeader.length - 1]
    );
    setField('prevGetDirectChatPath', prevGetDirectChatPath.pop());

    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    navigate(prevPath || -1);
  }, [
    prevGetDirectChatPath,
    setField,
    prevChatType,
    prevChatRoomLeader,
    prevChatRoomEntryNo,
    navigate,
  ]);
  return (
    <Box>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <IconButton onClick={onClickPrevDirect}>
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton sx={{ marginRight: '-10px' }} onClick={onClickChatMenu}>
              <Menu />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer
        anchor="right"
        open={chatMenuOpen}
        onClose={toggleChatMenuOpen(false)}
        onOpen={toggleChatMenuOpen(true)}
      >
        <Box sx={{ minWidth: '300px' }}>
          <List>
            <ListItem>
              <IconButton
                onClick={() => {
                  setChatMenuOpen(false);
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography>채팅 메뉴</Typography>
            </ListItem>
            <Divider />
            <ListItem onClick={onClickChatMember} data-value={myData?.userNo}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar
                  alt={myData?.nickName}
                  src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                    myData?.profileImg
                  }?type=f_sh&w=76&h=76&autorotate=false&faceopt=true&sharp_amt=1.0`}
                />
                <Typography>{myData?.nickName} (나)</Typography>
              </Stack>
            </ListItem>

            <ListItem onClick={onClickChatMember} data-value={userData?.userNo}>
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar
                  alt={userData?.nickName}
                  src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                    userData?.profileImg
                  }?type=f_sh&w=76&h=76&autorotate=false&faceopt=true&sharp_amt=1.0`}
                />
                <Typography>{userData?.nickName}</Typography>
              </Stack>
            </ListItem>

            <Divider />
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

GetDirectTop.propTypes = {
  receiverNo: PropTypes.string,
};

export default GetDirectTop;
