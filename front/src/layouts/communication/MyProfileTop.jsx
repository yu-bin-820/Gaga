import React, { useCallback } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
const MyProfileTop = () => {
  const navigate = useNavigate();
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const onClickLogOut = useCallback(async () => {
    await axios
      .delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/user/logout`, {
        withCredentials: true,
      })
      .then(() => {
        mutateMe();
      });
  }, [mutateMe]);
  if (!myData) {
    return <Navigate replace to="/" />;
  }
  return (
    <AppBar
      position="fixed"
      color="secondary"
      elevation={0}
      sx={{ height: '50px' }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Button onClick={onClickLogOut}>Logout</Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MyProfileTop;
