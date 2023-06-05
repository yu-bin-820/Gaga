import React, { useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Box } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import usePaymentFormStore from '@hooks/payment/usePaymentFormStore';

const Payment = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  console.log('나는야 Payment 페이지~~');

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp76832241');

    const payTime = new Date().toISOString();
    const orderId = `mid_${Date.now()}`;
    const meetingNo = 13;
    const meetingName = 'meetingName13';
    const entryFee = 100;

    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: orderId, //상점 결제 번호, 환불시 필요
      amount: entryFee, // 결제금액 여기까지 아임포트 필수 입력값
      name: meetingName,
      buyer_name: myData?.userName,
      userNo: myData?.userNo,
      meetingNo: meetingNo,
      meetingName: meetingName,
      payNo: orderId,
      payTime: payTime,
      buyer_tel: myData?.phoneNo, // 구매자 전화번호
      buyer_email: myData?.userId, // 구매자 이메일
      entryFee: entryFee,
      m_redirect_url: `http://${
        import.meta.env.VITE_REACT_HOST
      }/payment/redirect?payNo=${orderId}&userNo=${
        myData?.userNo
      }&meetingNo=${meetingNo}&meetingName=${meetingName}&entryFee=${entryFee}`,
    };

    const callback = (response) => {
      const { success, error_msg } = response;
      console.log(response);

      if (success) {
        alert('결제 성공');

        axios
          .post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/payment`, data)
          .then((response) => {
            console.log(data);
            console.log(response.data);

            const { success, error_msg } = response.data;
          })
          .catch((error) => {
            console.log('결제 오류:', error);
          });
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    };

    IMP.request_pay(data, callback);
  };

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    script1.type = 'text/javascript';
    script1.async = true;

    const script2 = document.createElement('script');
    script2.src = 'https://cdn.iamport.kr/js/iamport.payment-1.2.0.js';
    script2.type = 'text/javascript';
    script2.async = true;

    document.head.appendChild(script1);
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <>
      <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'
        minHeight='10vh'
      >
        <Grid container spacing={2} justifyContent='center'>
          <Grid item xs={12}>
            <Button
              onClick={onClickPayment}
              variant='contained'
              color='primary'
              size='large'
            >
              결제하기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Payment;
