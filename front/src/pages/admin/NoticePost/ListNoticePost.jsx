import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, TextField, Box, Stack, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import CenteredTabsAdmin from '@components/admin/CenteredTabsAdmin';


function ListNoticePost() {
  const [noticePosts, setNoticePosts] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [filteredNoticePosts, setFilteredNoticePosts] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handlePostClick = (noticePostNo) => {
    navigate(`/notice/getNoticePost/noticePostNo/${noticePostNo}`);
  };

  useEffect(() => {
    fetchNoticePosts();
  }, []);

  useEffect(() => {
    filterNoticePosts();
  }, [noticePosts, searchKeyword]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 0.1,
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [filteredNoticePosts]);

  const fetchNoticePosts = async () => {
    try {
      const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePostListByCategoryNo`, {
        params: {
          page,
          limit: 6,
        },
      });

      const newNoticePosts = response.data;
      setNoticePosts((prevPosts) => {
        const uniquePosts = [...prevPosts, ...newNoticePosts];
        return Array.from(new Set(uniquePosts.map((post) => post.noticePostNo))).map((noticePostNo) =>
          uniquePosts.find((post) => post.noticePostNo === noticePostNo)
        );
      });

      if (newNoticePosts.length === 0) {
        setHasMore(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1);
      setIsLoading(true);
    }
  };

  const handleSearch = () => {
    filterNoticePosts();
  };

  const filterNoticePosts = () => {
    const filteredPosts = noticePosts.filter((noticePost) => {
      const { noticePostTitle, noticePostText } = noticePost;
      const lowerCaseKeyword = searchKeyword.toLowerCase();
      return (
        noticePostTitle.toLowerCase().includes(lowerCaseKeyword) ||
        noticePostText.toLowerCase().includes(lowerCaseKeyword)
      );
    });
    setFilteredNoticePosts(filteredPosts);
  };

  return (
    <Box sx={{ marginTop: '64px', marginLeft: '10px', marginRight: '10px' }}>
      <Stack spacing={2.5}>        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CenteredTabsAdmin />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', alignItems: 'center' }}>
          <TextField type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} style={{ marginRight: '0.5rem' }} />
          <Button variant="contained" onClick={handleSearch}>검색</Button>
        </Box>
        <Link to="/notice/addNoticePost">
          <Button variant="contained">공지사항 작성</Button>
        </Link>
        <List component="nav">
          {filteredNoticePosts.map((noticePost, index) => (
            <div key={noticePost.noticePostNo}>
              <ListItem button onClick={() => handlePostClick(noticePost.noticePostNo)}>
                <ListItemText primary={noticePost.noticePostTitle} secondary={noticePost.noticePostRegDate.split('T')[0]} />
              </ListItem>
              {index < filteredNoticePosts.length - 1 && <Divider />}
            </div>
          ))}
        </List>
        {isLoading && <Typography align="center">Loading...</Typography>}
        
      </Stack>
    </Box>
  );
}

export default ListNoticePost;