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

const UserLogout = ({ pageName, prevPath }) => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
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
            <IconButton
              onClick={async () => {
                // 서버에 로그아웃 요청 보내기
                const response = await fetch(
                  `${import.meta.env.VITE_SPRING_HOST}/rest/user/logout`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                );
                // 응답을 받았을 때의 동작을 여기에 작성하세요.
                if (response.ok) {
                  console.log("로그아웃 완료");
                  mutate(`${import.meta.env.VITE_SPRING_HOST}/rest/user/login`, null, false);
                  navigate("/");
                } else {
                  console.error("로그아웃 요청 실패");
                }
              }}
            >
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
