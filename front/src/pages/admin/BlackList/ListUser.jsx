import React, { useState, useEffect } from 'react';
import { Link, Router } from 'react-router-dom';
import { Button, Container, Grid, TextField, Typography,  List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

import CommonTop from '@layouts/common/CommonTop';

function ListUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getUserList`);
      setUserList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchUser`);
      setUserList(response.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
    <Container maxWidth="md">        
    <CommonTop pageName="블랙리스트" prevPath="/community/profile/mine" />

      <Typography variant="h2" align="center">회원 검색 (관리자 전용)</Typography>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <TextField fullWidth variant="outlined" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </Grid>
        <Grid item xs={3}> 
          <Button fullWidth variant="contained" color="primary" onClick={handleSearch}>검색</Button>
        </Grid>
      </Grid>
      <List>
        {userList.map((user) => (
          <ListItem key={user.userNo}>
            <ListItemText>
              <Link component={Router} to={`/blackList/getUser/userNo/${user.userNo}`}>{user.userName}</Link>
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
    </>    
  );
}

export default ListUser;