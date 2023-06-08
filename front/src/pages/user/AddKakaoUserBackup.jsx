import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useParams } from 'react-router-dom';
import useSWR, { mutate } from 'swr';
import fetcher from '@utils/fetcher';
import Grid from '@mui/material/Grid';
import MainTop from '@layouts/common/MainTop';
import dayjs from 'dayjs';
import MenuItem from '@mui/material/MenuItem';
import CommonTop from '@layouts/common/CommonTop';
import UserLogout from '@layouts/user/UserLogout';

function AddKakaoUser() {
  const [user, setUser] = useState({
    userId: '',
    password: '',
    userName: '',
    birthday: '',
    gender: 1,
    nickName: '',
    phoneNo: '',
  });

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  console.log('로그인된 사용자냐?' + myData);

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
    const formattedBirthday = dayjs(user.birthday).format('YYYY-MM-DD');
    const userWithFormattedBirthday = { ...user, birthday: formattedBirthday };
    console.log('addNaverUser 함수 실행' + JSON.stringify(user));
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/addUser`,
        {
          method: 'POST', // PUT 요청
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userWithFormattedBirthday), // 유저 정보를 JSON 형태로 변환
        }
      );

      if (!response.ok) {
        throw new Error('서버 에러');
      }

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

  return (
    <>
      <CommonTop/>
      <Grid
        container
        component="main"
        sx={{ height: '100vh', marginTop: '63px' }}
      >
        <div>
          카카오 회원가입
          <br />
          <TextField label="아이디" value={user.userId} disabled />
          <TextField
            label="비밀번호"
            value={user.password}
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
          <TextField
            label="이름"
            value={user.userName}
            onChange={(e) => setUser({ ...user, userName: e.target.value })}
          />
          <TextField
            label="생년월일"
            value={user.birthday}
            onChange={(e) => setUser({ ...user, birthday: e.target.value })}
          />
          <TextField
            label="성별"
            required
            fullWidth
            value={user.gender}
            select
            defaultValue={1}
            onChange={(e) =>
              setUser({ ...user, gender: parseInt(e.target.value) })
            }
          >
            <MenuItem value={1}>남자</MenuItem>
            <MenuItem value={2}>여자</MenuItem>
          </TextField>
          <TextField
            label="닉네임"
            value={user.nickName}
            onChange={(e) => setUser({ ...user, nickName: e.target.value })}
          />
          <TextField
            label="전화번호"
            value={user.phoneNo}
            onChange={(e) => setUser({ ...user, phoneNo: e.target.value })}
          />
          <div>
            {/* TextField들... */}
            <Button onClick={addNaverUser}>회원가입</Button>{' '}
            {/* 정보수정 버튼 */}
          </div>
        </div>
      </Grid>
    </>
  );
}

export default AddKakaoUser;
