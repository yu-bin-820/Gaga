import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Grid, Button, TextField, Box, Stack, Typography, List, ListItem, ListItemText, Divider, IconButton, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CommonTop from '@layouts/common/CommonTop';
import AdminTabs from '@components/admin/AdminTabs'; 
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import Chatbot from '@components/chatbot/ChatBot';

function ListEventPost() {
  const [noticePosts, setNoticePosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastPostId, setLastPostId] = useState(null);


  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
       
  useEffect(() => {
    if (myData) {
      const { userNo, role } = myData;
      console.log(userNo, role, '유저넘버랑 권한');    
    }
  }, [myData]);

  const handlePostClick = (noticePostNo) => {
    navigate(`/notice/getNoticePost/noticePostNo/${noticePostNo}`);
  };

  useEffect(() => {
    fetchEventPosts();
  }, []);

  useEffect(() => {
    // 첫 로딩시 가장 최신의 게시글 번호를 가져옴
    const fetchLatestPostId = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getLatestPostId`);
        if (response.status === 204) {
          // No content, do nothing
        } else {
          const latestPostId = response.data;
          setLastPostId(latestPostId);
          fetchEventPosts(latestPostId, true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchLatestPostId();
  }, []);

  const fetchEventPosts = async (lastPostId = null, initialLoad = false) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
      const params = {
        noticePostCategoryNo : 1,
      };
      
      if (lastPostId !== null) {
        params.lastPostId = String(lastPostId);
      }

      if (initialLoad) {
        const topResponse = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getLatestPostByCategoryNo`, {
          params,
        });
        const topData = topResponse.data; 
        setNoticePosts(topData);
      }
  
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePostListByCategoryNo`, {
        params,
      });
  
      const newNoticePosts = response.data;
      setNoticePosts((prevPosts) => [...prevPosts, ...newNoticePosts]);
  
      if (newNoticePosts.length === 0) {
        setHasMore(false);
      } else {
        setLastPostId(newNoticePosts[newNoticePosts.length - 1].noticePostNo);
      }
  
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight -50 && hasMore && !isLoading) {
        fetchEventPosts(lastPostId);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, lastPostId]);

  const handleSearch = async () => {
    if (!searchKeyword || searchKeyword.trim() === '') {
        alert('검색어를 입력해주세요.');
        return;
      }
    try {
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchNoticePost`, {
        params: {
          searchKeyword: searchKeyword,
          searchCategoryNo: 1,
        },
      });
      setNoticePosts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ marginTop: '14%', marginLeft: '1%', marginRight: '1%' }}>
        <Chatbot />
      <CommonTop pageName="이벤트" prevPath="/community/profile/mine" />
      <AdminTabs />
      <Stack spacing={2.5}>
      {myData && myData.role == 1 && (
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center', margin: '10px' }}>
      {myData && myData.role == 1 && (
             <>
        <Link to="/notice/addNoticePost">
          <Button variant="contained">이벤트 작성</Button>
        </Link>
        </>
        )}
  <TextField
    type="text"
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
    onKeyPress={handleKeyPress}
    placeholder="제목, 내용 검색" // 여기에 placeholder를 추가했습니다.
    InputProps={{
      endAdornment: (
        <IconButton onClick={handleSearch}> {/* 버튼을 IconButton으로 변경하고, variant를 제거했습니다. */}
          <SearchIcon color="primary" style={{ marginRight: '-13px' }} /> {/* 검색 아이콘을 사용했습니다. 필요하면 이를 변경하실 수 있습니다. */}
        </IconButton>
      ),
      sx: { height: '38px', width: '200px' },
    }}
  />
</Box>
      )}
       {myData && myData.role != 1 && (
  <TextField
    type="text"
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
    onKeyPress={handleKeyPress}
    placeholder="제목, 내용 검색" // 여기에 placeholder를 추가했습니다.
    InputProps={{
      endAdornment: (
        <IconButton onClick={handleSearch}> {/* 버튼을 IconButton으로 변경하고, variant를 제거했습니다. */}
          <SearchIcon color="primary" style={{ marginRight: '-13px' }} /> {/* 검색 아이콘을 사용했습니다. 필요하면 이를 변경하실 수 있습니다. */}
        </IconButton>
      ),
      sx: { height: '38px', width: '180px', marginLeft : '180px', marginBottom: '-35px'},
    }}
  />
       )}
       
        <List component="nav">
        {Array.isArray(noticePosts) ? noticePosts.map((noticePost, index) => (
  <div key={noticePost.noticePostNo}>
    <ListItem button onClick={() => handlePostClick(noticePost.noticePostNo)}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {noticePost.thumbNail && (
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src={`${import.meta.env.VITE_CDN_HOST}/upload_images/admin/${noticePost.thumbNail}?type=sh&sharp_amt=1.0`}
              loading="lazy"
              alt="추가예정입니다."
              style={{ minWidth:'110%', minHeight:'10px', maxHeight: '15%', maxWidth: '110%', display: 'block' }}
            />
          </Box>
        )}
        <TableContainer component={Box}>
          <Table sx={{ maxWidth: 360, marginBottom: '0%'}}>
            <TableBody>
              <TableRow>
              <Grid container spacing={2}>
  <Grid item xs={8}>
    <TableCell 
      component="th"  
      scope="row" 
      style={{ 
        fontSize: '1rem', 
        borderBottom: '0px', 
        whiteSpace: 'normal', 
        wordWrap: 'break-word',
        paddingLeft: '0px',
        margin: '-1px', // 마진을 없애기 위해 0으로 설정
      }}>
      {noticePost.noticePostTitle}
    </TableCell>
  </Grid>
  <Grid item xs={4}>
    <TableCell 
      align="right" 
      style={{ 
        fontSize: '0.8rem', 
        borderBottom: '1px',
        whiteSpace: 'normal', 
        wordWrap: 'break-word',
        paddingLeft: '10px',
        margin: '10px', // 마진을 없애기 위해 0으로 설정
      }}>
      {noticePost.noticePostRegDate.split('T')[0]}
    </TableCell>
  </Grid>
</Grid>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </ListItem>
    {index < noticePosts.length - 1 && <Divider />}
  </div>
)) : null}
        </List>
        {isLoading && <Typography align="center">Loading...</Typography>}
      </Stack>
    </Box>
  );
}

export default ListEventPost;