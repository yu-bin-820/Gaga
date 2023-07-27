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
  Typography,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { Link } from "react-router-dom";
import CommonTop from "@layouts/common/CommonTop";
import useUserFormStore from "@hooks/user/useUserFormStore";
import { useNavigate } from "react-router";
import AddUserDate from "@components/user/AddUserDate";

import Modal from "@mui/material/Modal";
import { Update } from "@mui/icons-material";
import useUpdateUserFormStore from "@hooks/user/useUpdateUserFormStore";
import UpdateUserDate from "@components/user/UpdateUserDate";
import UpdateUserTop from "@layouts/user/UpdateUserTop";

const UpdateUser = () => {
  const {
    userNo,
    userId,
    // password,
    userName,
    birthday,
    gender = 1,
    nickName,
    phoneNo,
    profileImg,
    activityImg,
    activityImg2,
    activityImg3,
    userIntro,
    mainTitleNo,
    mainTitleName,
    bankCode,
    bankName,
    accountNo,
    blacklist,
    filterGender,
    filterMaxAge,
    filterMinAge,
    filterTag,
    filterTag2,
    filterTag3,
    setField,
    onChangeField,
    reset,
  } = useUpdateUserFormStore();

  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isNameValid, setIsNameValid] = useState(false);
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [isGenderValid, setIsGenderValid] = useState(false);
  const [isBirthdayValid, setIsBirthdayValid] = useState(false);
  const [isUserIdValid, setIsUserIdValid] = useState(false);

  const handleNameChange = (e) => {
    onChangeField("userName", e);
    setIsNameValid(e.target.value.trim() !== "");
  };
  const handleNicknameChange = (e) => {
    onChangeField("nickName", e);
    setIsNicknameValid(e.target.value.trim() !== "");
  };
  const handleFindPasswordChange = (e) => {
    navigate("/user/findpassword");
  };
  const handleGenderChange = (e) => {
    onChangeField("gender", e);
    setIsGenderValid(e.target.value !== "");
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  console.log("로그인한 사용자정보는=" + myData.userNo);

  useEffect(() => {
    if (myData) {
      setField("userNo", myData.userNo);
      setField("userId", myData.userId);
      // setField("password", myData.password);
      setField("userName", myData.userName);
      setField("birthday", dayjs(myData.birthday).format("YYYY-MM-DD"));
      setField("gender", myData.gender);
      setField("nickName", myData.nickName);
      setField("phoneNo", myData.phoneNo);
      setField("profileImg", myData.profileImg);
      setField("activityImg", myData.activityImg);
      setField("activityImg2", myData.activityImg2);
      setField("activityImg3", myData.activityImg3);
      setField("userIntro", myData.userIntro);
      setField("mainTitleNo", myData.mainTitleNo);
      setField("mainTitleName", myData.mainTitleName);
      setField("bankCode", myData.bankCode);
      setField("bankName", myData.bankName);
      setField("accountNo", myData.accountNo);
      setField("blacklist", myData.blacklist);
      setField("filterGender", myData.filterGender);
      setField("filterMaxAge", myData.filterMaxAge);
      setField("filterMinAge", myData.filterMinAge);
      setField("filterTag", myData.filterTag);
      setField("filterTag2", myData.filterTag2);
      setField("filterTag3", myData.filterTag3);
    }
    // return () => {
    //   reset();
    // }
  }, [myData]);
  console.log("로그인한 사용자정보는=" + myData.userNo);
  console.dir(myData);
  console.log(birthday);

  const navigate = useNavigate();
  const handleSubmit = useCallback(async () => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`,
        {
          userNo,
          userId,
          // password,
          userName,
          birthday: dayjs(birthday).format("YYYY-MM-DD"),
          gender,
          nickName,
          phoneNo,
          profileImg,
          activityImg,
          activityImg2,
          activityImg3,
          userIntro,
          mainTitleNo,
          mainTitleName,
          bankCode,
          bankName,
          accountNo,
          blacklist,
          filterGender,
          filterMaxAge,
          filterMinAge,
          filterTag,
          filterTag2,
          filterTag3,
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
      alert("정보수정 완료되었습니다.");
      mutateMe();
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }, [userId, userName, birthday, gender, nickName, phoneNo]);

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
  // const handleEmailVerificationCodeChange = (e) => {
  //   setEmailVerificationCode(e.target.value);
  // };

  // const handleEmailVerification = () => {
  //   if (emailVerificationCode === emailAuthCode) {
  //     alert("인증이 완료되었습니다!");
  //     setEmailVerified(true);
  //   } else {
  //     alert("인증 코드가 올바르지 않습니다. 다시 확인해 주세요.");
  //   }
  // };

  const [phoneAuthCode, setPhoneAuthCode] = useState(null);
  const [phoneVerificationCode, setPhoneVerificationCode] = useState("");
  const [phoneAuthCodeSent, setPhoneAuthCodeSent] = useState(false);

  const handlePhoneAuthRequest = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/phoneno/${phoneNo}`
      );
  
      if (response.data) {
        alert("이미 사용중인 핸드폰 번호입니다.");
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

  // function isValidPassword(password) {
  //   const re =
  //     /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,14}$/;
  //   return re.test(password);
  // }

  // const [passwordError, setPasswordError] = useState("");
  // const handlePasswordChange = (e) => {
  //   onChangeField("password", e);
  //   const isValid = isValidPassword(e.target.value);
  //   setPasswordError(
  //     isValid ? "" : "영문 숫자 특수문자조합 8~14자리 이내로 입력해주세요."
  //   );
  // };

  // // 3. 비밀번호 일치 확인
  // const [passwordConfirm, setPasswordConfirm] = useState("");
  // const [passwordConfirmError, setPasswordConfirmError] = useState("");
  // const handlePasswordConfirmChange = (e) => {
  //   setPasswordConfirm(e.target.value);
  //   setPasswordConfirmError(
  //     e.target.value === password ? "" : "비밀번호가 일치하지 않습니다."
  //   );
  // };
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
      <CommonTop pageName="Gaga 회원정보수정" />
      <Grid
        container
        component="main"
        sx={{
          marginTop: "75px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: 13,
        }}
      >
        <CssBaseline />
        <Box
          component="form"
          noValidate
          sx={{
            width: "80%",
            mt: 3,
            "& .MuiTextField-root:not(:last-child)": { marginBottom: "15px" },
          }}
        >
          <TextField
            label="아이디 변경불가"
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
            disabled
          />
          {/* <Typography>
            비밀번호는 암호화되어 재설정만 가능합니다
          </Typography> */}
          <Button
            fullWidth
            variant="contained"
            sx={{ mt: "0px", mb: "20px" }}
            onClick={handleFindPasswordChange}
          >
            비밀번호 변경하기(재설정만 가능합니다)
          </Button>
          {/* <TextField
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
          /> */}
          <TextField
            label="회원실명 변경불가"
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
            disabled
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="nickName"
            label="닉네임 변경"
            name="nickName"
            value={nickName}
            onChange={handleNicknameChange}
            autoComplete="nickName"
            inputProps={{
              minLength: 2,
              maxLength: 16,
            }}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="none"
            required
            fullWidth
            id="birthday"
            label="생년월일 변경불가"
            name="birthday"
            value={birthday}
            disabled
          />
          {/* <UpdateUserDate birthday={birthday} /> */}
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
            disabled
          >
            <MenuItem value={1}>남자</MenuItem>
            <MenuItem value={2}>여자</MenuItem>
          </TextField>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="space-between"
            style={{ marginBottom: "10px"}}
          >
            <Grid item xs={9} sm={8}>
              <TextField
                variant="outlined"
                margin="none"
                required
                fullWidth
                type="tel"
                id="phoneNo"
                label="변경할 핸드폰 번호 입력"
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
            sx={{ mt: 1, mb: 1, marginTop: 3 }}
            onClick={handleSubmit}
          >
            정보 수정 하기
          </Button>
        </Box>
      </Grid>
    </>
  );
};

export default UpdateUser;
