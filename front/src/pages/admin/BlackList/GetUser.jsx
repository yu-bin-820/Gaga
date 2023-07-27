import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, Grid, Paper, ListItem, ListItemText, List, ListItemIcon, Icon } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import PhoneIcon from '@mui/icons-material/Phone';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommonTop from '@layouts/common/CommonTop';

const GetUser = () => {
  const { userNo } = useParams();
  const [user, setUser] = useState({});
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [userNo]);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getUser/userNo/${userNo}`);
      setUser(response.data);
      setIsBlacklisted(response.data.blacklist === 1 || response.data.blacklist === 2);// 블랙리스트 상태 설정
      console.log(response.data, "나와라얍");
    } catch (error) {
      console.error(error);
    }
  };

  const toggleBlacklist = async () => {
    try {
      if (isBlacklisted) {
        await axios.post(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/toggleBlackList/${userNo}`);
      } else {
        await axios.post(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/toggleBlackList/${userNo}`);
      }
      let confirmMessage = isBlacklisted ? "이 회원을 블랙리스트에서 해제하시겠습니까?" : "이 회원을 블랙리스트로 등록하시겠습니까?";
  if(window.confirm(confirmMessage)) {
    setIsBlacklisted(!isBlacklisted);
  }
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getUser/userNo/${userNo}`);
      setUser(response.data);
      setIsBlacklisted(response.data.blacklist === 2);
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <Box sx={{ margin: '2rem', marginTop: '4.2rem' }}>
    <Typography variant="h4" gutterBottom>
      <CommonTop pageName="회원 상세보기" prevPath="/blackList/listUser" />
    </Typography>
    
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} sx={{ padding: '0.1rem' }}>
            
          <List>
            <ListItem>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="회원 이름" secondary={user.userName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="닉네임" secondary={user.nickName} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <AssignmentIndIcon />
              </ListItemIcon>
              <ListItemText primary="회원 권한" secondary={user.role === 0 ? '회원':'관리자'} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <PhoneIcon />
              </ListItemIcon>
              <ListItemText primary="전화번호" secondary={user.phoneNo} />
            </ListItem>
            <ListItem> 
              <ListItemIcon>
                {user.blacklist ? <BlockIcon /> : <CheckCircleIcon />}
              </ListItemIcon>
              <ListItemText primary="블랙리스트" secondary={user.blacklist ? '블랙리스트' : 'No'} />
            </ListItem>
          </List>
        </Paper>
      </Grid>
    </Grid>
    <Box display="flex" justifyContent="center" alignItems="center" padding="2rem 0">
      <Button
        variant="contained"
        color={isBlacklisted ? 'secondary' : 'primary'}
        onClick={toggleBlacklist}
        startIcon={isBlacklisted ? <RemoveCircleIcon /> : <AddCircleIcon />}
      >
        {isBlacklisted ? '블랙리스트 해제' : '블랙리스트 추가'}
      </Button>
    </Box>
  </Box>
);
};

export default GetUser;