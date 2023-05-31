import React, { useState, useEffect } from "react";
import { Button, TextField } from "@mui/material";
import { useParams } from "react-router-dom";
import useSWR, { mutate } from "swr";
import fetcher from "@utils/fetcher";
import Grid from "@mui/material/Grid";
import MainTop from "@layouts/common/MainTop";

function AddNaverUser() {
  const [user, setUser] = useState({
    userId: "",
    password: "",
    userName: "",
    birthday: "",
    gender: 0,
    nickName: "",
    phoneNo: "",
  });

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
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
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/userid/${
          myData.userId
        }`
      );
      const data = await response.json();
      setUser(data);
      mutate(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/userid/${
          myData.userId
        }`,
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
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
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

      const data = await response.json();
      setUser(data);
      mutate(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/userid/${
          myData.userId
        }`,
        data
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <MainTop />
      <Grid
        container
        component="main"
        sx={{ height: "100vh", marginTop: "63px" }}
      >
        <div>
          <TextField label="아이디" value={user.userId} disabled />
          <TextField
            label="비밀번호"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <TextField label="이름" value={user.userName} disabled />
          <TextField label="생년월일" value={user.birthday} disabled />
          <TextField
            label="성별"
            value={user.gender === 1 ? "남자" : "여자"}
            disabled
          />
          <TextField
            label="닉네임"
            value={user.nickName}
            onChange={(e) => setUser({ ...user, nickName: e.target.value })}
          />
          <TextField label="전화번호" value={user.phoneNo} disabled />
          <div>
            {/* TextField들... */}
            <Button onClick={addNaverUser}>회원가입</Button>{" "}
            {/* 정보수정 버튼 */}
          </div>
        </div>
      </Grid>
    </>
  );
}

export default AddNaverUser;
