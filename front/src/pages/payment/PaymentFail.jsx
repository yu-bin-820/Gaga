import CommonTop from '@layouts/common/CommonTop';
import { Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { LoadingButton } from '@mui/lab';
import PendingIcon from '@mui/icons-material/Pending';

const PaymentFail = () => {
  const location = useLocation();
  const meetingNo = location.state?.meetingNo;
  const nickName = location.state?.nickName;

  const navigate = useNavigate();

  const onClickMeeting = useCallback((event) => {
    navigate(`/meeting/meetingno/${meetingNo}`);
  }, []);

  return (
    <>
      <CommonTop prevPath='/' />
      <Stack sx={{ marginTop: '100px', alignItems: 'center' }}>
        <h2>결제 실패</h2>

        <CheckCircleIcon color='error' sx={{ fontSize: '60px' }} />

        <h3>{nickName}님의 결제가 정상적으로 처리되지 않았습니다. </h3>

        <Stack sx={{ marginTop: '20px' }} direction='row' spacing={2}>
          <Button
            onClick={onClickMeeting}
            variant='outlined'
            color='primary'
            size='large'
          >
            모임
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default PaymentFail;
