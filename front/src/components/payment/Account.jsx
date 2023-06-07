import {
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import { useCallback, useState, useEffect } from 'react';
import useSWR from 'swr';

const Account = (props) => {
  const { onBankInfoChange } = props;
  const [bankCode, setBankCode] = useState('');
  const [accountNo, setAccountNo] = useState('');
  const [bankHolder, setBankHolder] = useState('');
  const [bankHolderCheck, setBankHolderCheck] = useState('');
  const [bankList, setBankList] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    if (bankHolder === bankHolderCheck && bankHolder !== '') {
      setOpenModal(true);
    } else {
      setOpenModal(false);
    }
  }, [bankHolder, bankHolderCheck]);

  const closeModal = () => {
    setOpenModal(false);
  };

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SPRING_HOST}/rest/payment/banks`
        );
        setBankList(response.data.response);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBanks();
  }, []);

  const onClickAccount = useCallback(async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/payment/account/holder`,
        {
          bank_code: parseInt(bankCode, 10),
          bank_num: accountNo, // 문자열로 전송합니다.
        }
      );

      const responseData = response.data;
      if (responseData && responseData.code === 0 && responseData.response) {
        console.log(response.data);
        setBankHolder(responseData.response.bank_holder);

        // BankName 및 AccountNo 상태 전달
        onBankInfoChange(
          bankList.find((bank) => bank.code === bankCode).name,
          accountNo
        );

        if (bankHolderCheck === responseData.response.bank_holder) {
          setOpenModal(true);
        }
      } else {
        console.log('bank_holder를 가져올 수 없습니다.', responseData);
        setBankHolder('');

        // 에러 발생 시 상태 초기화
        onBankInfoChange('', '');
      }
    } catch (err) {
      console.error(err);
    }
  }, [bankCode, accountNo, bankHolderCheck, onBankInfoChange]);

  return (
    <>
      <Stack spacing={2} sx={{ width: '100%' }}>
        <Stack sx={{ marginBottom: '8px' }} />
        <TextField
          select
          fullWidth
          label='bankName'
          value={bankCode}
          onChange={(e) => setBankCode(e.target.value)}
        >
          {bankList.map((bank) => (
            <MenuItem key={bank.code} value={bank.code}>
              {bank.name}
            </MenuItem>
          ))}
        </TextField>

        <Stack sx={{ marginBottom: '8px' }} />
        <TextField
          fullWidth
          label='accountNo'
          type='text'
          value={accountNo}
          onChange={(e) => setAccountNo(e.target.value)}
        />
        <Stack sx={{ marginBottom: '8px' }} />
        <TextField
          fullWidth
          label='bankHolderCheck'
          type='text'
          value={bankHolderCheck}
          onChange={(e) => setBankHolderCheck(e.target.value)}
        />
        <Stack sx={{ marginBottom: '16px' }} />
        <Button
          onClick={onClickAccount}
          variant='contained'
          sx={{ marginTop: '16px', width: '100%' }}
        >
          조회
        </Button>

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
              {bankHolderCheck}의 계좌 정보를 조회하였습니다.
            </Typography>
            <Button
              onClick={closeModal}
              style={{ alignSelf: 'flex-end', marginTop: 16 }}
              variant='contained'
            >
              확인
            </Button>
          </Box>
        </Modal>
      </Stack>
    </>
  );
};

export default Account;
