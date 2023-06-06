import useInput from "@hooks/common/useInput";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState } from "react";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import { FormHelperText } from "@mui/material";
import {
  Button, Grid, Backdrop,
  Divider, Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  Typography,
  TextField,
  Checkbox,
  FormControlLabel
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import CommonTop from "@layouts/common/CommonTop";
import TermsOfGaga from "./TermsOfGaga";
import useUserFormStore from "@hooks/user/useUserFormStore";
import { useNavigate } from "react-router";
import AddUserDate from "@components/user/AddUserDate";

const AddUserTest = () => {
  const {
    userId,
    password,
    userName,
    birthday,
    gender,
    nickName,
    phoneNo,
    reset,
  } = useUserFormStore();

  const [openTerms, setOpenTerms] = useState(false);

  const handleOpenTerms = () => {
    setOpenTerms(true);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
    fetcher
  );
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

      console.log(dayjs(birthday).format("YYYY-MM-DD"));

      const response = await axios.post(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
        formData
      );

      reset();

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [userId, password, userName, birthday, gender, nickName, phoneNo]);

  return (
    <>
      <CommonTop />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box component="form" noValidate sx={{ width: "50%", mt: 8, ml: 10 }}>
          <FormControlLabel control={<Checkbox />} label="약관 동의" value="termsOfGaga"/>
          
          <Button onClick={handleOpenTerms}>이용약관 상세보기</Button>
          {openTerms && <TermsOfGaga onClose={handleCloseTerms} />}

          <TextField
            label="아이디 이메일형식"
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="userId"
            name="userId"
            type="email"
            autoComplete="email"
            autoFocus
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
            autoComplete="current-password"
          />
          <TextField
            label="비밀번호 확인"
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="password1"
            name="password1"
            type="password"
            autoComplete="current-password"
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
            autoComplete="userName"
            inputProps={{
              minLength: 2, // 최소 2글자
              maxLength: 6, // 최대 6글자
              pattern: "^[ㄱ-ㅎ가-힣]*$", // 한글만 입력 가능한 정규식 패턴
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
            autoComplete="nickName"
            inputProps={{
              minLength: 2, // 최소 2글자
              maxLength: 16, // 최대 16글자
            }}
          />
          <AddUserDate />
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
            defaultValue="010"
            inputProps={{
              maxLength: 11, // 최대 11글자
              pattern: "[0-9]*", // 숫자만 입력 가능
            }}
          />
          <Button variant="contained">인증 요청</Button>
          <TextField
            variant="outlined"
            margin="none"
            fullWidth
            id="phoneAuthCode"
            label="핸드폰 인증 코드"
            name="phoneAuthCode"
          />
          <Button></Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1, marginTop: 1 }}
            onClick={handleSubmit}
          >
            회원가입
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default AddUserTest;
