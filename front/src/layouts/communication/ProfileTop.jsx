import React, { useCallback, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsMenuTop from './SettingsMenuTop';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SendIcon from '@mui/icons-material/Send';
const ProfileTop = () => {
  const navigate = useNavigate();
  const { userNo } = useParams();
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  if (!myData) {
    return <Navigate replace to="/" />;
  }
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
                navigate(-1);
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            {myData?.userNo != userNo && (
              <>
                <IconButton sx={{ marginLeft: 'auto' }}>
                  <SendIcon />
                </IconButton>

                <IconButton sx={{ marginRight: '-10px' }}>
                  <PrivacyTipIcon />
                </IconButton>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default ProfileTop;
