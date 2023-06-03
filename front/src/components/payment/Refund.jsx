import React, { useCallback } from 'react';
import axios from 'axios';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { Navigate } from 'react-router';
import { Box } from '@mui/system';
import { Button, Grid } from '@mui/material';

const Refund = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const onClickRefund = useCallback(async () => {
    try {
      const userData = { userNo: 2, meetingNo: 15 };

      const responseOne = await axios.post(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/payment/refund/usermeeting`,
        userData
      );

      const data = { merchant_uid: responseOne.data };

      console.log(data);

      const responseTwo = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/payment/refund`,
        data
      );

      if (responseTwo.status === 200) {
        alert('환불 요청이 성공하였습니다.');
      } else {
        alert('환불 요청이 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('환불 요청 중 오류가 발생하였습니다.');
    }
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
              onClick={onClickRefund}
              variant='contained'
              color='primary'
              size='large'
            >
              취소하기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Refund;
