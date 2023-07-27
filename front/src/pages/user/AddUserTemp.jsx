import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router';
import MainTop from '@layouts/common/MainTop';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import { FormHelperText } from '@mui/material';

import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import { Backdrop } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Typography component={Link} to="/" color={'Green'}>
        GAGA
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const AddUser = () => {
  const [user, onChangeUser, setUser] = useInput({
    userId: '',
    password: '',
    userName: '',
    birthday: '',
    gender: '',
    nickName: '',
    phoneNo: '',
  });

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  const [emailError, setEmailError] = useState(false); // 이메일 에러 상태

  // 이메일 형식 검증 함수
  const checkEmail = (email) => {
    if (emailRegex.test(email)) {
      setEmailError(false);
      setEmailVerified(true); // 이메일 형식이 맞으면 이메일 인증 상태를 true로 설정
    } else {
      setEmailError(true);
      setEmailVerified(false); // 이메일 형식이 아니면 이메일 인증 상태를 false로 설정
    }
  };

  const [authCode, setAuthCode] = useState(''); // 서버에서 받아온 인증 코드
  const [userAuthCode, setUserAuthCode] = useState(''); // 사용자가 입력한 인증 코드
  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증이 완료되었는지 확인하는 상태

  const requestEmailAuth = useCallback(async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_SPRING_HOST}/rest/user/mailAuth`,
      { email: user.userId },
      { withCredentials: true }
    );

    if (response.data) {
      setAuthCode(response.data);
    }
  }, [user]);

  const handleChangeUser = (event) => {
    if (event.target.name === 'userId') {
      checkEmail(event.target.value); // 아이디(이메일) 값이 변경되었을 때, 이메일 형식 검증
    } else if (event.target.name === 'password') {
      checkPassword(event.target.value); // 비밀번호 값이 변경되었을 때, 비밀번호 형식 검증
    }
    // else if (event.target.name === 'birthday') {
    //   checkBirthday(event.target.value); // 생년월일 값이 변경되었을 때, 유효성 검사
    // }

    onChangeUser(event); // 기존 onChangeUser 함수 호출
  };
  // 사용자가 입력한 이메일 인증 코드를 확인하는 함수
  const handleAuthCodeChange = useCallback(
    (event) => {
      const newAuthCode = event.target.value;
      setUserAuthCode(newAuthCode);

      if (newAuthCode === authCode) {
        setIsEmailVerified(true);
      } else {
        setIsEmailVerified(false);
      }
    },
    [authCode]
  );

  // 비밀번호 형식 검증 함수
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;
  const [passwordError, setPasswordError] = useState(false); // 비밀번호 에러 상태

  const checkPassword = (password) => {
    if (passwordRegex.test(password)) {
      setPasswordError(false);
    } else {
      setPasswordError(true);
    }
  };

  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);

    if (event.target.value === user.password) {
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  const handleChangePhone = useCallback(
    (event) => {
      let { value } = event.target;
      const numberOnly = value.replace(/[^0-9]/g, ''); // 숫자만 입력되게 한다

      // 전화번호가 11자리를 초과하면 alert을 띄우고 아니면 그대로 진행
      if (numberOnly.length > 11) {
        alert('휴대폰 번호는 010으로 시작하는 11자리 숫자여야 합니다.');
        return;
      }

      setUser({ ...user, phoneNo: numberOnly }); // 수정된 부분
    },
    [user]
  );

  const [tel, setTel] = useState('');
  const [phoneAuthCode, setPhoneAuthCode] = useState('');
  const [phoneAuthVerified, setPhoneAuthVerified] = useState(false);

  const handlePhoneAuthRequest = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuth`,
        tel,
        { withCredentials: true }
      );

      if (response.data) {
        // 이미 가입된 번호인 경우 처리
        setPhoneAuthVerified(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePhoneAuthVerify = async () => {
    try {
      const data = {
        code: phoneAuthCode,
      };
      console.log(phoneAuthCode);
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuthOk`,
        phoneAuthCode,
        { withCredentials: true }
      );

      if (response.data) {
        // 인증 성공한 경우 처리
        console.log(phoneAuthCode);
        setPhoneAuthVerified(true);
        setPhoneVerified(true); // 핸드폰 인증이 완료되었음을 나타내는 상태를 true로 설정
      }
    } catch (error) {
      console.error(error);
    }
  };

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);

  const [registerSuccess, setRegisterSuccess] = useState(false);

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
    fetcher
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (
        Object.values(user).some((value) => value === '') ||
        !emailVerified ||
        !phoneVerified
      ) {
        alert('모든 정보를 입력하고, 이메일과 전화번호 인증을 완료해주세요.');
        return;
      }

      try {
        const data = {
          userId: user.userId,
          password: user.password,
          userName: user.userName,
          birthday: dayjs(user.birthday).format('YYYY-MM-DD'), // dayjs로 변환
          gender: user.gender,
          nickName: user.nickName,
          phoneNo: user.phoneNo,
        };

        const response = await axios
          .post(`${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`, data, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            mutateMe();
            setRegisterSuccess(true); // 회원가입 성공 표시
          });
      } catch (error) {
        console.error(error);
      }
    },
    [user, mutateMe, emailVerified, phoneVerified]
  );

  return (
    <>
      <MainTop />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        {/* 본문내용 생략 */}
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ width: '50%', mt: 8, ml: 10 }}
        >
          {/* 폼 내용 생략 */}
          <TextField
            variant="outlined"
            margin="normal"
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
          />
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
                    margin="normal"
                    fullWidth
                    id="authCode"
                    label="인증 코드"
                    name="authCode"
                    value={userAuthCode}
                    onChange={handleAuthCodeChange}
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
            margin="normal"
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
              margin="normal"
              required
              fullWidth
              id="passwordConfirm"
              label="비밀번호 확인"
              name="passwordConfirm"
              type="password"
              autoComplete="passwordConfirm"
              value={passwordConfirm}
              onChange={handleChangePasswordConfirm}
              error={!passwordMatch && passwordConfirm !== ''} // 입력한 값이 비밀번호와 불일치하면 오류 표시
            />
          )}
          {!passwordMatch && passwordConfirm !== '' && (
            <FormHelperText error>비밀번호가 일치하지 않습니다.</FormHelperText>
          )}
          <TextField
            variant="outlined"
            margin="normal"
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
            margin="normal"
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
            margin="normal"
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
              pattern: '[0-9]*', // 숫자만 입력 가능
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
            label="전화번호"
            name="tel"
            onChange={(e) => setTel(e.target.value)}
            required
            value={tel}
          />
          <Button onClick={handlePhoneAuthRequest}>인증 요청</Button>
          <br />
          <br />
          {phoneAuthVerified ? (
            <div>인증 완료</div>
          ) : (
            <>
              <TextField
                label="인증번호"
                value={phoneAuthCode}
                onChange={(e) => setPhoneAuthCode(e.target.value)}
              />
              <Button onClick={handlePhoneAuthVerify}>인증 확인</Button>
            </>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, marginTop: 1 }}
          >
            회원가입
          </Button>
          {registerSuccess && <Navigate to="/" />}{' '}
          {/* 원하는 경로로 변경해주세요. */}
        </Box>
      </Grid>
    </>
  );
};

export default AddUser;
