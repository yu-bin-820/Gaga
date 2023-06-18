import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import useCommunityStore from '@stores/communication/useCommunityStore';
import useMeetingPathStore from '@stores/meeting/useMeetingPathStore';
const CommonTop = ({ pageName, prevPath, pageType }) => {
  const navigate = useNavigate();
  const {
    setField: setCommunityField,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
  } = useCommunityStore();
  const { setField: setMeetingField } = useMeetingPathStore();
  const onClickPrev = useCallback(() => {
    const isPrevPathArray = Array.isArray(prevPath);
    // setField('chatRoomEntryNo', prevChatRoomEntryNo);
    // setField('chatType', prevChatType);
    // setField('chatRoomLeader', prevChatRoomLeader);
    const tempPrev = isPrevPathArray ? prevPath[prevPath.length - 1] : prevPath;
    console.log('GetMeetingCommonTopPrevPath', prevPath);

    if (isPrevPathArray) {
      if (pageType === 'meeting') {
        setMeetingField('prevMeetingPath', prevPath.pop());
      }
    }
    console.log('pop()GetMeetingCommonTopPrevPath', prevPath);

    console.log('GetMeetingCommonTopTempPrev', tempPrev);
    navigate(tempPrev || -1);
  }, [
    prevPath,
    // prevChatRoomEntryNo,
    // prevChatType,
    // prevChatRoomLeader,
    pageType,
    setMeetingField,
    navigate,
  ]);
  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        sx={{ height: '58px', borderBottom: '1px solid #ccc' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton onClick={onClickPrev}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box
              sx={{
                minWidth: 'calc(100vw - 108px)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {pageName}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
CommonTop.propTypes = {
  pageName: PropTypes.string,
  prevPath: PropTypes.array,
  pageType: PropTypes.string,
};
export default CommonTop;
