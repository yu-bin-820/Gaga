import useInput from '@hooks/common/useInput';
import useSWR from 'swr';
import React, { useCallback, useState } from 'react';
import fetcher from '@utils/fetcher';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Box, Stack } from '@mui/system';
import { Button, Modal, TextField, Typography } from '@mui/material';
import Account from '@components/payment/Account';
import CommonTop from '@layouts/common/CommonTop';

const UpdateMeetingSuccess = () => {
  const { meetingno } = useParams();
  const [meeting, onChangeMeeting, setMeeting] = useInput({
    meetingNo: '',
    accountNo: '',
    bankName: '',
  });

  const { data: myData} = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const {mutate: mutateMeeting } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`,
    fetcher
  );

  const { mutate: mutateMeetingLsit } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/${myData?.userNo}`,
    fetcher
);

  const [bankName, setBankName] = useState(myData ? myData.bankName : '');
  const [accountNo, setAccountNo] = useState(myData ? myData.accountNo : '');
  const handleBankInfoChange = (bankName, accountNo) => {
    setBankName(bankName);
    setAccountNo(accountNo);
  };

  const [openModal, setOpenModal] = useState(false);
  const closeModal = () => {
    setOpenModal(false);
    navigate('/community/profile/mine');
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
      )
      .then(() => {
        mutateMeetingLsit();
        mutateMeeting();
      });

      setOpenModal(true);

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [accountNo, bankName, meetingno, mutateMeeting, mutateMeetingLsit]);

  return (
    <>
      <CommonTop />
      <Stack sx={{ marginTop: '64px' }}>
        <Stack sx={{ margin: '10px' }}>
          정산받을 계좌 정보
          <br />
          <TextField
            sx={{ marginTop: '8px' }}
            label='은행명'
            value={bankName}
            disabled
          />
          <TextField
            sx={{ marginTop: '8px' }}
            label='계좌번호'
            value={accountNo}
            disabled
          />
          *기존 계좌와 다른 계좌를 등록하고 싶은 경우*
          <Stack>
            <Account onBankInfoChange={handleBankInfoChange} />
            <Button
              onClick={onClickMeetingSuccess}
              variant='contained'
              sx={{ marginTop: '16px', width: '100%' }}
            >
              성사하기{' '}
            </Button>
            <>
              <Modal
                open={openModal}
                onClose={closeModal}
                aria-labelledby='modal-title'
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
                  <Typography id='modal-title' variant='h6' component='h2'>
                    알림
                  </Typography>
                  <Typography id='modal-description' sx={{ mt: 2 }}>
                    모임이 성사되었습니다.
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
          </Stack>
        </Stack>
      </Stack>
    </>
  );
};

export default UpdateMeetingSuccess;
