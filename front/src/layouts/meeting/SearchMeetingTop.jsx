import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { Container } from '@mui/system';
import React from 'react';
import { useNavigate } from 'react-router';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const SearchMeetingTop = () => {

    const navigate = useNavigate();


    return (
        <>
        <AppBar position="fixed" color="secondary" elevation={0} sx={{ height: '50px' }}>
          <Container maxWidth="xl">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}> 
              <IconButton
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
    
              <Button
              variant="text"
              >
                검색
                </Button>

            </Toolbar>
          </Container>
        </AppBar>
        </>
    );
};

export default SearchMeetingTop;