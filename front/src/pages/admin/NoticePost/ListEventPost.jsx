import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, TextField, Box, Stack, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

import CommonTop from '@layouts/common/CommonTop';

function ListEventPost() {
  const [noticePosts, setNoticePosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [lastPostId, setLastPostId] = useState(null);

  const handlePostClick = (noticePostNo) => {
    navigate(`/notice/getNoticePost/noticePostNo/${noticePostNo}`);
  };

  useEffect(() => {
    fetchEventPosts();
  }, []);

  useEffect(() => {
    const fetchLatestPostId = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getLatestPostId`);
        const latestPostId = response.data;
        setLastPostId(latestPostId);
        fetchEventPosts(latestPostId);
      } catch (error) {
        console.error(error);
      }
    }
    fetchLatestPostId();
    fetchEventPosts();
  }, []);

  const fetchEventPosts = async (lastPostId = null) => {
    if (isLoading) return;

    setIsLoading(true);

    try {
      const params = {
        noticePostCategoryNo : 1,
        lastPostId: lastPostId === null ? undefined : String(lastPostId),
      };

      const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePostListByCategoryNo`, {
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
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.9 && hasMore && !isLoading) {
        fetchEventPosts(lastPostId);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasMore, isLoading, lastPostId]);

  const handleSearch = () => {
    const result = noticePosts.filter((noticePost) => {
      const { noticePostTitle, noticePostText } = noticePost;
      const lowerCaseKeyword = searchKeyword.toLowerCase();
      return (
        noticePostTitle.toLowerCase().includes(lowerCaseKeyword) ||
        noticePostText.toLowerCase().includes(lowerCaseKeyword)
      );
    });
    setFilteredPosts(result);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ marginTop: '64px', marginLeft: '10px', marginRight: '10px' }}>
      <CommonTop pageName="이벤트" prevPath="/community/profile/mine" />
      <Stack spacing={2.5}>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', alignItems: 'center' }}>
          <TextField type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} onKeyPress={handleKeyPress} style={{ marginRight: '0.5rem' }} />
          <Button variant="contained" onClick={handleSearch}>검색</Button>
        </Box>
        <Link to="/event/addNoticePost">
          <Button variant="contained">이벤트 작성</Button>
        </Link>
        <List component="nav">
          {(filteredPosts.length > 0 ? filteredPosts : noticePosts).map((noticePost, index) => (
            <div key={noticePost.noticePostNo}>
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

export default ListEventPost;