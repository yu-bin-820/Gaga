import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useState, useCallback } from "react";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import CommonTop from "@layouts/common/CommonTop";
import Typography from "@mui/material/Typography";
import { text } from "@fortawesome/fontawesome-svg-core";
import { useNavigate } from "react-router";

const FindPassword = () => {
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;
  const [phoneNo, setPhoneNo] = useState("");
  const [phoneAuthCode, setPhoneAuthCode] = useState("");
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false); // 인증 완료 여부를 저장하는 state 추가
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigate = useNavigate();
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
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneno/${phoneNo}`
      );

      if (userResponse.data) {
        const user = userResponse.data;
        const updateResponse = await axios.post(
          `${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`,
          {
            ...user,
            password: newPassword,
          }
        );

        if (updateResponse.status === 201) {
          alert("비밀번호가 변경되었습니다."); //비밀번호 변경 완료 알림 추가
          navigate("/");
          
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
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneno/${phoneNo}`
      );
      // 휴대폰 번호가 데이터베이스에 없으면
      if (!checkResponse.data) {
        alert("존재하지 않는 휴대폰 번호입니다.");
        return;
      }
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

  return (
    <>
      <CommonTop pageName="비밀번호 재설정"/>
      <Typography
        style={{ color: "black", marginTop: "100px", textAlign: "center" }}
      > 
        휴대폰 인증 완료 후 비밀번호 변경
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
          fullWidth
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
          fullWidth
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
        >
          인증번호 확인
        </Button>
        {phoneVerified && (
          <>
            <TextField
              type="password"
              label="새 비밀번호"
              name="password"
              value={newPassword}
              onChange={handleChangePassword}
              error={passwordError}
              inputProps={{
                maxLength: 14,  // 최대 입력 가능한 문자 수를 14개로 제한
              }}
            />
            {passwordError && (
              <FormHelperText error>
                영문 숫자 특수문자조합 8~14자리 이내로 입력해주세요.
              </FormHelperText>
            )}
            <TextField
              type="password"
              label="비밀번호 확인"
              name="passwordConfirm"
              value={passwordConfirm}
              onChange={handleChangePasswordConfirm}
              error={!passwordMatch && passwordConfirm !== ""}
              inputProps={{
                maxLength: 14,  // 최대 입력 가능한 문자 수를 14개로 제한
              }}
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