import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Navigate } from 'react-router';

const Login = () => {
  const [user, onChangeUser, setUser] = useInput({
    userId: '',
    password: '',
  });

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      try {
        const data = {
          userId: user.userId,
          password: user.password,
        };

        const response = await axios
          .post(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
            data,
            { withCredentials: true }
          )
          .then((response) => {
            console.log(response);
          });
      } catch (error) {
        console.error(error);
      }
    },
    [user]
  );
  if (myData === undefined) {
    return <div>로딩중</div>;
  }
  if (myData.userId !== undefined && myData.userId !== null) {
    return <Navigate replace to="/" />;
  }
  return (
    <Box sx={{ marginTop: '64px' }}>
      <TextField
        label="userId"
        name="userId"
        onChange={onChangeUser}
        required
        value={user.userId}
      />
      <TextField
        label="password"
        name="password"
        onChange={onChangeUser}
        required
        value={user.password}
      />
      <Button onClick={handleSubmit}>생성하기</Button>
    </Box>
  );
};

export default Login;
