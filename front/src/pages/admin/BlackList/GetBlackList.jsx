import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Paper, Typography, List, ListItem, ListItemText, Divider, ListItemIcon, Avatar, Button } from '@mui/material';
import { AccountCircle, Face, Person as Nickname, Thermostat as Temperature } from '@mui/icons-material';
import CommonTop from '@layouts/common/CommonTop';
import { Box } from '@mui/system';

function GetBlackList() {
  const { userNo } = useParams();
  const [user, setUser] = useState(null);
  const [isBlacklisted, setIsBlacklisted] = useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getBlackList/${userNo}`);
      setUser(response.data);
      setIsBlacklisted(response.data.blacklist !== 0);  // 수정된 부분
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
  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
      <Paper style={{ padding: "1rem", marginTop: "4.2rem" }}>
          <CommonTop
              pageName="블랙리스트 상세조회"
              prevPath="/blackList/listBlackList"
          />
          <Typography variant="h5" component="h2">
              블랙리스트 {user.userName} 의 정보
          </Typography>
          <Typography>
              {user.userName} 님은
              {user.blackListInfo === 1
                  ? " 신고 누적으로 인한 블랙리스트 상태입니다."
                  : " 관리자에 의해 블랙리스트 상태입니다."}
          </Typography>
          <List>
              <ListItem>
                  <ListItemIcon>
                      <AccountCircle />
                  </ListItemIcon>
                  <ListItemText primary="아이디" secondary={user.userId} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                  <ListItemIcon>
                      <Face />
                  </ListItemIcon>
                  <ListItemText primary="이름" secondary={user.userName} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                  <ListItemIcon>
                      <Nickname />
                  </ListItemIcon>
                  <ListItemText primary="닉네임" secondary={user.nickName} />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem>
                  <ListItemIcon>
                      <Temperature />
                  </ListItemIcon>
                  <ListItemText primary="온도" secondary={user.temperature} />
              </ListItem>
              {/* 추가적인 유저 정보 표시 */}
              <Divider variant="inset" component="li" />
              <Box display="flex" justifyContent="center" alignItems="center" padding="0.5rem 0">
              <Button 
                  variant="contained"
                  color={isBlacklisted ? "primary" : "primary"}
                  onClick={toggleBlacklist}
                  alignItems="center"
              >
                  {isBlacklisted ? "블랙리스트 해제" : "블랙리스트 추가"}
              </Button>
              </Box>
          </List>
      </Paper>
  );
}

export default GetBlackList;