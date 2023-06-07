import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState,useEffect } from "react";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Grid,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import CommonTop from "@layouts/common/CommonTop";
import useUserFormStore from "@hooks/user/useUserFormStore";
import { useNavigate } from "react-router";
import AddUserDate from "@components/user/AddUserDate";

import Modal from "@mui/material/Modal";
import { Update } from "@mui/icons-material";
import useUpdateUserFormStore from "@hooks/user/useUpdateUserFormStore";
import UpdateUserDate from "@components/user/UpdateUserDate";

const UpdateUser = () => {
  const {
    userId,
    password,
    userName,
    birthday,
    gender=1,
    nickName,
    phoneNo,
    setField,
    onChangeField,
    reset,
  } = useUpdateUserFormStore();

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);

  const handleNameChange = (e) => {
    onChangeField("userName", e);
    setIsNameValid(e.target.value.trim() !== "");
  };
  const handleNicknameChange = (e) => {
    onChangeField("nickName", e);
    setIsNicknameValid(e.target.value.trim() !== "");
  };

  const handleGenderChange = (e) => {
    onChangeField("gender", e);
    setIsGenderValid(e.target.value !== "");
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    if (myData) {
      setField("userId", myData.userId);
      setField("password", myData.password);
      setField("userName", myData.userName);
      setField("birthday", dayjs(myData.birthday).format("MM-DD-YYYY"));
      setField("gender", myData.gender);
      setField("nickName", myData.nickName);
      setField("phoneNo", myData.phoneNo);
    }
  }, [myData]);
  console.log("로그인한 사용자정보는="+myData);
  console.dir(myData);
  console.log(birthday)

  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("password", password);
      formData.append("userName", userName);
      formData.append("birthday", dayjs(birthday).format("YYYY-MM-DD"));
      formData.append("gender", gender);
      formData.append("nickName", nickName);
      formData.append("phoneNo", phoneNo);
      console.log("회원이 수정한 생년월일은?=" + dayjs(birthday).format("YYYY-MM-DD"));

      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`,
        {
          userId: userId,
          password: password,
          userName: userName,
          birthday: dayjs(birthday).format("YYYY-MM-DD"),
          gender: gender,
          nickName: nickName,
          phoneNo: phoneNo,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        alert("회원정보가 성공적으로 업데이트 되었습니다!");
      }

      reset();

      navigate("/");

      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("회원정보 업데이트에 실패했습니다. 다시 시도해 주세요."); 
    }
  }, [userId, password, userName, birthday, gender, nickName, phoneNo,isUserIdValid]);


  function isValidEmail(email) {
    const re =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return re.test(email);
  }
  const [emailError, setEmailError] = useState("");
  const handleEmailChange = (e) => {
    onChangeField("userId", e);
    const isValid = isValidEmail(e.target.value);
    setEmailError(isValid ? "" : "이메일 형식이 올바르지 않습니다.");
  };

  const [emailAuthCode, setEmailAuthCode] = useState(null);
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const handleEmailAuthRequest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/mailAuth`,
        {
          email: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const emailAuthCode = response.data;
      setEmailAuthCode(emailAuthCode);
      alert("인증 코드가 이메일로 발송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("인증 코드 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };
  const handleEmailVerificationCodeChange = (e) => {
    setEmailVerificationCode(e.target.value);
  };

  const handleEmailVerification = () => {
    if (emailVerificationCode === emailAuthCode) {
      alert("인증이 완료되었습니다!");
      setEmailVerified(true);
    } else {
      alert("인증 코드가 올바르지 않습니다. 다시 확인해 주세요.");
    }
  };

  const [phoneAuthCode, setPhoneAuthCode] = useState(null);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");

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

      const phoneAuthCode = response.data;
      setPhoneAuthCode(phoneAuthCode);
      alert("인증 코드가 핸드폰으로 발송되었습니다.");
    } catch (error) {
      console.error(error);
      alert("인증 코드 발송에 실패했습니다. 다시 시도해 주세요.");
    }
  };

  const handlePhoneVerification = () => {
    if (phoneVerificationCode === String(phoneAuthCode)) {
      alert("인증이 완료되었습니다!");
      setPhoneVerified(true);
    } else {
      alert("인증 코드가 올바르지 않습니다. 다시 확인해 주세요.");
    }
  };

  function isValidPassword(password) {
    const re =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,14}$/;
    return re.test(password);
  }

  const [passwordError, setPasswordError] = useState("");
  const handlePasswordChange = (e) => {
    onChangeField("password", e);
    const isValid = isValidPassword(e.target.value);
    setPasswordError(isValid ? "" : "비밀번호 형식이 올바르지 않습니다.");
  };

  // 3. 비밀번호 일치 확인
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmError, setPasswordConfirmError] = useState("");
  const handlePasswordConfirmChange = (e) => {
    setPasswordConfirm(e.target.value);
    setPasswordConfirmError(
      e.target.value === password ? "" : "비밀번호가 일치하지 않습니다."
    );
  };
  const checkDuplicateId = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/checkDuplicateId`,
        {
          userId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.isDuplicate) {
        alert("이미 사용 중인 아이디입니다.");
        setIsUserIdValid(false);
      } else {
        setIsUserIdValid(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CommonTop pageName="Gaga 회원정보수정"/>
      <Grid container component="main" sx={{ height: "100vh",display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", }}>
        <CssBaseline />
        <Box component="form" noValidate sx={{ width: "80%", mt: 3}}>
          <TextField
            label="아이디 이메일형식"
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="userId"
            name="userId"
            type="email"
            value={userId}
            onChange={handleEmailChange}
            onBlur={checkDuplicateId}
            error={!!emailError}
            helperText={emailError}
            autoComplete="email"
            autoFocus
            disabled
          />
          <TextField
            label="비밀번호"
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handlePasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            autoComplete="current-password"
          />
          <TextField
            label="비밀번호 확인"
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="passwordConfirm"
            name="passwordConfirm"
            type="password"
            value={passwordConfirm}
            onChange={handlePasswordConfirmChange}
            error={!!passwordConfirmError}
            helperText={passwordConfirmError}
            autoComplete="new-password"
          />
          <TextField
            label="회원실명"
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="userName"
            name="userName"
            type="text"
            value={userName}
            onChange={handleNameChange}
            autoComplete="userName"
            inputProps={{
              minLength: 2,
              maxLength: 6,
              pattern: "^[ㄱ-ㅎ가-힣]*$",
            }}
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="nickName"
            label="닉네임"
            name="nickName"
            value={nickName}
            onChange={handleNicknameChange}
            autoComplete="nickName"
            inputProps={{
              minLength: 2,
              maxLength: 16,
            }}
          />
          <UpdateUserDate birthday={birthday}/>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="gender"
            label="성별"
            name="gender"
            value={gender}
            onChange={handleGenderChange}
            autoComplete="gender"
            select 
            defaultValue={1}
          >
            <MenuItem value={1}>남자</MenuItem>
            <MenuItem value={2}>여자</MenuItem>
          </TextField>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            type="tel"
            id="phoneNo"
            label="핸드폰 번호"
            name="phoneNo"
            value={phoneNo}
            onChange={(e) => onChangeField("phoneNo", e)}
            defaultValue="010"
            inputProps={{
              maxLength: 11, 
              pattern: "[0-9]*", 
            }}
          />
          <Button
            variant="contained"
            onClick={handlePhoneAuthRequest}
            size="small"
          >
            코드 발송
          </Button>
          <TextField
            variant="outlined"
            margin="none"
            fullWidth
            id="phoneVerificationCode"
            label="핸드폰 인증 코드 입력"
            name="phoneVerificationCode"
            onChange={(e) => setPhoneVerificationCode(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handlePhoneVerification}
          >
            핸드폰 인증하기
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1, marginTop: 1 }}
            onClick={handleSubmit}
          >
            정보 수정 하기
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default UpdateUser;
