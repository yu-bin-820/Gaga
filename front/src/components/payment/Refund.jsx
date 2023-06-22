import React, { useCallback, useState } from 'react';
import axios from 'axios';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import { Box } from '@mui/system';
import { Button, Grid, Modal, Typography } from '@mui/material';

const Refund = ({ userNo, meetingNo }) => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };

  const onClickRefund = useCallback(async () => {
    try {
      const userData = { userNo: userNo, meetingNo: meetingNo };

      console.log('데이터 잘 받아오나요?', userData);

      const responseOne = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/payment/refund/usermeeting`,
        userData
      );

      const data = { merchant_uid: responseOne.data };

      console.log(data);

      const responseTwo = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/payment/refund`,
        data
      );

      if (responseTwo.status === 200) {
        setOpenModal(true);

        const responseThree = await axios.delete(
          `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`,
          { data: userData } // userData를 delete 요청에 사용
        );
      } else {
        alert('환불 요청이 실패하였습니다.');
      }
    } catch (error) {
      console.error(error);
      alert('환불 요청 중 오류가 발생하였습니다.');
    }
  }, [userNo, meetingNo]);

  return (
    <>
      <Box paddingBottom={1}>
        <Button
          variant='contained'
          sx={{ width: '95vw', borderRadius: '50px' }}
          onClick={onClickRefund}
        >
          환불하기
        </Button>
      </Box>
      <Modal
        open={openModal}
        onClose={closeModal}
        aria-describedby='modal-description'
      >
        <Box
          sx={{
            p: 4,
            backgroundColor: 'white',
            borderRadius: 2,
            mx: 'auto',
            my: '20%',
            width: '50%',
          }}
        >
          <Typography id='modal-description' sx={{ mt: 2 }}>
            환불이 성공적으로 <br />
            처리되었습니다.
          </Typography>
          <Button
            onClick={() => {
              closeModal();
            }}
            style={{ alignSelf: 'flex-end', marginTop: 16 }}
            variant='contained'
          >
            확인
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default Refund;
