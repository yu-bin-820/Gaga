import CommonTop from '@layouts/common/CommonTop';
import { Button } from '@mui/material';
import { Stack } from '@mui/system';
import { useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import CloseIcon from '@mui/icons-material/Close';

const PaymentFail = () => {
  const location = useLocation();
  const meetingNo = location.state?.meetingNo;
  const nickName = location.state?.nickName;

  const navigate = useNavigate();

  const onClickMeeting = useCallback((event) => {
    navigate(`/meeting/meetingno/${meetingNo}`);
  }, []);

  const onClickMain = useCallback((event) => {
    navigate(`/`);
  }, []);

  return (
    <>
      <CommonTop prevPath='/' />
      <Stack sx={{ marginTop: '100px', alignItems: 'center' }}>
        <h2>결제 실패</h2>

        <CloseIcon color='error' sx={{ fontSize: '60px' }} />

        <h3>{nickName}님 결제가 정상적으로 처리되지 않았습니다. </h3>

        <Stack sx={{ marginTop: '20px' }} direction='row' spacing={2}>
          <Button
            onClick={onClickMeeting}
            variant='contained'
            color='primary'
            size='large'
          >
            모임
          </Button>
          <Button
            onClick={onClickMain}
            variant='contained'
            color='primary'
            size='large'
          >
            메인
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default PaymentFail;
