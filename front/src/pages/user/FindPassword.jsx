import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useCallback } from "react";
import MainTop from "@layouts/common/MainTop";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";

const FindPassword = () => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneAuthCode, setPhoneAuthCode] = useState("");
  const [phoneAuthVerified, setPhoneAuthVerified] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  // ...
  const checkPassword = (password) => {
    if (passwordRegex.test(password)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);

    if (event.target.value === newPassword) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleChangePassword = (event) => {
    const password = event.target.value;
    setNewPassword(password);
    checkPassword(password);
  };

  const handlePasswordChange = async () => {
    if (!passwordMatch || passwordError) return;

    try {
      const userResponse = await axios.get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/phoneno/${phoneNo}`
      );

      if (userResponse.data) {
        const user = userResponse.data;
        const updateResponse = await axios.post(
          `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`,
          {
            ...user,
            password: newPassword,
          }
        );

        if (updateResponse.status === 201) {
          alert("비밀번호가 변경되었습니다."); //비밀번호 변경 완료 알림 추가
        } else {
          alert("비밀번호 변경에 실패하였습니다."); //비밀번호 변경 실패 알림 추가
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneAuthRequest = async () => {
    try {
      if (!phoneNo.startsWith("010")) {
        alert("휴대폰 번호는 010으로 시작해야 합니다.");
        return;
      }
      // 휴대폰 번호 확인
      const checkResponse = await axios.get(
        `http://${
          import.meta.env.VITE_SPRING_HOST
        }/rest/user/phoneno/${phoneNo}`
      );
      // 휴대폰 번호가 데이터베이스에 없으면
      if (!checkResponse.data) {
        alert("존재하지 않는 휴대폰 번호입니다.");
        return;
      }
      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuth`,
        phoneNo,
        { withCredentials: true }
      );
      console.log("폰인증전 오는 데이터" + response.data);
      if (response.data === false) {
        console.log("폰인증후 오는 데이터" + response.data);
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
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuthOk`,
        phoneAuthCode,
        { withCredentials: true }
      );

      if (response.data === true) {
        // 인증 성공한 경우 처리
        setPhoneAuthVerified(true);
      } else {
        // 인증 실패한 경우 처리
        alert("인증번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <MainTop />
      <div style={{ color: "black", marginTop: "100px" }}>
        휴대폰 인증 완료후 비밀번호 변경
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
          <>
            <TextField
              type="password"
              label="새 비밀번호"
              name="password"
              value={newPassword}
              onChange={handleChangePassword}
              error={passwordError}
            />
            {passwordError && (
              <FormHelperText error>
                비밀번호는 8~14글자이며, 영문, 숫자, 특수문자 조합이어야 합니다.
              </FormHelperText>
            )}
            <TextField
              type="password"
              label="비밀번호 확인"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handleChangePasswordConfirm}
              error={!passwordMatch && passwordConfirm !== ""}
            />
            {!passwordMatch && passwordConfirm !== "" && (
              <FormHelperText error>
                비밀번호가 일치하지 않습니다.
              </FormHelperText>
            )}
            {passwordMatch && (
              <Button onClick={handlePasswordChange}>비밀번호 변경</Button>
            )}
          </>
        )}
      </Box>
    </>
  );
};

export default FindPassword;
