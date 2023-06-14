import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState, useEffect } from "react";
import dayjs from "dayjs";
import MenuItem from "@mui/material/MenuItem";
import {
  Button,
  Grid,
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Modal,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import CommonTop from "@layouts/common/CommonTop";
import { useNavigate } from "react-router";
import AddKakaoUserDate from "@components/user/AddKakaoUserDate";
import useKakaoFormStore from "@hooks/user/useKakaoFormStore";
import TermsOfGaga from "./TermsOfGaga";
import AddKakaoTop from "@layouts/user/AddKakaoTop";

const AddKakaoUser = () => {
  const {
    userId,
    password,
    userName,
    birthday,
    gender = 1,
    nickName,
    phoneNo,
    setField,
    onChangeField,
    reset,
  } = useKakaoFormStore();

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);
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
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/snsLogin`,
    fetcher
  );
  useEffect(() => {
    if (myData) {
      setField("userId", myData.userId);
      setField("password", myData.password);
      setField("userName", myData.userName);
      setField("birthday", dayjs(myData.birthday).format("1990-06-06"));
      setField("gender", myData.gender);
      setField("nickName", myData.nickName);
      setField("phoneNo", myData.phoneNo);
    }
    // return () => {
    //   reset();
    // }
  }, [myData]);
  console.dir(myData);
  console.log(birthday);

  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();
    console.log("요청할때정보는?" + birthday);

    let filterMinAge = 14;
    let filterMaxAge = 100;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
        {
          userId,
          password,
          userName,
          birthday: dayjs(birthday).format("YYYY-MM-DD"),
          gender,
          nickName,
          phoneNo,
          filterMinAge,
          filterMaxAge,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("요청할때정보는?" + birthday);
      console.log("요청할때정보는?" + nickName);
      console.log("요청할때정보는?" + dayjs(birthday).format("YYYY-MM-DD"));
      alert("카카오 회원가입 완료되었습니다.");
      navigate("/");
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }, [userId, password, userName, birthday, gender, nickName, phoneNo]);

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
  const [phoneAuthCodeSent, setPhoneAuthCodeSent] = useState(false);

  const handlePhoneAuthRequest = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneno/${phoneNo}`
      );

      if (response.data) {
        alert("이미 가입된 핸드폰 번호입니다.");
      } else {
        // 핸드폰 인증 코드를 발송하는 부분은 이곳으로 옮깁니다.
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
        setPhoneAuthCodeSent(true);
      }
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
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;
    return re.test(password);
  }

  const [passwordError, setPasswordError] = useState("");
  const handlePasswordChange = (e) => {
    onChangeField("password", e);
    const isValid = isValidPassword(e.target.value);
    setPasswordError(
      isValid ? "" : "영문 숫자 특수문자조합 8~14자리 이내로 입력해주세요."
    );
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
      <CommonTop pageName="카카오 회원가입" />
      <Grid
        container
        component="main"
        sx={{
          marginTop: "65px",
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
              inputProps={{
                maxLength: 14, // 최대 입력 가능한 문자 수를 14개로 제한
              }}
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
              inputProps={{
                maxLength: 14, // 최대 입력 가능한 문자 수를 14개로 제한
              }}
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
            <AddKakaoUserDate />
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
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="space-between"
            >
              <Grid item xs={9} sm={8}>
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
                    maxLength: 11, // 최대 11글자
                    pattern: "[0-9]*", // 숫자만 입력 가능
                  }}
                />
              </Grid>
              <Grid item xs={3} sm={4}>
                <Button
                  variant="contained"
                  onClick={handlePhoneAuthRequest}
                  size="small"
                  fullWidth
                  style={{
                    height: "45px",
                    width: "50px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                  }}
                >
                  코드
                  <br />
                  발송
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justify="space-between"
            >
              <Grid item xs={9} sm={8}>
                <TextField
                  variant="outlined"
                  margin="none"
                  fullWidth
                  id="phoneVerificationCode"
                  label="핸드폰 인증 코드 입력"
                  name="phoneVerificationCode"
                  onChange={(e) => setPhoneVerificationCode(e.target.value)}
                />
              </Grid>
              <Grid item xs={3} sm={4}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={handlePhoneVerification}
                  fullWidth
                  disabled={!phoneAuthCodeSent}
                  style={{
                    height: "45px",
                    width: "50px",
                    fontSize: "0.7rem",
                    fontWeight: "bold",
                  }}
                >
                  핸드폰 인증
                </Button>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 1, mb: 1, marginTop: 1 }}
              onClick={handleSubmit}
              disabled={
                passwordError ||
                passwordConfirmError ||
                password !== passwordConfirm ||
                !agreeTerms ||
                !phoneVerified
              }
            >
              카카오 회원가입
            </Button>
          </Grid>
        </Box>
      </Grid>
    </>
  );
};

export default AddKakaoUser;
