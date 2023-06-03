import useInput from "@hooks/common/useInput";
import { Box } from "@mui/system";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState } from "react";
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
  TextField,
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
          <FormControlLabel control={<Checkbox />} label="동의" />
          <Button onClick={handleOpenTerms}>이용약관 상세보기</Button>

          {openTerms && <TermsOfGaga onClose={handleCloseTerms} />}
          
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
            id="phoneNo"
            label="핸드폰 번호"
            name="phoneNo"
            autoComplete="phoneNo"
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, marginTop: 1 }}
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
