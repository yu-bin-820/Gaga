import React, { useEffect } from "react";
import axios from "axios";
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { Box } from "@mui/system";
import { Button, Grid, Typography } from "@mui/material";

const Payment = () => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init("imp76832241");

    const payTime = new Date().toISOString();

    const data = {
      pg: "html5_inicis", // PG사
      pay_method: "card", // 결제수단
      merchant_uid: `mid_${new Date().getTime()}`, //상점 결제 번호
      amount: 100, // 결제금액
      name: "meeting2",
      buyer_name: myData?.userName,
      userNo: myData?.userNo,
      payNo: `mid_${new Date().getTime()}`,
      payTime: payTime,
      buyer_tel: myData?.phoneNo, // 구매자 전화번호
      buyer_email: myData?.userId, // 구매자 이메일
      buyer_addr: "null", // 구매자 주소
      buyer_postcode: "null", // 구매자 우편번호
      entryFee: 100,
    };

    const callback = (response) => {
      const { success, error_msg } = response;
      console.log(response);

      if (success) {
        alert("결제 성공");

        axios
          .post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/payment`, data)
          .then((response) => {
            console.log(data);
            console.log(response.data);

            const { success, error_msg } = response.data;
          })
          .catch((error) => {
            console.log("결제 오류:", error);
          });
      } else {
        alert(`결제 실패: ${error_msg}`);
      }
    };

    IMP.request_pay(data, callback);
  };

  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://code.jquery.com/jquery-1.12.4.min.js";
    script1.type = "text/javascript";
    script1.async = true;
    document.head.appendChild(script1);

    const script2 = document.createElement("script");
    script2.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script2.type = "text/javascript";
    script2.async = true;
    document.head.appendChild(script2);

    return () => {
      document.head.removeChild(script1);
      document.head.removeChild(script2);
    };
  }, []);

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="10vh"
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12}>
            <Button
              onClick={onClickPayment}
              variant="contained"
              color="primary"
              size="large"
            >
              결제하기
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Payment;
