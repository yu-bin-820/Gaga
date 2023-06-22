import React, { useEffect } from 'react';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { Box } from '@mui/system';
import { Button, Grid, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const Payment = ({ meeting }) => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  console.log('나는야 Payment 페이지~~');

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp76832241');

    const payTime = new Date().toISOString();
    const orderId = `mid_${Date.now()}`;
    const meetingNo = meeting?.meetingNo;
    const meetingName = meeting?.meetingName;
    const entryFee = meeting?.entryFee;
    const nickName = myData?.nickName;

    const data = {
      pg: 'html5_inicis', // PG사
      pay_method: 'card', // 결제수단
      merchant_uid: orderId, //상점 결제 번호, 환불시 필요
      amount: entryFee, // 결제금액
      name: meetingName, // 상품명 여기에서는 미팅 이름 여기까지 아임포트 필수 입력값
      buyer_name: myData?.userName,
      userNo: myData?.userNo,
      nickName: myData?.nickName,
      meetingNo: meetingNo,
      meetingName: meetingName,
      payNo: orderId,
      payTime: payTime,
      buyer_tel: myData?.phoneNo, // 구매자 전화번호
      buyer_email: myData?.userId, // 구매자 이메일
      entryFee: entryFee,
      m_redirect_url: `https://www.gaga.works/payment/redirect?payNo=${orderId}&entryFee=${entryFee}&userNo=${myData?.userNo}&nickName=${myData?.nickName}&meetingNo=${meetingNo}&meetingName=${meetingName}`,
    };

    const callback = (response) => {
      const { success, error_msg } = response;
      console.log(response);

      if (success) {
        alert('결제 성공');

        axios
          .post(`${import.meta.env.VITE_SPRING_HOST}/rest/payment`, data)
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
    <Button
      onClick={onClickPayment}
      variant='contained'
      sx={{ width: '85vw', borderRadius: '50px' }}
    >
      결제하기
    </Button>
  );
};

Payment.propTypes = {
  meeting: PropTypes.object.isRequired,
  myData: PropTypes.object.isRequired,
};

export default Payment;
