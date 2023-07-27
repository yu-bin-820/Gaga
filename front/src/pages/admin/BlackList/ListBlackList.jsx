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
    { id: 'userName', label: 'Name', minWidth: 130 },
    { id: 'blackList', label: 'Reason', minWidth: 130 },
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
        if (!searchKeyword || searchKeyword.trim() === '') {
            alert('검색어를 입력해주세요.');
            return;
          }
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
        <Box sx={{ marginTop: "17%", marginLeft: "3%", marginRight: "3%" }}>
        <CommonTop pageName="블랙리스트" prevPath="/community/profile/mine" />
        <BlackListTabs />
        <Chatbot />
        <Stack>
          <Box sx={{ justifyContent: "flex-end", mb: "1rem", alignItems: "center" }}>
            <TextField
              style={{ marginLeft: '41.1%', justifyContent: 'flex-end', marginRight: '3%', marginTop:'2%' , marginBottom:'-4%'}}
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="블랙리스트 검색"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <SearchIcon color="primary" style={{ marginRight: '-13px' }} />
                  </IconButton>
                ),
                sx: { height: '38px', width: '200px' },
              }}
            />
          </Box>

          <Paper sx={{ maxWidth: '100%' }}>
            <div style={{ overflowX: 'auto' }}>
              <TableContainer sx={{ maxHeight: '100%', tableLayout: 'auto', width: '100%' }}>
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
                    {blackList.length > 0 ? (
                      blackList.map((user, index) => (
                        <TableRow hover role="checkbox" tabIndex={-1} key={user.userNo} onClick={() => handleBlackListClick(user.userNo)}>
                          <TableCell sx={{ marginRight: '-5%', width: '1%', maxWidth: '1%' }}>{index + 1}</TableCell>
                          <TableCell sx={{ width: '5%', maxWidth: '5%' }}>{user.userName}</TableCell>
                          <TableCell sx={{ width: '25%', maxWidth: '25%' }}>{user.blacklist === 1 ? "신고누적 블랙리스트" : "관리자 블랙리스트"}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} align="center">해당 검색에 대한 결과가 없습니다.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Paper>
          {isLoading && <Typography align="center">로딩 중...</Typography>}
        </Stack>
      </Box>
    );
  }
  return <SearchTransition />;
}

export default ListBlackList;