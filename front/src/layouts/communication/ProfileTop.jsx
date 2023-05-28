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
import PropTypes from 'prop-types';

const ProfileTop = ({ userNo }) => {
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const { data: reportData, mutate: mutateReport } = useSWR(
    `http://${
      import.meta.env.VITE_SPRING_HOST
    }/rest/community/report/reportingno/${myData?.userNo}/reportedno/${userNo}`,
    fetcher
  );

  const onClickReport = useCallback(() => {
    if (reportData) {
      alert('이미 신고한 회원입니다!');
    } else {
      navigate(`/community/report/add/category/reportedno/${userNo}`);
    }
  }, [navigate, reportData, userNo]);
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

                <IconButton
                  onClick={onClickReport}
                  sx={{ marginRight: '-10px' }}
                >
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
ProfileTop.propTypes = {
  userNo: PropTypes.number,
};
export default ProfileTop;
