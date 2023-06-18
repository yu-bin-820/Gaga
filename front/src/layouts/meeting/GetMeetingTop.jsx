import {
  AppBar,
  Button,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Toolbar,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/system';
import DeleteMeetingDialog from '@components/meeting/DeleteMeetingDialog';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import UpdateMeetingDrawer from '@components/meeting/UpdateMeetingDrawer';
import useMeetingPathStore from '@stores/meeting/useMeetingPathStore';

const GetMeetingTop = ({ prevPath }) => {
  const { meetingno } = useParams();

  const { reset } = useUpdateMeetingFormStore();

  const navigate = useNavigate();

  const [settingsUpdateMeetingOpen, setSettingsUpdateMeetingOpen] =
    useState(false);
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

  const onClickUpdate = useCallback(() => {
    reset();
    setSettingsUpdateMeetingOpen(true);
    setLeaderMenuOpen(false);
  }, [reset]);

  const [deleteMeetingDialogOpen, setDeleteMeetingDialogOpen] = useState(false);

  const toggleSettingsUpdateMeeting = useCallback(
    (state) => () => {
      setSettingsUpdateMeetingOpen(state);
    },
    []
  );

  const onClickDeleteSelect = useCallback(() => {
    setDeleteMeetingDialogOpen(true);
  }, []);
  const { setField: setMeetingField } = useMeetingPathStore();
  const onClickPrev = useCallback(() => {
    const isPrevPathArray = Array.isArray(prevPath);
    // setField('chatRoomEntryNo', prevChatRoomEntryNo);
    // setField('chatType', prevChatType);
    // setField('chatRoomLeader', prevChatRoomLeader);
    const tempPrev = isPrevPathArray ? prevPath[prevPath.length - 1] : prevPath;
    console.log('GetMeetingTopPrevPath', prevPath);

    if (isPrevPathArray) {
      setMeetingField('prevMeetingPath', prevPath.pop());
    }
    console.log('pop()GetMeetingTopPrevPath', prevPath);

    console.log('GetMeetingTopTempPrev', tempPrev);
    navigate(tempPrev || -1);
  }, [
    prevPath,
    // prevChatRoomEntryNo,
    // prevChatType,
    // prevChatRoomLeader,
    setMeetingField,
    navigate,
  ]);
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

      <DeleteMeetingDialog
        open={deleteMeetingDialogOpen}
        setOpen={setDeleteMeetingDialogOpen}
      />
      <UpdateMeetingDrawer
        settingsUpdateMeetingOpen={settingsUpdateMeetingOpen}
        setSettingsUpdateMeetingOpen={setSettingsUpdateMeetingOpen}
        toggleSettingsUpdateMeeting={toggleSettingsUpdateMeeting}
        meetingno={meetingno}
      />
    </>
  );
};
GetMeetingTop.propTypes = {
  prevPath: PropTypes.string,
};
export default GetMeetingTop;
