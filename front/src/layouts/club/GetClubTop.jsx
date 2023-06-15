import {
  AppBar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/system';
import DeleteClubDialog from '@components/club/DeleteClubDialog';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';
import useCommunityStore from '@stores/communication/useCommunityStore';
import UpdateClubDrawer from '@components/club/UpdateClubDrawer';

const GetClubTop = () => {
  const { clubNo } = useParams();

  const {
    setField,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
    prevPath,
  } = useCommunityStore();

  const { reset } = useUpdateClubFormStore();

  const navigate = useNavigate();

  const [settingsUpdateClubOpen, setSettingsUpdateClubOpen] = useState(false);
  const [leaderMenuOpen, setLeaderMenuOpen] = useState(false);

  const onClickLeaderMenu = useCallback(() => {
    // navigate('/settings');
    setLeaderMenuOpen(true);
  }, []);

  const toggleLeaderMenuOpen = useCallback(
    (state) => () => {
      setLeaderMenuOpen(state);
    },
    []
  );

  const [deleteClubDialogOpen, setDeleteClubDialogOpen] = useState(false);

  const toggleSettingsUpdateClub = useCallback(
    (state) => () => {
      setSettingsUpdateClubOpen(state);
    },
    []
  );

  const onClickUpdate = useCallback(() => {
    reset();
    setSettingsUpdateClubOpen(true);
    setLeaderMenuOpen(false);
  }, [reset]);

  const onClickPrev = useCallback(() => {
    setField('chatRoomEntryNo', prevChatRoomEntryNo);
    setField('chatType', prevChatType);
    setField('chatRoomLeader', prevChatRoomLeader);

    navigate(prevPath || -1);
  }, [
    prevPath,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
    setField,
    navigate,
  ]);

  const onClickDeleteSelect = useCallback(() => {
    setDeleteClubDialogOpen(true);
  }, []);

  return (
    <>
      <AppBar
        position='fixed'
        color='secondary'
        elevation={0}
        sx={{ height: '50px' }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <IconButton
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton>
              <MoreHorizIcon onClick={onClickLeaderMenu} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <SwipeableDrawer
        anchor='bottom'
        open={leaderMenuOpen}
        onClose={toggleLeaderMenuOpen(false)}
        onOpen={toggleLeaderMenuOpen(true)}
      >
        <Box sx={{ minWidth: '300px' }}>
          <List>
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={onClickUpdate} sx={{ minWidth: '100vw' }}>
                수정하기
              </Button>
            </ListItem>
            <Divider sx={{ minWidth: '100vw' }} />
            <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button onClick={onClickDeleteSelect} sx={{ minWidth: '100vw' }}>
                삭제하기
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>

      <DeleteClubDialog
        open={deleteClubDialogOpen}
        setOpen={setDeleteClubDialogOpen}
      />
      <UpdateClubDrawer
        settingsUpdateClubOpen={settingsUpdateClubOpen}
        setSettingsUpdateClubOpen={setSettingsUpdateClubOpen}
        toggleSettingsUpdateClub={toggleSettingsUpdateClub}
        clubNo={clubNo}
      />
    </>
  );
};
export default GetClubTop;
