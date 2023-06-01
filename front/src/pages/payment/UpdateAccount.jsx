import React, { useEffect, useState } from "react";
import Account from "@components/payment/Account";
import CommonTop from "@layouts/common/CommonTop";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import useInput from "@hooks/common/useInput";
import axios from "axios";
import { Button, TextField } from "@mui/material";

const UpdateAccount = () => {
  const [bankName, setBankName] = useState("");
  const [accountNo, setAccountNo] = useState("");

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const onButtonClick = () => {
    axios
      .post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`, {
        ...myData,
        bankName: "우리은행",
        accountNo: "123123123",
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
      <Box sx={{ marginTop: "64px" }}>
        <Account />
      </Box>
      <Button onClick={onButtonClick}>정보수정</Button>
    </>
  );
};

export default UpdateAccount;
