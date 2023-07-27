import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Stack, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CommonTop from '@layouts/common/CommonTop';
import BlackListTabs from '@components/admin/BlackListTabs';
import Chatbot from '@components/chatbot/ChatBot';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';


function ListUser() {
  const [userList, setUserList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastUserNo, setLastUserNo] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [isSearchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  const [value, setValue] = React.useState('2');

  const handleUserClick = (userNo) => {
    navigate(`/blackList/getUser/userNo/${userNo}`);
  };

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    if (myData) {
      const { userNo, role } = myData;
      console.log(userNo, role, '유저넘버랑 권한');    


    if (role !== 1) {
        alert("권한이 없습니다.");
        window.history.back();
    }
}
  }, [myData]);


  useEffect(() => {
    if (lastUserNo !== null) {
      fetchUserList(lastUserNo);
    }
  }, [lastUserNo]);

  useEffect(() => {
    const fetchLastUserNo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getLatestUserNo`);
        const lastUserNo = response.data;
        setLastUserNo(lastUserNo);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLastUserNo();
  }, []);

  const fetchUserList = async (lastUserNo = null) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const params = {
        lastUserNo: lastUserNo === null ? undefined : String(lastUserNo),
      };
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getUserList`, { params });

      const newUserlist = response.data;
      setUserList((prevList) => [...prevList, ...newUserlist]);

      if (newUserlist.length === 0) {
        setHasMore(false);
      } else {
        setLastUserNo(newUserlist[newUserlist.length - 1].userNo);
        
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 && hasMore && !isLoading) {
      fetchUserList(lastUserNo);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, lastUserNo]);

  const handleSearchIconClick = () => {
    setSearchOpen(true);
  };

  const handleSearch = async () => {
    if (!searchKeyword || searchKeyword.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
      }
    if (searchKeyword.length > 0) {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchUser`, {
          params: {
            searchKeyword: searchKeyword,
          },
        });
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ marginTop: "17%", marginLeft: "3%", marginRight: "3%" }}>
      <CommonTop pageName="회원 목록" prevPath="/community/profile/mine" />
      <Chatbot />
      <BlackListTabs />
      
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        
      </Box>

      <TextField
              style={{ marginLeft:'42.1%', justifyContent:'flex-end', marginRight: '3%' , marginTop:'-2%'}}
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="회원 정보 검색"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch} >
                    <SearchIcon color="primary" style={{ marginRight: '-13px' }} />
                  </IconButton>
                ),
                sx: { height: '38px', width: '200px' },
              }}
            />
  
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              sx={{
                "& th": {
                  color: "white",
                  backgroundColor: "primary.main",
                },
              }}
            >
              <TableCell
                style={{ minWidth: 20, fontWeight: "bold" }}
              >
                No
              </TableCell>
              <TableCell
                style={{ minWidth: 55, fontWeight: "bold" }}
              >
                Name
              </TableCell>
              <TableCell
                style={{ minWidth: 100, fontWeight: "bold" }}
              >
                JoinDay
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map((user, index) => (
              <TableRow
                hover
                role="checkbox"
                tabIndex={-1}
                key={user.userNo}
                onClick={() => handleUserClick(user.userNo)}
              >
                <TableCell style={{ minWidth: 20 }}>
                  {index + 1}
                </TableCell>
                <TableCell style={{ minWidth: 55 }}>
                  {user.userName}
                </TableCell>
                <TableCell style={{ minWidth: 100 }}>
                  {new Date(user.joinDay).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {isLoading && <Typography align="center">Loading...</Typography>}
    </Box>
  );
}

export default ListUser;
