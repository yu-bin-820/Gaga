import { Box, MenuItem, Select, TextField, Button, Grid } from "@mui/material";
import fetcher from "@utils/fetcher";
import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import useSWR from "swr";

const Account = (props) => {
  const { onBankInfoChange } = props;
  const [bankCode, setBankCode] = useState("");
  const [bankNum, setBankNum] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bankList, setBankList] = useState([]);

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const response = await axios.get(
          `http://${import.meta.env.VITE_SPRING_HOST}/rest/payment/banks`
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
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/payment/account/holder`,
        {
          bank_code: parseInt(bankCode, 10),
          bank_num: bankNum, // 문자열로 전송합니다.
        }
      );

      const responseData = response.data;
      if (responseData && responseData.code === 0 && responseData.response) {
        console.log(response.data);
        setBankHolder(responseData.response.bank_holder);

        // BankName 및 AccountNo 상태 전달
        onBankInfoChange(
          bankList.find((bank) => bank.code === bankCode).name,
          bankNum
        );
      } else {
        console.log("bank_holder를 가져올 수 없습니다.", responseData);
        setBankHolder("");

        // 에러 발생 시 상태 초기화
        onBankInfoChange("", "");
      }
    } catch (err) {
      console.error(err);
    }
  }, [bankCode, bankNum, onBankInfoChange]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>은행 선택:</Box>
          <TextField
            select
            fullWidth
            label="bankName"
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
          >
            {bankList.map((bank) => (
              <MenuItem key={bank.code} value={bank.code}>
                {bank.name}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Box>계좌 번호:</Box>
          <TextField
            fullWidth
            label="accountNo"
            type="text"
            value={bankNum}
            onChange={(e) => setBankNum(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={onClickAccount} variant="contained">
            조회
          </Button>
        </Grid>

        {bankHolder && (
          <Grid item xs={12}>
            <Box>계좌주: {bankHolder}</Box>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default Account;
