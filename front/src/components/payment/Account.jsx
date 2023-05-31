import { Box, MenuItem, Select, TextField, Button, Grid } from "@mui/material";
import axios from "axios";
import { useCallback, useState, useEffect } from "react";

const Account = () => {
  const [bankCode, setBankCode] = useState("");
  const [bankNum, setBankNum] = useState("");
  const [bankHolder, setBankHolder] = useState("");
  const [bankList, setBankList] = useState([]);

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
        setBankHolder(responseData.response.bank_holder);
      } else {
        console.log("bank_holder를 가져올 수 없습니다.", responseData);
        setBankHolder("");
      }
    } catch (err) {
      console.error(err);
    }
  }, [bankCode, bankNum]);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>은행 선택:</Box>
          <Select
            fullWidth
            value={bankCode}
            onChange={(e) => setBankCode(e.target.value)}
          >
            {bankList.map((bank) => (
              <MenuItem key={bank.code} value={bank.code}>
                {bank.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Box>계좌 번호:</Box>
          <TextField
            fullWidth
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
