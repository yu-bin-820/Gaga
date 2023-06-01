import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Button, IconButton, Typography } from '@mui/material';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';
import AddUser from '@pages/user/AddUser';

const UserTop = ({ pageName, prevPath }) => {
  const navigate = useNavigate();
  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        sx={{ height: '58px', borderBottom: '1px solid #ccc' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <IconButton
              onClick={() => {
                navigate(prevPath || '/user/adduser', { replace: true });
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box
              sx={{
                minWidth: 'calc(100vw - 108px)',
                display: 'flex',
                justifyContent: 'center',
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
UserTop.propTypes = {
  pageName: PropTypes.string,
  prevPath: PropTypes.string,
};
export default UserTop;
