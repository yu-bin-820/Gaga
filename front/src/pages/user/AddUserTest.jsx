import useInput from "@hooks/common/useInput";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState } from "react";
import { Navigate } from "react-router";
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

const AddUserTest = () => {
  const [user, onChangeUser, setUser] = useInput({
    userId: "",
    password: "",
    userName: "",
    birthday: "",
    gender: "",
    nickName: "",
    phoneNo: "",
  });

  const handleChangeUser = (event) => {
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

    [user, mutateMe]
  );


  return (
    <>
      <CommonTop />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box
          component="form"
          noValidate
          sx={{ width: "50%", mt: 8, ml: 10 }}
        >
          <FormControlLabel
            control={
              <Checkbox/>
            }
            label={<Button>이용약관</Button>}
          />
          <SwipeableDrawer
            anchor="right"
            onClose={() => {}}
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
          />
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
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="userName"
            label="회원실명"
            name="userName"
            autoComplete="userName"
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
            inputProps={{
              maxLength: 11, // 최대 11글자 
              pattern: "[0-9]*", // 숫자만 입력 가능
            }}
          />
          <Button variant="contained">
            인증 요청
          </Button>
          <TextField
            variant="outlined"
            margin="none"
            fullWidth
            id="phoneAuthCode"
            label="핸드폰 인증 코드"
            name="phoneAuthCode"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, marginTop: 1 }}
          >
            회원가입
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default AddUserTest;