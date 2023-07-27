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
import useClubStore from '@stores/club/useClubStore';
import PropTypes from 'prop-types';

const GetClubTop = ({ prevPath }) => {
  const { clubNo } = useParams();

  // const { setField, prevChatRoomEntryNo, prevChatType, prevChatRoomLeader } =
  //   useCommunityStore();

  const { setField: setClubField } = useClubStore();

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
    const isPrevPathArray = Array.isArray(prevPath);
    // setField('chatRoomEntryNo', prevChatRoomEntryNo);
    // setField('chatType', prevChatType);
    // setField('chatRoomLeader', prevChatRoomLeader);
    const tempPrev = isPrevPathArray ? prevPath[prevPath.length - 1] : prevPath;
    console.log('GetClubTopPrevPath', prevPath);

    if (isPrevPathArray) {
      setClubField('prevClubPath', prevPath.pop());
    }
    console.log('pop()GetClubTopPrevPath', prevPath);

    console.log('GetClubTopTempPrev', tempPrev);
    navigate(tempPrev || -1);
  }, [
    prevPath,
    setClubField,
    // prevChatRoomEntryNo,
    // prevChatType,
    // prevChatRoomLeader,
    // setField,
    navigate,
  ]);

  const onClickDeleteSelect = useCallback(() => {
    setDeleteClubDialogOpen(true);
  }, []);

  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <IconButton onClick={onClickPrev}>
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton>
              <MoreHorizIcon onClick={onClickLeaderMenu} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <SwipeableDrawer
        anchor="bottom"
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
GetClubTop.propTypes = {
  prevPath: PropTypes.array,
};
export default GetClubTop;
