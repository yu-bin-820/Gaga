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
const CommonTop = ({ pageName, prevPath }) => {
  const navigate = useNavigate();
  const { setField, prevChatRoomEntryNo, prevChatType, prevChatRoomLeader } =
    useCommunityStore();
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
  prevPath: PropTypes.string,
};
export default CommonTop;
