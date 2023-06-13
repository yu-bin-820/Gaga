import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button, TextField, Box, Stack, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CommonTop from '@layouts/common/CommonTop';
import { styled } from '@mui/system';
import Collapse from '@mui/material/Collapse';
import BlackListTabs from '@components/admin/BlackListTabs';
import SearchToggle from '@components/admin/SearchToggle';
import Chatbot from '@components/chatbot/ChatBot';

const AnimatedTextField = styled(TextField)`
  transition: all 300ms ease-in-out;
`;

function ListBlackList() {
  const [blackList, setBlackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastUserNo, setLastUserNo] = useState(null);
  const navigate = useNavigate();

  const columns = [
    { id: 'index', label: 'No', minWidth: 50 },
    { id: 'userName', label: 'Name', minWidth: 170 },
    { id: 'blackList', label: 'Reason', minWidth: 170 },
  ];

  const handleBlackListClick = (userNo) => {
    navigate(`/blackList/getBlackList/blackListNo/${userNo}`);
  };

  useEffect(() => {
    if (lastUserNo !== null) {
      fetchBlackList(lastUserNo);
    }
  }, [lastUserNo]);

  useEffect(() => {
    const fetchLastUserNo = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getLatestUserNo`);
        const lastUserNo = response.data;
        setLastUserNo(lastUserNo);
        console.log(lastUserNo, "받았음?");
      } catch (error) {
        console.error(error);
      }
    }
    fetchLastUserNo();
  }, []);

  const fetchBlackList = async (lastUserNo = null) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const params = {
        lastUserNo: lastUserNo === null ? undefined : String(lastUserNo),
      };

      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getBlackListList`, {
        params,
      });

      const newBlacklist = response.data.filter(
        (user) => user.blacklist !== 0 && !blackList.find((bl) => bl.userNo === user.userNo)
      );

      setBlackList((prevList) => [...prevList, ...newBlacklist]);

      if (newBlacklist.length === 0) {
        setHasMore(false);
      } else {
        setLastUserNo(newBlacklist[newBlacklist.length - 1].userNo);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 200 && hasMore && !isLoading) {
        fetchBlackList(lastUserNo);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, lastUserNo]);

  const SearchTransition = () => {
    const [isSearchOpen, setSearchOpen] = useState(false);
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearchIconClick = () => {
      setSearchOpen(true);
    };

    const handleSearch = async () => {
      if (searchKeyword.length > 0) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchBlackList`, {
            params: {
              searchKeyword: searchKeyword,
            },
          });
          setBlackList(response.data);
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
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Collapse in={isSearchOpen}>
          <AnimatedTextField
            type="text"
            size="small"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            style={{ marginRight: "0.2rem" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Collapse>
       
        <IconButton onClick={handleSearchIconClick}>
          <SearchIcon />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box sx={{ marginTop: "64px", marginLeft: "10px", marginRight: "10px" }}>
      <CommonTop pageName="블랙리스트" prevPath="/community/profile/mine" />
      <BlackListTabs />
      <Chatbot />
      <Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "1rem",
            alignItems: "center",
          }}
        >
          <SearchTransition />
        </Box>
  
        <Paper sx={{ maxWidth: '100%' }}>
          <div style={{ overflowX: 'auto' }}>
            <TableContainer sx={{ maxHeight: 540, tableLayout: 'auto', width: '100%' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ color: "white", backgroundColor: "primary.main" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {blackList.map((user, index) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={user.userNo} onClick={() => handleBlackListClick(user.userNo)}>
                      <TableCell style={{ width: '5%', maxWidth: '5vw' }}>{index + 1}</TableCell>
                    <TableCell style={{ width: '10%', maxWidth: '10vw' }}>{user.userName}</TableCell>
                <TableCell style={{ width: '25%', maxWidth: '25vw' }}>{user.blacklist === 1 ? "신고 누적 블랙리스트" : "관리자 블랙리스트"}</TableCell>
       </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </Paper>
        {isLoading && <Typography align="center">Loading...</Typography>}
      </Stack>
    </Box>
  );
}

export default ListBlackList;