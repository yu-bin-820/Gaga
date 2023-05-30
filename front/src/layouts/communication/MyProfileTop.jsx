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
import UpdateUser from '@pages/user/UpdateUser';

const MyProfileTop = () => {
  const navigate = useNavigate();
  const { userNo } = useParams();
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const onClickLogOut = useCallback(async () => {
    await axios
      .delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/user/logout`, {
        withCredentials: true,
      })
      .then(() => {
        mutateMe();
      });
  }, [mutateMe]);

  const onClickSettings = useCallback(() => {
    // navigate('/settings');
    setSettingsMenuOpen(true);
  }, []);
  const toggleSettingsMenu = useCallback(
    (state) => () => {
      setSettingsMenuOpen(state);
    },
    []
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
            <Button sx={{ marginLeft: 'auto' }} onClick={onClickLogOut}>
              Logout
            </Button>
            <IconButton sx={{ marginRight: '-10px' }} onClick={onClickSettings}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      <SwipeableDrawer
        anchor="right"
        open={settingsMenuOpen}
        onClose={toggleSettingsMenu(false)}
        onOpen={toggleSettingsMenu(true)}
      >
        <Box sx={{ minWidth: '300px' }}>
          <List>
            <ListItem>
              <IconButton
                onClick={() => {
                  setSettingsMenuOpen(false);
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography>설정</Typography>
            </ListItem>
            <Divider />
            <Button component={Link} to="/user/updateuser">
                개인 정보 수정
              </Button><br/>
            <Divider />
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default MyProfileTop;
