import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useCallback } from "react";
import MainTop from "@layouts/common/MainTop";

const FindId = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneAuthCode, setPhoneAuthCode] = useState("");
  const [phoneAuthVerified, setPhoneAuthVerified] = useState(false);
  const [userId, setUserId] = useState("");

  const handlePhoneAuthRequest = async () => {
    try {
      if (!phoneNo.startsWith("010")) {
        alert("휴대폰 번호는 010으로 시작해야 합니다.");
        return;
      }
      // 휴대폰 번호 확인
      const checkResponse = await axios.get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/phoneno/${phoneNo}`
      );
      // 휴대폰 번호가 데이터베이스에 없으면
      if (!checkResponse.data) {
        alert("존재하지 않는 휴대폰 번호입니다.");
        return;
      }
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuth`,
        phoneNo,
        { withCredentials: true }
      );

      if (response.data === false) {
        alert("인증번호가 발송되었습니다."); //인증번호 발송 알림 추가
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(phoneNo);
  const handlePhoneAuthVerify = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuthOk`,
        phoneAuthCode,
        { withCredentials: true }
      );

      if (response.data) {
        // 인증 성공한 경우 처리
        setPhoneAuthVerified(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFindId = async () => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/phoneno/${phoneNo}`
      );

      if (response.data) {
        setUserId(response.data.userId);
      } else {
        alert("해당하는 아이디가 없습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MainTop />
      <div style={{ color: "black", marginTop: "100px" }}>
        휴대폰 인증 완료후 아이디 찾기
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "100px",
        }}
      >
        <TextField
          label="휴대폰 번호"
          value={phoneNo}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9]{0,11}$/; // 숫자로 이루어진 정규식 패턴
            if (regex.test(input)) {
              setPhoneNo(input);
            }
          }}
        />
        <Button
          onClick={handlePhoneAuthRequest}
          disabled={phoneNo.length !== 11}
        >
          인증번호 발송
        </Button>
        <TextField
          label="인증번호"
          value={phoneAuthCode}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9]{0,6}$/; // 0부터 9까지의 숫자로 이루어진 최대 6자리의 정규식 패턴
            if (regex.test(input)) {
              setPhoneAuthCode(input);
            }
          }}
        />
        <Button
          onClick={handlePhoneAuthVerify}
          disabled={!/^\d{6}$/.test(phoneAuthCode)}
        >
          인증번호 확인
        </Button>
        {phoneAuthVerified && (
          <Button onClick={handleFindId}>아이디 찾기</Button>
        )}
        {userId && <p>당신의 아이디는 {userId}입니다.</p>}
      </Box>
    </>
  );
};

export default FindId;
