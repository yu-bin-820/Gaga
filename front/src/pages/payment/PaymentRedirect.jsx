import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Box } from '@mui/system';
import CommonTop from '@layouts/common/CommonTop';

const PaymentRedirect = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const payNo = searchParams.get('payNo');
  const userNo = searchParams.get('userNo');
  const meetingNo = searchParams.get('meetingNo');
  const meetingName = searchParams.get('meetingName');
  const entryFee = searchParams.get('entryFee');

  const data = {
    success: true,
    payNo,
    userNo,
    meetingNo,
    meetingName,
    entryFee,
  };

  console.log('Redirect data', data);

  useEffect(() => {
    axios
      .post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/payment`, data)
      .then((data) => {
        console.log('Data received:', data);
      })
      .catch((error) => {
        console.log('결제 오류:', error);
      });
  }, []);

  return (
    <>
      <CommonTop prevPath='/' />
      <Box id='success' sx={{ marginTop: '100px' }}>
        <h2>결제 성공했어요~~~</h2>
        <Box sx={{ marginTop: '20px' }}>
          결제 번호 : {data.payNo}
          <br />
          회원 번호 : {data.userNo}
          <br />
          미팅 번호 : {data.meetingNo}
          <br />
          미팅 이름 : {data.meetingName}
          <br />
          참가비 : {data.entryFee}원
          <br />
        </Box>
      </Box>
    </>
  );
};

export default PaymentRedirect;
