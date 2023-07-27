import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
const ListChatRoomTop = () => {
  const navigate = useNavigate();
  return (
    <AppBar
      position="fixed"
      color="secondary"
      elevation={0}
      sx={{ height: '50px' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="hs10" component="h4" sx={{ color: 'dimgray' }}>
            채팅
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default ListChatRoomTop;
