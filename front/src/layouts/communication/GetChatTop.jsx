import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Avatar,
  Button,
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

const GetChatTop = ({ groupType, groupNo, groupLeader }) => {
  const { data: memberData, mutate: mutateMember } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/user/list/grouptype/${groupType}/no/${groupNo}/state/2`,
    fetcher
  );
  const { setField } = useCommunityStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [chatMenuOpen, setChatMenuOpen] = useState(false);

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
            <IconButton
              onClick={() => {
                navigate('/chat/list');
              }}
            >
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
            <ListItem
              onClick={onClickChatMember}
              data-value={groupLeader.user_no}
            >
              <Stack direction={'row'} spacing={2} alignItems={'center'}>
                <Avatar
                  alt={groupLeader.nick_name}
                  src={`${
                    import.meta.env.VITE_SPRING_HOST
                  }/upload_images/user/${groupLeader.profile_img}`}
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
                      import.meta.env.VITE_SPRING_HOST
                    }/upload_images/user/${member.profileImg}`}
                  />
                  <Typography>{member.nickName}</Typography>
                </Stack>
              </ListItem>
            ))}
            <Divider />
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

GetChatTop.propTypes = {
  groupType: PropTypes.number,
  groupNo: PropTypes.number,
  groupLeader: PropTypes.object,
};

export default GetChatTop;
