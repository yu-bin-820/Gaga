import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import axios from 'axios';
import React, { useCallback } from 'react';
import { Navigate } from 'react-router';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';

import Paper from '@mui/material/Paper';

import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { Link } from 'react-router-dom';

import { Backdrop } from '@mui/material';

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Typography component={Link} to="/" color={'Green'}>
        GAGA
      </Typography>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
            mutateMe();
          });
      } catch (error) {
        console.error(error);
      }
    },
    [user, mutateMe]
  );

  if (myData === undefined) {
    return <div>로딩중</div>;
  }
  if (myData.userId !== undefined && myData.userId !== null) {
    console.log(myData);
    return <Navigate replace to="/" />;
  }
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage:
            'url(https://as1.ftcdn.net/v2/jpg/05/30/81/30/1000_F_530813029_XMXEvLZr5K4ntqqDgJzwxhbgO7W2ShiB.jpg)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light'
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color={'primary'}>
            Log In
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="userId"
              label="Your ID"
              name="userId"
              autoFocus
              value={user.userId}
              onChange={onChangeUser}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={onChangeUser}
            />
            {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
            <Typography variant="overline" color="secondary"></Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, marginTop: 1 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Typography component={Link} to="/users/signup" color={'Green'}>
                  {'회원이 아니신가요? '}
                </Typography>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
