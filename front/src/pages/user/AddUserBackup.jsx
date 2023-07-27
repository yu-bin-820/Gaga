import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import React, { useCallback, useState } from "react";
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
import TermsOfGaga from "./TermsOfGaga";
import useUserFormStore from "@hooks/user/useUserFormStore";
import { useNavigate } from "react-router";
import AddUserDate from "@components/user/AddUserDate";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";
import 'dayjs/locale/ko';

const AddUser = () => {
  const {
    userId,
    password,
    userName,
    birthday,
    gender,
    nickName,
    phoneNo,
    setField,
    onChangeField,
    reset,
  } = useUserFormStore();

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
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
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
    fetcher
  );
  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();
    let filterMinAge = 14;
    let filterMaxAge = 100;
    if (!isUserIdValid) {
      alert("중복된 아이디입니다. 기존 아이디로 로그인해주세요.");
      // navigate("/user/findid");
      reset();
      return;
    }
        // 현재 날짜와 생년월일의 차이(나이)를 계산합니다.
        const age = dayjs().diff(dayjs(birthday), "year");

        // 나이가 14세 미만인 경우 가입을 제한합니다.
        if (age < 14) {
          alert("14세 미만은 가입할 수 없습니다.");
          return;
        }
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("password", password);
      formData.append("userName", userName);
      formData.append("birthday", dayjs(birthday).format("YYYY-MM-DD"));
      formData.append("gender", gender);
      formData.append("nickName", nickName);
      formData.append("phoneNo", phoneNo);

      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
        {
          userId: userId,
          password: password,
          userName: userName,
          birthday: dayjs(birthday).format("YYYY-MM-DD"),
          gender: gender,
          nickName: nickName,
          phoneNo: phoneNo,
          filterMaxAge: filterMaxAge,
          filterMinAge: filterMinAge,
          
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // 회원가입이 성공적으로 완료되면, 메시지를 출력합니다.
      if (response.data) {
        alert("회원가입이 완료되었습니다!");
      }

      reset();

      navigate("/");

      console.log(response.data);
    } catch (error) {
      console.error(error);
      alert("회원가입에 실패했습니다. 다시 시도해 주세요."); // 에러 발생 시 메시지 출력
    }
  }, [
    userId,
    password,
    userName,
    birthday,
    gender,
    nickName,
    phoneNo,
    isUserIdValid,
  ]);

  // 이메일 형식 검증 부분
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
  //이메일 인증 부분
  const [emailAuthCode, setEmailAuthCode] = useState(null);
  const [emailVerificationCode, setEmailVerificationCode] = useState("");
  const [emailAuthCodeSent, setEmailAuthCodeSent] = useState(false);
  const handleEmailAuthRequest = async () => {
    try {
      // 1. 아이디 중복 검사를 먼저 실행합니다.
      const duplicateResponse = await axios.post(
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
  
      // 2. 이미 사용 중인 아이디인 경우
      if (duplicateResponse.data.isDuplicate) {
        alert("이미 Gaga의 회원이세요. 아이디 찾기를 이용해주세요.");
        setIsUserIdValid(false);
        return;  // 아이디가 중복되므로 이메일 인증 절차를 종료합니다.
      } else {
        setIsUserIdValid(true);
      }
  
      // 3. 중복이 없을 경우 이메일 인증을 진행합니다.
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
  
      // 이메일 인증 코드를 받아옴
      const emailAuthCode = response.data;
      setEmailAuthCode(emailAuthCode);
      setEmailAuthCodeSent(true);
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

  // 핸드폰 인증 부분
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

  // 1. 비밀번호 유효성 검사 함수
  function isValidPassword(password) {
    // 영문, 숫자, 특수문자 각각 최소 1회 이상 포함, 길이 6~14
    const re =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;
    return re.test(password);
  }

  // 2. 입력값 확인 및 오류 메시지 설정
  const [passwordError, setPasswordError] = useState("");
  const handlePasswordChange = (e) => {
    onChangeField("password", e);
    const isValid = isValidPassword(e.target.value);
  setPasswordError(isValid ? "" : "영문 숫자 특수문자조합 8~14자리 이내로 입력해주세요.");
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
  // const checkDuplicateId = async () => {
  //   try {
  //     const response = await axios.post(
  //       `${import.meta.env.VITE_SPRING_HOST}/rest/user/checkDuplicateId`,
  //       {
  //         userId: userId,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     // 아이디 중복 여부를 확인합니다.
  //     if (response.data.isDuplicate) {
  //       alert("이미 사용 중인 아이디입니다.");
  //       setIsUserIdValid(false);
  //     } else {
  //       setIsUserIdValid(true);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  return (
    <>
      <CommonTop pageName="Gaga 회원가입" />
      <Grid
        container
        component="main"
        sx={{
          marginTop: "63px",
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
            "& .MuiTextField-root:not(:last-child)": { marginBottom: "9px" },
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
                maxHeight: '90vh',  // 뷰포트 높이의 90%를 최대 높이로 설정
                overflow: 'auto',  // 컨텐츠가 Box를 벗어나면 스크롤바 표시
              }}
              onClick={handleCloseTerms}
            >
              <TermsOfGaga />
            </Box>
          </Modal>
          {openTerms && <TermsOfGaga onClose={handleCloseTerms} />}
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="space-between"
            style={{ marginBottom: "9px" }}
          >
            <Grid item xs={9} sm={8} >
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
                // onBlur={checkDuplicateId}
                error={!!emailError}
                helperText={emailError}
                autoComplete="email"
                autoFocus
              />
            </Grid>
            <Grid item xs={3} sm={4}>
              <Button
                variant="contained"
                onClick={handleEmailAuthRequest}
                size="small"
                fullWidth
                style={{
                  height: "45px",
                  width: "50px",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                }}
              >
                인증
                <br />
                요청
              </Button>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="space-between"
            style={{ marginBottom: "9px" }}
          >
            <Grid item xs={9} sm={8}>
              <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                id="emailAuthCode"
                label="이메일 인증 코드"
                name="emailAuthCode"
                onChange={handleEmailVerificationCodeChange}
              />
            </Grid>
            <Grid item xs={3} sm={4}>
              <Button
                variant="contained"
                onClick={handleEmailVerification}
                size="small"
                fullWidth
                disabled={!emailAuthCodeSent}
                style={{
                  height: "45px",
                  width: "50px",
                  fontSize: "0.7rem",
                  fontWeight: "bold",
                }}
              >
                이메일 인증
              </Button>
            </Grid>
          </Grid>
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
              maxLength: 14,  // 최대 입력 가능한 문자 수를 14개로 제한
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
              maxLength: 14,  // 최대 입력 가능한 문자 수를 14개로 제한
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
            value={nickName}
            onChange={handleNicknameChange}
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
            value={gender}
            style={{ marginTop: "9px" }}
            onChange={handleGenderChange}
            autoComplete="gender"
            select // select 속성 추가
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
                style={{ marginBottom: "9px" }}
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
            style={{ marginBottom: "9px" }}
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
            style={{ marginBottom: "9px" }}
            onClick={handleSubmit}
            disabled={
              !emailVerified ||
              !phoneVerified ||
              !isNameValid ||
              !isNicknameValid ||
              !agreeTerms
            }
          >
            회원가입
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default AddUser;
