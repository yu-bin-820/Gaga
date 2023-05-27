import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { Navigate } from 'react-router';
import MainTop from '@layouts/common/MainTop';


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

const Login = () => {
  const [user, onChangeUser, setUser] = useInput({
    userId: '',
    password: '',
  });

  const [tel, setTel] = useState('');
  const [phoneAuthCode, setPhoneAuthCode] = useState('');
  const [phoneAuthVerified, setPhoneAuthVerified] = useState(false);

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          userId: user.userId,
          password: user.password,
        };

        const response = await axios
          .post(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
            data,
            { withCredentials: true }
          )
          .then((response) => {
            console.log(response);
            mutateMe();
          });
      } catch (error) {
        console.error(error);
      }
    },
    [user, mutateMe]
  );

  const handleNaverLogin = () => {
    window.location.href =
      'https://nid.naver.com/oauth2.0/authorize?client_id=FzMGbETEgw2xNeSUlIIF&response_type=code&redirect_uri=http://192.168.0.159:8080/rest/user/naverLogin&state=test';
  };

  const handleKakaoLogin = () => {
    window.location.href =
      'https://kauth.kakao.com/oauth/authorize?client_id=5d88ee6131a76417bcf8e0d0dc852d91&scope=profile_nickname,profile_image,account_email&redirect_uri=http://192.168.0.159:8080/rest/user/kakaoLogin&response_type=code';
  };

  const handlePhoneAuthRequest = async () => {
    try {
      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuth`,
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
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneAuthOk`,
        phoneAuthCode,
        { withCredentials: true }
      );

      if (response.data) {
        // 인증 성공한 경우 처리
        console.log(phoneAuthCode);
        setPhoneAuthVerified(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (myData === undefined) {
    return <div>로딩중</div>;
  }
  if (myData.userId !== undefined && myData.userId !== null) {
    console.log(myData);
    return <Navigate replace to="/" />;
  }
  return (
    <>
      <MainTop />
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              'url(https://as1.ftcdn.net/v2/jpg/05/30/81/30/1000_F_530813029_XMXEvLZr5K4ntqqDgJzwxhbgO7W2ShiB.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light'
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color={'primary'}>
              Log In
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="userId"
                label="Your ID"
                name="userId"
                autoFocus
                value={user.userId}
                onChange={onChangeUser}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={onChangeUser}
              />
              {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
              <Typography variant="overline" color="secondary"></Typography>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, marginTop: 1 }}
              >
                Sign In
              </Button>
              <Button component={Link} to="/user/adduser">
                회원가입
              </Button><br/>
              <a
                href="https://nid.naver.com/oauth2.0/authorize?client_id=FzMGbETEgw2xNeSUlIIF&response_type=code&redirect_uri=http://192.168.0.159:8080/rest/user/naverLogin&state=test"
                onClick={handleNaverLogin}
              >
                <img
                  height="50"
                  src="http://static.nid.naver.com/oauth/small_g_in.PNG"
                  alt="네이버 로그인"
                />
              </a>
              <br />

              <a
                href="https://kauth.kakao.com/oauth/authorize?client_id=5d88ee6131a76417bcf8e0d0dc852d91&scope=profile_nickname,profile_image,account_email&redirect_uri=http://192.168.0.159:8080/rest/user/kakaoLogin&response_type=code"
                onClick={handleKakaoLogin}
              >
                <img
                  className="btn-img"
                  src="/images/kakao_login_medium_narrow.png"
                  alt="카카오 로그인"
                />
              </a>
              <br />
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
              <Grid container>
                <Grid item>
                  <Typography
                    component={Link}
                    to="/users/signup"
                    color={'Green'}
                  >
                    {'회원이 아니신가요? '}
                  </Typography>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
