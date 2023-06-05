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

const AddUserTest = () => {
  const {
    userId,
    password,
    userName,
    birthday,
    gender,
    nickName,
    phoneNo,
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
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
        {
          userId: userId,
          password: password,
          userName: userName,
          birthday: dayjs(birthday).format("YYYY-MM-DD"),
          gender: gender,
          nickName: nickName,
          phoneNo: phoneNo,
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
  }, [userId, password, userName, birthday, gender, nickName, phoneNo]);

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

      // 이메일 인증 코드를 받아옴
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

  // 핸드폰 인증 부분
  const [phoneAuthCode, setPhoneAuthCode] = useState(null);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");

  const handlePhoneAuthRequest = async () => {
    try {
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
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,14}$/;
    return re.test(password);
  }

  // 2. 입력값 확인 및 오류 메시지 설정
  const [passwordError, setPasswordError] = useState("");
  const handlePasswordChange = (e) => {
    onChangeField("password", e);
    const isValid = isValidPassword(e.target.value);
    setPasswordError(isValid ? "" : "비밀번호 형식이 올바르지 않습니다.");
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

  return (
    <>
      <CommonTop />
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Box component="form" noValidate sx={{ width: "50%", mt: 8, ml: 10 }}>
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
              sx={
                {
                  /* 모달 스타일 설정 */
                }
              }
            >
              <TermsOfGaga />
            </Box>
          </Modal>
          {/* {openTerms && <TermsOfGaga onClose={handleCloseTerms} />} */}
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
            error={!!emailError}
            helperText={emailError}
            autoComplete="email"
            autoFocus
          />
          <Button
            variant="contained"
            onClick={handleEmailAuthRequest}
            size="small"
          >
            인증 요청
          </Button>
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
          <Button
            variant="contained"
            onClick={handleEmailVerification}
            size="small"
          >
            이메일 인증하기
          </Button>
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
            onChange={handleGenderChange}
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
            value={phoneNo}
            onChange={(e) => onChangeField("phoneNo", e)}
            defaultValue="010"
            inputProps={{
              maxLength: 11, // 최대 11글자
              pattern: "[0-9]*", // 숫자만 입력 가능
            }}
          />
          <Button
            variant="contained"
            onClick={handlePhoneAuthRequest}
            size="small"
          >
            코드 발송
          </Button>
          <TextField
            variant="outlined"
            margin="none"
            fullWidth
            id="phoneVerificationCode"
            label="핸드폰 인증 코드 입력"
            name="phoneVerificationCode"
            onChange={(e) => setPhoneVerificationCode(e.target.value)}
          />
          <Button
            variant="contained"
            size="small"
            onClick={handlePhoneVerification}
          >
            핸드폰 인증하기
          </Button>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 1, mb: 1, marginTop: 1 }}
            onClick={handleSubmit}
            disabled={
              !emailVerified ||
              !phoneVerified ||
              !isNameValid ||
              !isNicknameValid || !agreeTerms 
            }
          >
            회원가입
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default AddUserTest;
