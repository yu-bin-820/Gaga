import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/system';
import { Menu } from '@mui/icons-material';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';
import useCommunityStore from '@stores/communication/useCommunityStore';
import axios from 'axios';

const GetChatTop = ({ groupType, groupNo, groupLeader }) => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const isMeeting = groupType == 2;
  const isLeader = myData?.userNo == groupLeader.user_no;

  const { data: memberData, mutate: mutateMember } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/user/list/grouptype/${groupType}/no/${groupNo}/state/2`,
    fetcher
  );

  const { data: groupData, mutate: mutateGroup } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/${
      isMeeting ? 'meeting' : 'club'
    }/no/${groupNo}`,
    fetcher
  );

  const isSuccessed = groupData?.meetingSuccess == 2;

  // console.log(groupData);

  const { setField } = useCommunityStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatMenuOpen, setChatMenuOpen] = useState(false);
  const [deleteChatDialogOpen, setDeleteChatDialogOpen] = useState(false);
  const [exitChatDialogOpen, setExitChatDialogOpen] = useState(false);
  const onClickChatMenu = useCallback(() => {
    // navigate('/settings');
    setChatMenuOpen(true);
  }, []);
  const onClickChatMember = useCallback(
    (e) => {
      setField('prevProfilePath', location.pathname);
      navigate(`/community/profile/userno/${e.currentTarget.dataset.value}`);
    },
    [navigate, setField, location]
  );

  const toggleChatMenuOpen = useCallback(
    (state) => () => {
      setChatMenuOpen(state);
    },
    []
  );
  console.log(memberData);

  const onCloseDeleteChatDialog = useCallback(() => {
    setDeleteChatDialogOpen(false);
  }, []);

  const onCloseExitChatDialog = useCallback(() => {
    setExitChatDialogOpen(false);
  }, []);

  const onClickDeleteChatOpen = useCallback(() => {
    setDeleteChatDialogOpen(true);
  }, []);

  const onClickExitChatOpen = useCallback(() => {
    setExitChatDialogOpen(true);
  }, []);

  const onClickDeleteChat = useCallback(() => {
    const data = { meetingNo: groupNo };
    console.log('!!');
    axios
      .patch(
        `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/meeting/state`,
        data
      )
      .then(() => {
        navigate('/');
      });
  }, [groupNo, navigate]);

  const onClickExitChat = useCallback(() => {
    const data = { meetingNo: groupNo, userNo: myData?.userNo };
    console.log('!!');
    axios
      .patch(
        `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/meeting/member/state`,
        data
      )
      .then(() => {
        navigate('/');
      });
  }, [groupNo, navigate, myData]);

  return (
    <>
      <Box sx={{ overflow: 'hidden' }}>
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
              <IconButton
                onClick={() => {
                  navigate('/chat/list');
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>

              <IconButton
                sx={{ marginRight: '-10px' }}
                onClick={onClickChatMenu}
              >
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
          <Box
            sx={{
              minWidth: '300px',
              minHeight: '99vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <List sx={{ flexGrow: 1 }}>
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
              <ListItem
                onClick={onClickChatMember}
                data-value={groupLeader.user_no}
              >
                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                  <Avatar
                    alt={groupLeader.nick_name}
                    src={`${import.meta.env.VITE_CDN_HOST}/upload_images/user/${
                      groupLeader.profile_img
                    }`}
                  />
                  <Typography>{groupLeader.nick_name}</Typography>
                </Stack>
              </ListItem>
              {memberData?.map((member, i) => (
                <ListItem
                  key={i}
                  onClick={onClickChatMember}
                  data-value={member.userNo}
                >
                  <Stack direction={'row'} spacing={2} alignItems={'center'}>
                    <Avatar
                      alt={member.nickName}
                      src={`${
                        import.meta.env.VITE_CDN_HOST
                      }/upload_images/user/${member.profileImg}`}
                    />
                    <Typography>{member.nickName}</Typography>
                  </Stack>
                </ListItem>
              ))}
            </List>
            {isMeeting && (
              <>
                <Divider />
                <Stack
                  marginTop={'15px'}
                  marginLeft={'10px'}
                  marginBottom={'-5px'}
                >
                  {isLeader && (
                    <Stack direction={'row'} spacing={1}>
                      <DeleteOutlineIcon />
                      <Box onClick={onClickDeleteChatOpen}>
                        <Typography sx={{ marginBottom: '16px' }}>
                          채팅방 삭제하기
                        </Typography>
                      </Box>
                    </Stack>
                  )}

                  {!isLeader && (
                    <Stack direction={'row'} spacing={1}>
                      <LogoutIcon />
                      <Box onClick={onClickExitChatOpen}>
                        <Typography>채팅방 나가기</Typography>
                      </Box>
                    </Stack>
                  )}
                </Stack>
              </>
            )}
          </Box>
        </SwipeableDrawer>
      </Box>
      {/* --------------------------------------------Dialog--------------------------------------------- */}
      <Dialog open={deleteChatDialogOpen} onClose={onCloseDeleteChatDialog}>
        <DialogTitle>{'채팅방 삭제하기'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isSuccessed
              ? '채팅방 삭제시 복구가 불가능 합니다.'
              : '성사 전에는 채팅방을 삭제할 수 없습니다.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteChatDialog}>닫기</Button>
          {isSuccessed && (
            <Button onClick={onClickDeleteChat} autoFocus>
              삭제
            </Button>
          )}
        </DialogActions>
      </Dialog>

      <Dialog open={exitChatDialogOpen} onClose={onCloseExitChatDialog}>
        <DialogTitle>{'채팅방 나가기'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {isSuccessed
              ? '채팅방 퇴장시 재입장이 불가능 합니다.'
              : '성사 전에는 채팅방을 나갈 수 없습니다.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseExitChatDialog}>닫기</Button>
          {isSuccessed && (
            <Button onClick={onClickExitChat} autoFocus>
              나가기
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

GetChatTop.propTypes = {
  groupType: PropTypes.number,
  groupNo: PropTypes.number,
  groupLeader: PropTypes.object,
};

export default GetChatTop;
