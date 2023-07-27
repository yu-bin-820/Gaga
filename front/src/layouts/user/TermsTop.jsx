import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Button, IconButton, Typography } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import PropTypes from "prop-types";



const TermsTop = ({ pageName, prevPath, onBackClick }) => {
  const navigate = useNavigate();
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
                if(onBackClick) {
                  onBackClick();
                } else {
                  navigate(prevPath || -1);
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
TermsTop.propTypes = {
  pageName: PropTypes.string,
  prevPath: PropTypes.string,
  onBackClick: PropTypes.func,
};
export default TermsTop;
