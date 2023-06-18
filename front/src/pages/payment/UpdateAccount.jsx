import React, { useEffect, useState } from 'react';
import Account from '@components/payment/Account';
import CommonTop from '@layouts/common/CommonTop';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import useInput from '@hooks/common/useInput';
import axios from 'axios';
import { Button, Modal, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const UpdateAccount = () => {
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleBankInfoChange = (bankName, accountNo) => {
    setBankName(bankName);
    setAccountNo(accountNo);
  };

  const onButtonClick = async () => {
    try {
      // const { password, ...myDataWithoutPassword } = myData;
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`,
        {
          ...myData,
          bankName,
          accountNo,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      // 서버에서 반환된 새로운 데이터로 캐시 업데이트
      mutateMe(response.data, false);
      console.log('mutating');
      // 캐시 업데이트 후 모달 열기
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (myData) {
      setBankName(myData.bankName);
      setAccountNo(myData.accountNo);
    }
  }, [myData]);

  return (
    <>
      <CommonTop pageName='계좌 관리' prevPath='/community/profile/mine' />
      <Stack sx={{ margin: '10px' }}>
        <Stack sx={{ marginTop: '64px' }}>
          등록된 계좌 정보
          <br />
          <TextField
            sx={{ marginTop: '16px' }}
            label='은행명'
            disabled
            value={bankName}
          />
          <TextField
            sx={{ marginTop: '16px' }}
            label='계좌번호'
            disabled
            value={accountNo}
          />
        </Stack>
        <Stack sx={{ marginTop: '8px', marginBottom: '8px' }}>
          새로 등록할 계좌 정보 조회
          <Account onBankInfoChange={handleBankInfoChange} />
        </Stack>
        <Button
          onClick={onButtonClick}
          variant='contained'
          sx={{ marginTop: '16px', width: '100%' }}
        >
          계좌 등록
        </Button>
        <>
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
              <Typography id='modal-description' sx={{ mt: 0.5 }}>
                계좌 정보를
                <br /> 업데이트했습니다.
              </Typography>
              <Button
                onClick={closeModal}
                style={{ alignSelf: 'flex-end', marginTop: 8 }}
                variant='contained'
              >
                확인
              </Button>
            </Box>
          </Modal>
        </>
      </Stack>
    </>
  );
};

export default UpdateAccount;
