import React, { useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import CommonTop from '@layouts/common/CommonTop';

const PaymentRedirect = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(search);
  const payNo = searchParams.get('payNo');
  const userNo = searchParams.get('userNo');
  const meetingNo = searchParams.get('meetingNo');
  const meetingName = searchParams.get('meetingName');
  const entryFee = searchParams.get('entryFee');
  const imp_success = searchParams.get('imp_success');

  const data = {
    imp_success,
    payNo,
    userNo,
    meetingNo,
    meetingName,
    entryFee,
  };

  console.log('Redirect data', data);

  useEffect(() => {
    if (!imp_success) {
      alert('결제 실패 추후 페이지 구성 예정');
      navigate('/');
    } else {
      axios
        .post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/payment`, data)
        .then((paymentData) => {
          console.log('결제 Data received:', paymentData);

          axios
            .post(
              `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
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

  return (
    <>
      <CommonTop prevPath='/' />
      {imp_success ? (
        <Box sx={{ marginTop: '100px' }}>
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
      ) : (
        <Box>결제 중입니다</Box>
      )}
    </>
  );
};

export default PaymentRedirect;
