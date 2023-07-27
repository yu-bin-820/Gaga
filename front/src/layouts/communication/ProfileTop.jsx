import React, { useCallback, useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
} from '@mui/material';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { Box } from '@mui/system';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsMenuTop from './SettingsMenuTop';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import SendIcon from '@mui/icons-material/Send';
import PropTypes from 'prop-types';
import useCommunityStore from '@stores/communication/useCommunityStore';
import useChatMapStore from '@stores/communication/useChatMapStore';

const ProfileTop = ({ userNo }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    prevProfilePath,
    setField,
    chatRoomEntryNo,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
    prevGetDirectChatPath,
  } = useCommunityStore();
  const { setField: setChatField } = useChatMapStore();
  const [duplicateReportDialogOpen, setDuplicateReportDialogOpen] =
    useState(false);
  const [deleteReportDialogOpen, setDeleteReportDialogOpen] = useState(false);
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const { data: reportData, mutate: mutateReport } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/community/report/reportingno/${
      myData?.userNo
    }/reportedno/${userNo}`,
    fetcher
  );

  const onClickReport = useCallback(() => {
    if (reportData) {
      setDuplicateReportDialogOpen(true);
    } else {
      navigate(`/community/report/add/category/reportedno/${userNo}`);
    }
  }, [navigate, reportData, userNo]);

  const onCloseDuplicateReportDialog = useCallback(() => {
    setDuplicateReportDialogOpen(false);
  }, []);

  const onCloseDeleteReportDialog = useCallback(() => {
    setDeleteReportDialogOpen(false);
  }, []);

  const onClickDeleteReport = useCallback(() => {
    setDeleteReportDialogOpen(true);
  }, []);

  const onClickGetReport = useCallback(() => {
    setField('reportNo', reportData?.reportNo);
    setField('prevPath', location.pathname);
    navigate('/community/report');
  }, [setField, reportData, navigate, location]);

  const onClickDeleteReportConfirm = useCallback(() => {
    axios
      .delete(
        `${import.meta.env.VITE_SPRING_HOST}/rest/community/report/reportno/${
          reportData?.reportNo
        }`,
        {
          withCredentials: true,
        }
      )
      .then(() => {
        onCloseDeleteReportDialog();
        onCloseDuplicateReportDialog();
        mutateReport();
      });
  }, [
    reportData,
    mutateReport,
    onCloseDeleteReportDialog,
    onCloseDuplicateReportDialog,
  ]);

  const onClickDirectMessage = useCallback(() => {
    const isArray = Array.isArray(prevChatRoomEntryNo);
    const isPrevPathArray = Array.isArray(prevGetDirectChatPath);
    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);
    setChatField('shouldScroll', true);
    setField('chatRoomEntryNo', userNo);

    setField(
      'prevChatRoomEntryNo',
      isArray ? [...prevChatRoomEntryNo, userNo] : [userNo]
    );
    setField('prevChatType', isArray ? [...prevChatType, 3] : [3]);
    setField(
      'prevChatRoomLeader',
      isArray ? [...prevChatRoomLeader, myData?.userNo] : [myData?.userNo]
    );

    setField(
      'prevGetDirectChatPath',
      isPrevPathArray
        ? [...prevGetDirectChatPath, location.pathname]
        : [location.pathname]
    );
    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);
    navigate('/chat/direct/message/list');
  }, [
    userNo,
    setField,
    location,
    navigate,
    prevChatRoomEntryNo,
    prevGetDirectChatPath,
    prevChatRoomLeader,
    prevChatType,
    myData,
    setChatField,
  ]);

  const onClickPrev = useCallback(() => {
    const isPrevPathArray = Array.isArray(prevProfilePath);
    console.log('ProfileTopprevProfilePath', prevProfilePath);
    if (!isPrevPathArray) {
      setField('prevProfilePath', [prevProfilePath]);
    }
    const prevPath = isPrevPathArray
      ? prevProfilePath[prevProfilePath.length - 1]
      : prevProfilePath;

    if (isPrevPathArray) {
      setField('prevProfilePath', prevProfilePath.slice(0, -1));
    }
    console.log('ProfileTopPrevPath', prevPath);
    console.log('pop()ProfileTopprevProfilePath', prevProfilePath);
    navigate(prevPath);
  }, [prevProfilePath, setField, navigate]);

  useEffect(() => {
    console.log('ProfileTopprevProfilePath', prevProfilePath);
  }, [prevProfilePath]);
  // if (!myData) {
  //   return <Navigate replace to={`/community/profile/userno/${userNo}`} />;
  // }

  return (
    <>
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
              <IconButton onClick={onClickPrev}>
                <ArrowBackIosNewIcon />
              </IconButton>
              {myData?.userNo && myData?.userNo != userNo && (
                <>
                  <IconButton
                    sx={{ marginLeft: 'auto' }}
                    onClick={onClickDirectMessage}
                  >
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
      {/* -----------------------------------------------Dialogs------------------------------------------------------------- */}
      <Dialog
        open={duplicateReportDialogOpen}
        onClose={onCloseDuplicateReportDialog}
      >
        <DialogTitle>{'회원 신고'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            이미 신고한 회원입니다.
            <br />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDuplicateReportDialog} sx={{ color: 'gray' }}>
            취소
          </Button>
          <Button
            autoFocus
            onClick={onClickDeleteReport}
            sx={{ color: 'orange' }}
          >
            신고 삭제
          </Button>
          <Button autoFocus onClick={onClickGetReport}>
            신고 조회
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={deleteReportDialogOpen} onClose={onCloseDeleteReportDialog}>
        <DialogTitle>{'신고 삭제'}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            신고를 삭제합니다.
            <br />
            삭제된 신고는 되돌릴 수 없습니다.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDeleteReportDialog}>취소</Button>
          <Button autoFocus onClick={onClickDeleteReportConfirm}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
ProfileTop.propTypes = {
  userNo: PropTypes.number,
};
export default ProfileTop;
