import React, { useState, useCallback } from "react";
import axios from "axios";
import { Button, TextField } from "@mui/material";
import fetcher from "@utils/fetcher";
import CommonTop from "@layouts/common/CommonTop";
import { Typography, Box } from "@mui/material";
import useSWR from "swr";
import { useNavigate } from "react-router";

function DeleteUser() {
  const [password, setPassword] = useState("");
  const [outReason, setOutReason] = useState("");
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(false);
  const [isConfirmationDisplayed, setIsConfirmationDisplayed] = useState(false);
  const navigate = useNavigate();

    const { data: myData, mutate: mutateMe, error } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  // const { data: myData, error } = useSWR(
  //   `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
  //   fetcher
  // );
  // const onClickLogOut = useCallback(async () => {
  //   await axios
  //     .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/user/logout`, {
  //       withCredentials: true,
  //     })
  //     .then(() => {
  //       mutateMe();
  //     });
  // }, [mutateMe]);

  if (error) return <div>로그인 정보를 불러오는데 실패했습니다.</div>;
  if (!myData) return <div>데이터 로딩 중...</div>;

  const confirmPassword = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/checkPassword`,
        {
          userId: myData.userId,
          password: password,
        }
      );

      // API 응답 결과를 사용하여 비밀번호 일치 여부를 설정

      if (response.data) {
        alert("비밀번호가 확인되었습니다.");
        setIsPasswordConfirmed(true);
      }
      // 비밀번호가 일치하지 않는 경우 알림 표시
      if (!response.data) {
        alert("비밀번호가 일치하지 않습니다.");
      }
    } catch (error) {
      console.log(error);
      alert("비밀번호 확인에 실패했습니다.");
    }
  };

  const deleteUser = async () => {
    console.log("탈퇴사유가 안감?" + outReason);
    if (!isPasswordConfirmed) {
      alert("비밀번호를 확인해야 합니다.");
      return;
    }
    const confirmation = window.confirm("정말로 회원 탈퇴하시겠습니까?");
    if (confirmation) {
      try {
        const updatedUser = {
          ...myData,
          outReason,
        };
        const response = await fetch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/user/deleteUser`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedUser),
          }
        );

        if (!response.ok) {
          throw new Error("서버 에러");
        }

        alert("회원 탈퇴가 완료되었습니다.");

        // 로그아웃 요청
        const logoutResponse = await fetch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/user/logout`,
          { 
            method: "DELETE",
            credentials: 'include' // 쿠키를 포함해서 요청을 보냅니다.
          }
        );

        if (!logoutResponse.ok) {
          throw new Error("로그아웃 실패");
        }

        // 성공적으로 로그아웃한 후, 해당 유저 데이터를 클리어
        mutateMe(
          `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
          null,
          false
        );

        // 페이지 이동
        navigate("/"); // 이 경로를 메인 페이지 경로로 변경해주세요.
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleOutReasonChange = (e) => {
    setOutReason(e.target.value);
    console.log(outReason);
  };

  return (
    <div>
      <CommonTop pageName="회원탈퇴"/>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="80%"
        margin="0 auto"
      >
        <Typography
          variant="body1"
          style={{ marginTop: "75px", paddingLeft: "0px", paddingRight: "0px" }}
          textAlign={"left"}
        >
          Gaga 서비스를 이용해 주셔서 감사드립니다.
          <br />
          
          <br />
          탈퇴사유를 입력해주시면 참고하여
          <br />
          서비스 개선에 참고하겠습니다.
          <br />
          <br />
          회원님의 정보는 탈퇴시 즉시 삭제되며,
          <br />
          <b>현재 비밀번호 확인후 탈퇴 가능합니다.</b>
          <br />
          <br />
        </Typography>

        <TextField
          label="비밀번호"
          type="password"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button variant="contained" onClick={confirmPassword}>
          확인
        </Button>
        <TextField
          label="탈퇴 사유"
          value={outReason}
          onChange={handleOutReasonChange}
          multiline
          rows={5}
          style={{ marginTop: "16px", width: "100%" }}
        />

        {isPasswordConfirmed && (
          <>
            <Typography>비밀번호가 확인되었습니다.</Typography>

            <Button variant="contained" onClick={deleteUser}>
              회원 탈퇴
            </Button>
          </>
        )}
      </Box>
    </div>
  );
}

export default DeleteUser;
