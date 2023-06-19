import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, TextField, Box, Stack, Typography, List, ListItem, ListItemText, Divider, IconButton  } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import CommonTop from '@layouts/common/CommonTop';
import AdminTabs from '@components/admin/AdminTabs';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import QACategoryButtonGroup from '@components/admin/QACategoryButtonGroup';
import Chatbot from '@components/chatbot/ChatBot';

function ListQnaPost() {
  const [noticePosts, setNoticePosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastPostId, setLastPostId] = useState(null);
  const [qnaCategory, setQnaCategory] = useState(null);

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
    fetchQnaPosts();
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
          fetchQnaPosts(latestPostId, true);
        }
      } catch (error) {
        console.error(error);
      }
    }
    fetchLatestPostId();
  }, []);


  const fetchQnaPosts = async (lastPostId = null, initialLoad = false) => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    try {
        let params = {
          noticePostCategoryNo: 2,
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
        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 80 && hasMore && !isLoading) {
        fetchQnaPosts(lastPostId);
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
          searchCategoryNo: 2,
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

  const fetchQnaPostsByCategory = async (qnaCategory) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/selectQnaByCategory?qnaCategory=${qnaCategory}`);
      setNoticePosts(response.data);  // 데이터를 받아와서 상태를 업데이트 합니다.
      console.log("오웅ㅇ", qnaCategory )
    } catch (error) {
      console.error(`Failed to fetch posts: ${error}`);
    }
  };
  
  const handleCategoryChange = (qnaCategory) => {
    setQnaCategory(qnaCategory);
    fetchQnaPostsByCategory(qnaCategory);
  };

  return (
    <Box sx={{ marginTop: '14%', marginLeft: '1%', marginRight: '1%' }}>
        <Chatbot />
      <CommonTop pageName="자주 묻는 질문" prevPath="/community/profile/mine" />
      <AdminTabs />
      <Stack spacing={2.5}>
        {myData && myData.role == 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', alignItems: 'center', margin: '10px' }}>
            {myData && myData.role == 1 && (
              
                <Link to="/notice/addNoticePost" style={{ marginLeft: '2%', width: '35%' }}>
                  <Button variant="contained">FAQ 작성</Button>
                </Link>

            )}
            <TextField
              style={{ marginRight: '3%' }}
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="제목, 내용 검색"
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch} >
                    <SearchIcon color="primary" style={{ marginRight: '-13px' }} />
                  </IconButton>
                ),
                sx: { height: '38px', width: '200px' },
              }}
            />
          </Box>
        )}
        {myData && myData.role != 1 && (
          <TextField
          style={{ marginRight: '3%' }}
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="제목, 내용 검색"
            InputProps={{
              endAdornment: (
                <IconButton onClick={handleSearch}>
                  <SearchIcon color="primary" style={{ marginRight: '-13px' }} />
                </IconButton>
              ),
              sx: { height: '38px', width: '180px', marginLeft : '49%', marginBottom: '-10px'},
            }}
            
          />
        )}
        <QACategoryButtonGroup onChange={handleCategoryChange} /> {/* 추가된 부분 */}
        <List component="nav">
          {(Array.isArray(noticePosts) ? noticePosts : []).map((noticePost, index) => (
            noticePost && <div key={noticePost.noticePostNo}>
              <ListItem button onClick={() => handlePostClick(noticePost.noticePostNo)}>
                <ListItemText primary={noticePost.noticePostTitle} secondary={noticePost.noticePostRegDate.split('T')[0]} />
              </ListItem>
              {index < noticePosts.length - 1 && <Divider />}
            </div>
          ))}
        </List>
        {isLoading && <Typography align="center">Loading...</Typography>}
      </Stack>
    </Box>
  );
}

export default ListQnaPost;