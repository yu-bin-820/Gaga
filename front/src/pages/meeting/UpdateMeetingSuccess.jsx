import useInput from '@hooks/common/useInput';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import fetcher from '@utils/fetcher';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Box, Stack } from '@mui/system';
import { Button, TextField } from '@mui/material';
import Account from '@components/payment/Account';
import CommonTop from '@layouts/common/CommonTop';

const UpdateMeetingSuccess = () => {
  const { meetingno } = useParams();
  const [meeting, onChangeMeeting, setMeeting] = useInput({
    meetingNo: '',
    accountNo: '',
    bankName: '',
  });

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const [bankName, setBankName] = useState(myData ? myData.bankName : '');
  const [accountNo, setAccountNo] = useState(myData ? myData.accountNo : '');
  const handleBankInfoChange = (bankName, accountNo) => {
    setBankName(bankName);
    setAccountNo(accountNo);
  };

  const navigate = useNavigate();
  const onClickMeetingSuccess = useCallback(async () => {
    event.preventDefault();

    try {
      const data = {
        meetingNo: meetingno,
        accountNo,
        bankName,
      };

      console.log('미팅번호', data.meetingNo);
      console.log('계좌번호', data.accountNo);
      console.log('은행명', data.bankName);

      const response = await axios.patch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/meetingsuccess`,
        data
      );

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [accountNo, bankName, meetingno]);

  return (
    <>
      <CommonTop />
      <Stack sx={{ marginTop: '64px' }}>
        등록된 계좌 정보
        <br />
        <TextField
          sx={{ marginTop: '8px' }}
          label='bankName'
          value={bankName}
        />
        <TextField
          sx={{ marginTop: '8px' }}
          label='accountNo'
          value={accountNo}
        />
      </Stack>
      *기존 계좌와 다른 계좌를 등록하고 싶은 경우*
      <Stack sx={{ marginTop: '8px' }}>
        <Account onBankInfoChange={handleBankInfoChange} />
        <Button
          onClick={onClickMeetingSuccess}
          variant='contained'
          sx={{ marginTop: '16px', width: '100%' }}
        >
          성사하기{' '}
        </Button>
      </Stack>
    </>
  );
};

export default UpdateMeetingSuccess;
