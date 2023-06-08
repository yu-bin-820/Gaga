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
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);

  const isAdmin = myData?.role == 1;

  const onClickLogOut = useCallback(async () => {
    await axios
      .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/user/logout`, {
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

  const onClickReportList = useCallback(() => {
    navigate('/community/report/list');
  }, [navigate]);

  const onClickUpdateUser = useCallback(() => {
    navigate('/user/updateuser');
  }, [navigate]);

  const onClickDeleteUser = useCallback(() => {
    navigate('/user/deleteuser');
  }, [navigate]);

  const onClickNoticePostList = useCallback(() => {
    navigate('/notice/listNoticePost');
  }, [navigate]);

  const onClickListBlackList = useCallback(() => {
    navigate('/blackList/listBlackList');
  }, [navigate]);

  const onClickUpdateAccount = useCallback(() => {
    navigate(`/payment/adjustment/account/${myData?.userNo}`);
  }, [myData, navigate]);

  const onClickListPayment = useCallback(() => {
    navigate(`/payment/listpayment/${myData?.userNo}`);
  }, [myData, navigate]);

  const onClickListAdjustment = useCallback(() => {
    navigate(`/payment/listadjustment/${myData?.userNo}`);
  }, [myData, navigate]);

  if (!myData) {
    return <Navigate replace to='/' />;
  }
  return (
    <Box>
      <AppBar
        position='fixed'
        color='secondary'
        elevation={0}
        sx={{ height: '58px', borderBottom: '1px solid #ccc' }}
      >
        <Container maxWidth='xl'>
          <Toolbar
            disableGutters
            sx={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <IconButton sx={{ marginLeft: 'auto' }} onClick={onClickSettings}>
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>
      {/* --------------------------------Drawer----------------------------------------------------- */}
      <SwipeableDrawer
        anchor='right'
        open={settingsMenuOpen}
        onClose={toggleSettingsMenu(false)}
        onOpen={toggleSettingsMenu(true)}
      >
        <Box sx={{ minWidth: '100vw' }}>
          <List>
            <ListItem>
              <IconButton
                onClick={() => {
                  setSettingsMenuOpen(false);
                }}
              >
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
                  설정
                </Typography>
              </Box>
            </ListItem>

            <Divider />
            <ListItem
              sx={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={onClickUpdateUser}
            >
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                primary='개인 정보 수정'
              />
            </ListItem>
            <Divider />

            <ListItem
              sx={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={onClickReportList}
            >
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                primary='신고 내역 조회'
              />
            </ListItem>
            <Divider />
            <ListItem
              sx={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={onClickDeleteUser}
            >
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                primary='회원 탈퇴'
              />
            </ListItem>
            <Divider />

            <ListItem sx={{ marginTop: '10px', marginBottom: '10px' }}>
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                onClick={onClickUpdateAccount}
                primary='계좌 관리'
              />
            </ListItem>
            <Divider />

            <ListItem sx={{ marginTop: '10px', marginBottom: '10px' }}>
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                onClick={onClickListPayment}
                primary='결제 정보 조회'
              />
            </ListItem>
            <Divider />

            <ListItem sx={{ marginTop: '10px', marginBottom: '10px' }}>
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                onClick={onClickListAdjustment}
                primary='정산 내역 조회'
              />
            </ListItem>
            <Divider />

            <ListItem
              sx={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={onClickNoticePostList}
            >
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                primary='공지사항'
              />
            </ListItem>
            <Divider />
            {isAdmin && (
              <>
                <ListItem
                  sx={{ marginTop: '10px', marginBottom: '10px' }}
                  onClick={onClickListBlackList}
                >
                  <ListItemText
                    sx={{ display: 'flex', justifyContent: 'center' }}
                    primary='블랙리스트'
                  />
                </ListItem>

                <Divider />
              </>
            )}

            <ListItem
              sx={{ marginTop: '10px', marginBottom: '10px' }}
              onClick={onClickLogOut}
            >
              <ListItemText
                sx={{ display: 'flex', justifyContent: 'center' }}
                primary='로그아웃'
              />
            </ListItem>
            <Divider />
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default MyProfileTop;
