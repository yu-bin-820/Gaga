import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, IconButton, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import { useSWRConfig } from 'swr';
import useSWR from "swr";
import fetcher from "@utils/fetcher";
import { useCallback } from "react";
import axios from 'axios';

const UserLogout = ({ pageName, prevPath }) => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const onClickLogOut = useCallback(async () => {
    await axios
      .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/user/logout`, {
        withCredentials: true,
      })
      .then(() => {
        mutateMe();
      });
  }, [mutateMe]);
  
  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        sx={{ height: "58px", borderBottom: "1px solid #ccc" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
          <IconButton onClick={onClickLogOut} navigate="/">
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box
              sx={{
                minWidth: "calc(100vw - 108px)",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                {pageName}
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Outlet />
    </>
  );
};
UserLogout.propTypes = {
  pageName: PropTypes.string,
  prevPath: PropTypes.string,
};
export default UserLogout;
