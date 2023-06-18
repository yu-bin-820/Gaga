import { Button, TextField } from "@mui/material";
import { Box, textAlign } from "@mui/system";
import axios from "axios";
import React, { useState, useCallback } from "react";
import CommonTop from "@layouts/common/CommonTop";
import Typography from "@mui/material/Typography";
import { Card, CardContent } from '@mui/material';

const FindId = () => {
  const [phoneNo, setPhoneNo] = useState("");
  const [userId, setUserId] = useState("");
  const [phoneAuthCode, setPhoneAuthCode] = useState(null);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false); // 인증 완료 여부를 저장하는 state 추가

  const handlePhoneAuthRequest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneNo`,
        {
          phoneNo: phoneNo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 핸드폰 인증 코드를 받아옴
      const phoneAuthCode = response.data;
      setPhoneAuthCode(phoneAuthCode);
      alert("인증 코드가 핸드폰으로 발송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("인증 코드 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handlePhoneVerification = () => {
    console.log("서버코드" + phoneVerificationCode);
    console.log("화면코드" + phoneAuthCode);
    if (phoneVerificationCode === String(phoneAuthCode)) {
      alert("인증이 완료되었습니다!");
      setPhoneVerified(true);
    } else {
      alert("인증 코드가 올바르지 않습니다. 다시 확인해 주세요.");
    }
  };

  const handleFindId = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneno/${phoneNo}`
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
      <CommonTop pageName="아이디 찾기" />
      <Typography
        style={{ color: "black", marginTop: "100px", textAlign: "center" }}
      >
        휴대폰 인증 완료후 아이디 찾기
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "80%",
          margin: "0 auto",
        }}
      >
        <TextField
          label="휴대폰 번호"
          value={phoneNo}
          sx={{ marginTop: "100px", marginBottom: "10px" }}
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
          value={phoneVerificationCode}
          sx={{ marginTop: "20px", marginBottom: "10px" }}
          onChange={(e) => {
            const input = e.target.value;
            const regex = /^[0-9]{0,6}$/; // 0부터 9까지의 숫자로 이루어진 최대 6자리의 정규식 패턴
            if (regex.test(input)) {
              setPhoneVerificationCode(input);
            }
          }}
        />
        <Button
          onClick={handlePhoneVerification}
          disabled={!/^\d{6}$/.test(phoneVerificationCode)}
          sx={{ marginBottom: "10px" }}
        >
          인증번호 확인
        </Button>

        <Button
          onClick={handleFindId}
          disabled={!phoneVerified} // phoneVerified가 false일 때 버튼 비활성화
        >
          아이디 찾기
        </Button>
{/* 
        {userId && <p>당신의 아이디는 {userId}입니다.</p>} */}
        {userId && (
          <Card>
            <CardContent>
              {/* <Typography variant="h6" component="div">
                당신의 아이디는
              </Typography> */}
              <Typography variant="h6" component="div" color="primary">
                {userId}
              </Typography>
              {/* <Typography variant="h6" component="div">
                입니다.
              </Typography> */}
            </CardContent>
          </Card>
        )}
      </Box>
    </>
  );
};

export default FindId;
