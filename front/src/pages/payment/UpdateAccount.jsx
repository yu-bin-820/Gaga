import React, { useEffect, useState } from 'react';
import Account from '@components/payment/Account';
import CommonTop from '@layouts/common/CommonTop';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import useInput from '@hooks/common/useInput';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

const UpdateAccount = () => {
  const [bankName, setBankName] = useState('');
  const [accountNo, setAccountNo] = useState('');

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const handleBankInfoChange = (bankName, accountNo) => {
    setBankName(bankName);
    setAccountNo(accountNo);
  };

  const onButtonClick = () => {
    axios
      .post(`${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`, {
        ...myData,
        bankName,
        accountNo,
      })
      .then((response) => {
        console.log(response.data);
        setBankName(response.data.bankName);
        setAccountNo(response.data.accountNo);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <CommonTop />
      <Stack sx={{ marginTop: '64px' }}>
        등록된 계좌 정보
        <br />
        <TextField
          sx={{ marginTop: '16px' }}
          label='bankName'
          value={myData.bankName}
        />
        <TextField
          sx={{ marginTop: '16px' }}
          label='accountNo'
          value={myData.accountNo}
        />
      </Stack>
      <Stack sx={{ marginTop: '8px', marginBottom: '8px' }}>
        새로 등록할 계좌 정보
        <Account onBankInfoChange={handleBankInfoChange} />
      </Stack>
      <Button
        onClick={onButtonClick}
        variant='contained'
        sx={{ marginTop: '16px', width: '100%' }}
      >
        계좌 등록
      </Button>
    </>
  );
};

export default UpdateAccount;
