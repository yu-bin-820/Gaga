import React, { useCallback, useEffect, useState } from 'react';
import { TextField, Button } from '@mui/material';
import axios from 'axios';
import { mutate } from 'swr';
import useSWR from 'swr';

const UpdateUser = () => {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/userid/user.userId`
      );
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      try {
        await axios.put(
          `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`,
          user,
          { withCredentials: true }
        );
        mutate(`/rest/user/userid/{userId}`); // SWR을 이용해 데이터를 다시 가져옵니다.
      } catch (error) {
        console.error(error);
      }
    },
    [user]
  );

  if (!user) {
    return '로딩중...';
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="userId"
        label="아이디"
        name="userId"
        autoComplete="userId"
        autoFocus
        value={user.userId}
        onChange={handleChange}
      />
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        id="userName"
        label="회원실명"
        name="userName"
        autoComplete="userName"
        value={user.userName}
        onChange={handleChange}
      />
      {/* 나머지 필드 추가 */}
      <Button type="submit" fullWidth variant="contained">
        정보 수정
      </Button>
    </form>
  );
};

export default UpdateUser;
