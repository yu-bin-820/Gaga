import React, { useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, IconButton, Typography } from "@mui/material";
import { Link, Outlet, useNavigate,useLocation  } from "react-router-dom";
import { Box } from "@mui/system";
import PropTypes from "prop-types";
import useUserFormStore from "@hooks/user/useUserFormStore"
import useNaverFormStore from "@hooks/user/useNaverFormStore";

const AddNaverTop = ({ pageName, prevPath }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { reset } = useNaverFormStore();

  useEffect(() => {
    // 페이지 이동이 발생할 때마다 상태를 초기화합니다.
    reset();
  }, [location, reset]);
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
              onClick={() => {
                navigate(prevPath || -1);
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
AddNaverTop.propTypes = {
  pageName: PropTypes.string,
  prevPath: PropTypes.string,
};
export default AddNaverTop;
