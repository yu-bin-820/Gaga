import React, { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Stack } from '@mui/system';
import CommonTop from '@layouts/common/CommonTop';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Typography } from '@mui/material';

const PaymentRedirect = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const payNo = searchParams.get('payNo');
  const userNo = searchParams.get('userNo');
  const nickName = searchParams.get('nickName');
  const meetingNo = searchParams.get('meetingNo');
  const meetingName = searchParams.get('meetingName');
  const entryFee = searchParams.get('entryFee');
  const imp_success = searchParams.get('imp_success') === 'true';

  const data = {
    imp_success,
    payNo,
    userNo,
    nickName,
    meetingNo,
    meetingName,
    entryFee,
  };

  console.log('Redirect data', data);

  useEffect(() => {
    if (imp_success === false) {
      alert('결제 실패 추후 페이지 구성 예정');
      navigate('/payment/fail', { state: { meetingNo } });
    } else {
      axios
        .post(`${import.meta.env.VITE_SPRING_HOST}/rest/payment`, data)
        .then((paymentData) => {
          console.log('결제 Data received:', paymentData);
          alert('결제 성공');

          axios
            .post(
              `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
              data
            )
            .then((memberData) => {
              console.log('미팅 멤버 Data received:', memberData);
            })
            .catch((error) => {
              console.log('미팅 멤버 오류:', error);
            });
        })
        .catch((error) => {
          console.log('결제 오류:', error);
        });
    }
  }, []);

  const onClickMeeting = useCallback((event) => {
    navigate(`/meeting/meetingno/${meetingNo}`);
  }, []);

  const onClickMain = useCallback((event) => {
    navigate(`/`);
  }, []);

  return (
    <>
      <CommonTop prevPath="/" />
      {imp_success === true ? (
        <Stack sx={{ marginTop: '100px', alignItems: 'center' }}>
          <h2>결제 완료</h2>
          <CheckCircleIcon color="success" sx={{ fontSize: '60px' }} />
          <h3>{data.nickName}님 결제가 정상적으로 처리되었습니다.</h3>
          <Stack sx={{ marginTop: '20px', alignItems: 'center' }}>
            <Typography variant="h7" component="div">
              미팅 이름 : {data.meetingName}
            </Typography>
            <Typography variant="h7" component="div">
              참가비 : {data.entryFee}원
            </Typography>
          </Stack>
          <Stack sx={{ marginTop: '20px' }} direction="row" spacing={2}>
            <Button
              onClick={onClickMeeting}
              variant="contained"
              color="primary"
              size="large"
            >
              모임
            </Button>
            <Button
              onClick={onClickMain}
              variant="contained"
              color="primary"
              size="large"
            >
              메인
            </Button>
          </Stack>
        </Stack>
      ) : (
        <Stack>결제 중입니다</Stack>
      )}
    </>
  );
};

export default PaymentRedirect;
