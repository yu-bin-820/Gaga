import useInput from "@hooks/common/useInput";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Navigate } from "react-router";
import MainTop from "@layouts/common/MainTop";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import {
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
  TextField
} from "@mui/material";
import Avatar from "@mui/material/Avatar";

import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";


import { Link } from "react-router-dom";

import { Backdrop } from "@mui/material";
import { Checkbox, FormControlLabel } from "@mui/material";
import CommonTop from "@layouts/common/CommonTop";
import TermsOfGaga from "./TermsOfGaga";

const AddUser = () => {
  const [user, onChangeUser, setUser] = useInput({
    userId: "",
    password: "",
    userName: "",
    birthday: "",
    gender: "",
    nickName: "",
    phoneNo: "",
  });

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/; //이메일 형식 검증 정규식
  const [emailAuthCode, setemailAuthCode] = useState(""); // 서버에서 받아온 인증 코드
  const [userEmailAuthCode, setUserEmailAuthCode] = useState(""); // 사용자가 입력한 이메일 인증 코드
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증이 완료되었는지 확인하는 상태
  const [emailError, setEmailError] = useState(false); // 이메일 에러 상태
  const [isEmailAuthSent, setIsEmailAuthSent] = useState(false); // 이메일 인증 요청이 전송되었는지 상태

  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/; //비밀번호 형식 검증 정규식
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 에러 상태
  const [passwordConfirm, setPasswordConfirm] = useState(""); //  비밀번호 확인 값
  const [passwordMatch, setPasswordMatch] = useState(false); // 비밀번호 일치 여부 상태

  const [userPhoneAuthCode, setUserPhoneAuthCode] = useState(""); // 사용자가 입력한 핸드폰 인증 코드
  const [phoneAuthVerified, setPhoneAuthVerified] = useState(false); // 핸드폰 인증이 완료되었는지 확인하는 상태

  const [termsAgreed, setTermsAgreed] = useState(false); // 약관 동의 여부 상태
  const [isTermsDrawerOpen, setIsTermsDrawerOpen] = useState(false); // 약관 드로어 오픈 여부 상태
  const toggleTermsDrawer = () => {
    setIsTermsDrawerOpen(!isTermsDrawerOpen);
  };  // 약관 드로어 오픈 여부 상태 변경 함수

  // const [autocompleteResults, setAutocompleteResults] = useState([]);//오토컴플릿 회원아이디 검색 결과
  // const [searchValue, setSearchValue] = useState("");//오토컴플릿 회원아이디 검색 값

  const [registerSuccess, setRegisterSuccess] = useState(false); // 회원가입 성공 여부 상태

  const handleChangeUser = (event) => {
    if (event.target.name === "userId") {
      checkEmailRegex(event.target.value); // 아이디(이메일) 값이 변경되었을 때, 이메일 형식 검증
      // handleSearchChange(event);  // handleSearchChange 호출 추가
    } else if (event.target.name === "password") {
      checkPassword(event.target.value); // 비밀번호 값이 변경되었을 때, 비밀번호 형식 검증
    }
    const { name, value } = event.target;
    const numberRegex = /^[0-9]*$/; // 숫자만 허용하는 정규식
    if (name === "phoneNo" || name === "birthday") {
      if (!numberRegex.test(value)) {
        // 입력 값이 정규식과 맞지 않을 때
        return; // 아무 것도 하지 않음
      }
    }
    onChangeUser(event); // 기존 onChangeUser 함수 호출
  };
  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
    fetcher
  );

  const checkDuplicateId = async () => {
    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/checkDuplicateId`,
        { userId: user.userId },
        { withCredentials: true }
      );
      return response.data.isDuplicate;
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!user.userId && !user.password && !user.userName && !user.birthday && !user.gender && !user.nickName && !user.phoneNo) {
        return;
      }
      console.log("User data:", user);
      console.log("Email verification status:", isEmailVerified);
      if (!isEmailVerified) {
        alert("이메일 인증이 완료되지 않았습니다. 이메일 인증을 완료해주세요.");
        return;
      }
      if (user.userName === "") {
        alert("회원실명을 입력해주세요.");
        return;
      }
      if (user.nickName === "") {
        alert("닉네임을 입력해주세요.");
        return;
      }
      if (user.birthday === "") {
        alert("생년월일을 입력해주세요.");
        return;
      }
      if (user.gender === "") {
        alert("성별을 선택해주세요.");
        return;
      }
      if (user.phoneNo === "") {
        alert("핸드폰 번호를 입력해주세요.");
        return;
      }

      const isDuplicate = await checkDuplicateId();
      if (isDuplicate) {
        alert("중복된 아이디입니다.");
        return;
      }
      try {
        const data = {
          userId: user.userId,
          password: user.password,
          userName: user.userName,
          birthday: dayjs(user.birthday).format("YYYY-MM-DD"), // dayjs로 변환
          gender: user.gender,
          nickName: user.nickName,
          phoneNo: user.phoneNo,
        };
        console.log("data:", data);
        const response = await axios
          .post(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
            data,
            { withCredentials: true }
          )
          .then((response) => {
            console.log(response);
            mutateMe();
            setRegisterSuccess(true); // 회원가입 성공 표시
            alert("회원가입이 완료되었습니다.");
          });
      } catch (error) {
        console.error(error);
      }
    },
    [user, mutateMe, isEmailVerified]
  );

  const requestEmailAuth = useCallback(async () => {
    const response = await axios.post(
      `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/mailAuth`,
      { email: user.userId },
      { withCredentials: true }
    );

    if (response.data) {
      setemailAuthCode(response.data);
      setIsEmailAuthSent(true); // 인증 요청 전송 후 이메일 입력란 비활성화
    }
  }, [user]);

  // 이메일 형식 검증 함수
  const checkEmailRegex = (email) => {
    if (emailRegex.test(email)) {
      setEmailError(false);
    } else {
      setEmailError(true);
    }
  };

  // 사용자가 입력한 이메일 인증 코드를 확인하는 함수
  const handlVeverifyEmailCode = useCallback(
    (event) => {
      const newAuthCode = event.target.value;
      setUserEmailAuthCode(newAuthCode);
      console.log(emailAuthCode);
      if (newAuthCode === emailAuthCode) {
        setIsEmailVerified(true);
      } else {
        setIsEmailVerified(false);
      }
    },
    [emailAuthCode]
  );

  //비밀번호 관련 함수
  const checkPassword = (password) => {
    if (passwordRegex.test(password)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };
  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);

    if (event.target.value === user.password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const requestPhoneAuth = useCallback(async () => {
    const numberRegex = /^[0-9]*$/; // 숫자만 허용하는 정규식
    const phoneNoLength = user.phoneNo.length;

    if (!numberRegex.test(user.phoneNo) || phoneNoLength !== 11) {
      // 숫자가 아니거나 11자리가 아닐 때
      alert("유효한 핸드폰 번호를 입력해주세요.");
      return; // 함수 종료
    }
    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuth`,
        { userPhoneNo: user.phoneNo },
        { withCredentials: true }
      );

      console.log(response);
      if (response.data) {
        alert("이미 가입된 번호입니다.");
      } else {
        alert("인증번호가 발송되었습니다. 확인해주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("핸드폰 인증 요청 중 오류가 발생했습니다.");
    }
  }, [user.phoneNo]);

  const handleVerifyPhoneCode = useCallback((event) => {
    setUserPhoneAuthCode(event.target.value);
  }, []);


  return (
    <>
      <CommonTop />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: "50%", mt: 8, ml: 10 }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={termsAgreed}
                onChange={(event) => setTermsAgreed(event.target.checked)}
              />
            }
            label={<Button onClick={toggleTermsDrawer}>이용약관</Button>}
          />
          <SwipeableDrawer
            anchor="right"
            open={isTermsDrawerOpen}
            onClose={toggleTermsDrawer}
            onOpen={() => {}}
          > 이용약관 상세보기
            <TermsOfGaga />
          </SwipeableDrawer>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="userId"
            label="아이디"
            name="userId"
            autoComplete="userId"
            autoFocus
            value={user.userId}
            onChange={handleChangeUser}
            error={emailError} // 이메일 형식 오류 시 오류 표시
            disabled={isEmailAuthSent} // 인증 요청이 전송되면 이메일 입력란 비활성화
          />
          {/* {autocompleteResults.map((result, index) => (
            <p key={index}>{result.userId}</p> // or whatever property of the user you want to display
          ))} */}
          {emailError && (
            <FormHelperText error>이메일 형식이 아닙니다.</FormHelperText>
          )}
          {!emailError && (
            <>
              {!isEmailVerified ? (
                <>
                  <Button onClick={requestEmailAuth} variant="contained">
                    인증 요청
                  </Button>
                  <TextField
                    variant="outlined"
                    margin="none"
                    fullWidth
                    id="authCode"
                    label="인증 코드"
                    name="authCode"
                    value={userEmailAuthCode}
                    onChange={handlVeverifyEmailCode}
                  />
                </>
              ) : (
                <Typography variant="subtitle1" color="primary">
                  이메일이 인증되었습니다.
                </Typography>
              )}
            </>
          )}
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="password"
            label="비밀번호"
            name="password"
            type="password"
            autoComplete="current-password"
            value={user.password}
            onChange={handleChangeUser}
            error={passwordError} // 비밀번호 형식 오류 시 오류 표시
          />
          {passwordError && (
            <FormHelperText error>
              비밀번호는 8~14글자이며, 영문, 숫자, 특수문자 조합이어야 합니다.
            </FormHelperText>
          )}
          {!passwordMatch && (
            <TextField
              variant="outlined"
              margin="none"
              required
              fullWidth
              id="passwordConfirm"
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              autoComplete="passwordConfirm"
              value={passwordConfirm}
              onChange={handleChangePasswordConfirm}
              error={!passwordMatch && passwordConfirm !== ""} // 입력한 값이 비밀번호와 불일치하면 오류 표시
            />
          )}
          {!passwordMatch && passwordConfirm !== "" && (
            <FormHelperText error>비밀번호가 일치하지 않습니다.</FormHelperText>
          )}
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="userName"
            label="회원실명"
            name="userName"
            autoComplete="userName"
            value={user.userName}
            onChange={onChangeUser}
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="nickName"
            label="닉네임"
            name="nickName"
            autoComplete="nickName"
            value={user.nickName}
            onChange={onChangeUser}
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="birthday"
            label="생년월일"
            name="birthday"
            autoComplete="birthday"
            value={user.birthday}
            onChange={handleChangeUser}
            inputProps={{
              maxLength: 8, // 최대 8글자 (YYYYMMDD)
              pattern: "[0-9]*", // 숫자만 입력 가능
            }}
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="gender"
            label="성별"
            name="gender"
            autoComplete="gender"
            value={user.gender}
            onChange={onChangeUser}
            select // select 속성 추가
          >
            <MenuItem value={1}>남자</MenuItem>
            <MenuItem value={2}>여자</MenuItem>
          </TextField>
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="phoneNo"
            label="핸드폰 번호"
            name="phoneNo"
            autoComplete="phoneNo"
            value={user.phoneNo}
            onChange={handleChangeUser}
            inputProps={{
              maxLength: 11, // 최대 8글자 (YYYYMMDD)
              pattern: "[0-9]*", // 숫자만 입력 가능
            }}
          />
          <Button onClick={requestPhoneAuth} variant="contained">
            인증 요청
          </Button>
          <TextField
            variant="outlined"
            margin="none"
            fullWidth
            id="phoneAuthCode"
            label="핸드폰 인증 코드"
            name="phoneAuthCode"
            value={userPhoneAuthCode}
            onChange={handleVerifyPhoneCode}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, marginTop: 1 }}
            onClick={(event) => {
              // 이용약관 동의 체크 여부 확인
              if (!termsAgreed) {
                event.preventDefault();
                alert("이용약관에 동의해주세요.");
              }
            }}
          >
            회원가입
          </Button>
          {registerSuccess && <Navigate to="/" />}{" "}
          {/* 원하는 경로로 변경해주세요. */}
        </Box>
      </Grid>
    </>
  );
};

export default AddUser;
