import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Button, TextField, Box, Stack, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';

function ListQnaPost() {
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
    fetchQnaPosts();
  }, []);

  useEffect(() => {
    filterQnaPosts();
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

  const fetchQnaPosts = async () => {
    try {
      const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePostList`, {
        params: {
          page,
          limit: 6,
          noticePostCategoryNo: 2, // 카테고리 번호 2인 Q&A 게시물 가져오기
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
    filterQnaPosts();
  };

  const filterQnaPosts = () => {
    const filteredPosts = noticePosts.filter((qnaPost) => {
      const { noticePostTitle, noticePostText } = qnaPost;
      const lowerCaseKeyword = searchKeyword.toLowerCase();
      return (
        noticePostTitle.toLowerCase().includes(lowerCaseKeyword) ||
        noticePostText.toLowerCase().includes(lowerCaseKeyword)
      );
    });
    setFilteredNoticePosts(filteredPosts);
  };

  const increasePostCount = async (qnaPostNo) => {
    try {
      await axios.put(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/increasePostCount`, {
        noticePostNo: qnaPostNo,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ marginTop: '64px', marginLeft: '10px', marginRight: '10px' }}>
      <Stack spacing={2.5}>
        <Button onClick={() => window.history.back()}>☜</Button>
        <Typography variant="h4" component="h2" align="center" marginY="1rem">
          Q&A
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', alignItems: 'center' }}>
          <TextField
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            style={{ marginRight: '0.5rem' }}
          />
          <Button variant="contained" onClick={handleSearch}>
            검색
          </Button>
        </Box>
        <List component="nav">
          {filteredNoticePosts.map((qnaPost, index) => (
            <div key={qnaPost.noticePostNo}>
              <ListItem button onClick={() => { handlePostClick(qnaPost.noticePostNo); increasePostCount(qnaPost.noticePostNo); }}>
                <ListItemText primary={qnaPost.noticePostTitle} secondary={qnaPost.noticePostRegDate.split('T')[0]} />
              </ListItem>
              {index < filteredNoticePosts.length - 1 && <Divider />}
            </div>
          ))}
        </List>
        {isLoading && <Typography align="center">Loading...</Typography>}
        <Link to="/qna/addQnaPost">
          <Button variant="contained">Q&A 작성</Button>
        </Link>
      </Stack>
    </Box>
  );
}

export default ListQnaPost;
