import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fetcher from "@utils/fetcher";
import MainTop from "@layouts/common/MainTop";
import UserLogout from "@layouts/user/UserLogout";
import CommonTop from "@layouts/common/CommonTop";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Grid,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import TermsOfGaga from "./TermsOfGaga";
import Modal from "@mui/material/Modal";
import CssBaseline from "@mui/material/CssBaseline";
import { useNavigate } from "react-router";
import Alert from "@mui/material/Alert";

function AddNaverUser() {
  const [user, setUser] = useState({
    userId: "",
    password: "",
    userName: "",
    birthday: "",
    gender: 1,
    nickName: "",
    phoneNo: "",
  });
  const navigate = useNavigate();
  const [agreeTerms, setAgreeTerms] = useState(false);
  const handleAgreeTermsChange = (event) => {
    setAgreeTerms(event.target.checked);
  };

  const [openTerms, setOpenTerms] = useState(false);

  const handleOpenTerms = () => {
    setOpenTerms(true);
  };

  const handleCloseTerms = () => {
    setOpenTerms(false);
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  console.log("swr로 가져온 유저정보" + myData);

  useEffect(() => {
    if (myData) {
      setUser(myData);
    }
  }, [myData]);

  // 서버에 GET 요청하여 유저 정보를 가져오는 함수
  const getUserInfo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/userid/${myData.userId}`
      );
      const data = await response.json();
      setUser(data);
      mutate(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/userid/${myData.userId}`,
        data
      ); // 캐시 갱신을 위해 mutate 함수 호출
    } catch (error) {
      console.log(error);
    }
  };
  // 유저 정보 업데이트 함수
  const addNaverUser = async () => {
    console.log("addNaverUser 함수 실행" + JSON.stringify(user));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
        {
          method: "POST", // PUT 요청
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user), // 유저 정보를 JSON 형태로 변환
        }
      );

      if (!response.ok) {
        throw new Error("서버 에러");
      }
      alert("회원가입이 완료되었습니다.");
      navigate("/user/login");
      const data = await response.json();
      setUser(data);
      mutate(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/userid/${myData.userId}`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const checkPasswordValidity = (password) => {
    // 비밀번호 유효성 검사: 최소 6 ~ 최대 14자리, 영문, 숫자, 특수문자 중 최소 1개 포함
    const passwordRegExp =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,14}$/;
    return passwordRegExp.test(password);
  };

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
    setPasswordValid(checkPasswordValidity(e.target.value));
  };

  const handlePasswordCheckChange = (e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== user.password);
  };

  return (
    <>
      <CommonTop pageName="네이버 회원가입" />
      <Grid
        container
        component="main"
        sx={{
          height: "90vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Box
          component="form"
          noValidate
          sx={{
            width: "80%",
            mt: 3,
            "& .MuiTextField-root:not(:last-child)": { marginBottom: "7px" },
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={agreeTerms}
                onChange={handleAgreeTermsChange} // 변경 처리 함수 연결
              />
            }
            label="약관 동의"
            value="termsOfGaga"
          />

          <Button onClick={handleOpenTerms}>이용약관 상세보기</Button>
          <Modal
            open={openTerms}
            onClose={handleCloseTerms}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: 400,
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                maxHeight: "90vh", // 뷰포트 높이의 90%를 최대 높이로 설정
                overflow: "auto", // 컨텐츠가 Box를 벗어나면 스크롤바 표시
              }}
            >
              <TermsOfGaga />
            </Box>
          </Modal>
          {openTerms && <TermsOfGaga onClose={handleCloseTerms} />}
          <Grid
            container
            alignItems="center"
            justify="space-between"
            sx={{ mt: 2 }}
          >
            <TextField
              label="아이디"
              variant="outlined"
              margin="none"
              required
              fullWidth
              value={user.userId}
              disabled
            />

            <TextField
              label="비밀번호"
              value={user.password}
              type="password"
              variant="outlined"
              margin="none"
              required
              fullWidth
              onChange={handlePasswordChange}
              error={!passwordValid}
              helperText={
                !passwordValid &&
                "비밀번호는 최소 6자 ~ 최대 14자리, 영문, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다."
              }
            />
            <TextField
              label="비밀번호 확인"
              value={passwordCheck}
              type="password"
              variant="outlined"
              margin="none"
              required
              fullWidth
              onChange={handlePasswordCheckChange}
              error={passwordError}
              helperText={passwordError && "비밀번호가 일치하지 않습니다."}
            />
            <TextField
              label="이름"
              variant="outlined"
              margin="none"
              required
              fullWidth
              value={user.userName}
              disabled
            />
            <TextField
              label="생년월일"
              variant="outlined"
              margin="none"
              required
              fullWidth
              value={user.birthday}
              disabled
            />
            <TextField
              label="성별"
              variant="outlined"
              margin="none"
              required
              fullWidth
              value={user.gender === 1 ? "남자" : "여자"}
              disabled
            />
            <TextField
              label="닉네임"
              variant="outlined"
              margin="none"
              required
              fullWidth
              value={user.nickName}
              onChange={(e) => setUser({ ...user, nickName: e.target.value })}
            />
            <TextField
              label="전화번호"
              variant="outlined"
              margin="none"
              required
              fullWidth
              value={user.phoneNo}
              disabled
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, marginTop: 1 }}
              onClick={addNaverUser}
              disabled={passwordError || !passwordValid || !agreeTerms}
            >
              네이버 회원가입
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
}

export default AddNaverUser;
