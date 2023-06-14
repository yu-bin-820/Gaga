import useInput from "@hooks/common/useInput";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Navigate } from "react-router";
import MainTop from "@layouts/common/MainTop";
import UpdaeteUser from "@pages/user/UpdateUser";

import Avatar from "@mui/material/Avatar";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import CssBaseline from "@mui/material/CssBaseline";

import Paper from "@mui/material/Paper";

import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";

import { Link } from "react-router-dom";

import { Backdrop } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Typography component={Link} to="/" color={"Green"}>
        GAGA
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const Login = () => {
  const [user, onChangeUser, setUser] = useInput({
    userId: "",
    password: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showAlert = (message) => {
    setMessage(message);
    setOpen(true);
  };

  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleKeyDown = (event) => {
    if (event.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      if (!user.userId) {
        showAlert("아이디를 입력해주세요");
        return;
      }

      if (!user.password) {
        showAlert("비밀번호를 입력해주세요");
        return;
      }
      try {
        const data = {
          userId: user.userId,
          password: user.password,
        };
        console.log(data);

        const response = await axios
          .post(`${import.meta.env.VITE_SPRING_HOST}/rest/user/login`, data, {
            withCredentials: true,
          })
          .then((response) => {
            console.log(response);
            if (response.data.userId == null) {
              showAlert("아이디를 확인해 주세요.");
            } else if (response.data.userId === "invalid_password") {
              showAlert("비밀번호를 확인해 주세요.");
            }
            // } else if (response.data.password !== user.password) {
            //   showAlert("비밀번호를 확인해 주세요.");
            // } 
            else if (
              "blacklist" in response.data &&
              (response.data.blacklist === 1 || response.data.blacklist === 2)
            ) {
              showAlert("블랙리스트 회원입니다.");
              return;
            } else if (
              "outDay" in response.data &&
              response.data.outDay != null
            ) {
              showAlert("탈퇴한 회원입니다 회원가입해주세요.");
              return;
            } else {
              mutateMe();
            }
          });
      } catch (error) {
        console.error(error);
  
        if (error.response && error.response.status === 401) {
          showAlert("비밀번호를 확인해 주세요.");
        } else {
          showAlert("오류가 발생했습니다.");
        }
      }
    },
    [user, mutateMe]
  );

  const handleNaverLogin = () => {
    window.location.href =
  
    `https://nid.naver.com/oauth2.0/authorize?client_id=FzMGbETEgw2xNeSUlIIF&response_type=code&redirect_uri=${import.meta.env.VITE_SPRING_HOST}/rest/user/naverLogin&state=test`;
  };

  const handleKakaoLogin = () => {
    window.location.href =
      `https://kauth.kakao.com/oauth/authorize?client_id=5d88ee6131a76417bcf8e0d0dc852d91&scope=profile_nickname,profile_image,account_email&redirect_uri=${import.meta.env.VITE_SPRING_HOST}/rest/user/kakaoLogin&response_type=code`;
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
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
      <MainTop />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://as1.ftcdn.net/v2/jpg/05/30/81/30/1000_F_530813029_XMXEvLZr5K4ntqqDgJzwxhbgO7W2ShiB.jpg)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5" color={"primary"}>
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
                label="아이디"
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
                label="비밀번호"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.password}
                onChange={onChangeUser}
                error={isCapsLockOn}
                helperText={isCapsLockOn ? 'Caps Lock이 켜져 있습니다.' : ''}
                onKeyDown={handleKeyDown}
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

              <Button
                fullWidth
                sx={{ mt: 1, mb: 0, height: "50px" }} // height를 원하는 크기로 조절
                onClick={handleNaverLogin}
              >
                <img
                  height="50"
                  src="/images/naver_login.png"
                  alt="네이버 로그인"
                />
              </Button>
              <br />

              <Button
                fullWidth
                sx={{ mt: 1, mb: 2, height: "50px" }}
                onClick={handleKakaoLogin}
              >
                <img
                  height="46.9"
                  className="btn-img"
                  src="/images/kakao_login_medium_narrow.png"
                  alt="카카오 로그인"
                />
              </Button>

              
                
                  <Typography
                    component={Link}
                    to="/user/adduser"
                    color={"Green"}
                  >
                    {"회원이 아니신가요? "}
                  </Typography>
              <Grid container mt={1}>
                <Grid item xs>
                  <Typography
                    component={Link}
                    to="/user/findid"
                    color={"Green"}
                  >
                    {"아이디찾기"}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    component={Link}
                    to="/user/findpassword"
                    color={"Green"}
                  >

                    {"비밀번호찾기"}
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
