import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';


function GetNoticePost() {
  const [noticePost, setNoticePost] = useState({});
  const { noticePostNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePost/noticePostNo/${noticePostNo}`)
      .then((response) => {
        setNoticePost(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [noticePostNo]);

  const handleDelete = () => {
    if (window.confirm('정말로 공지사항을 삭제하시겠습니까?')) {
      axios
        .delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/deleteNoticePost/noticePostNo/${noticePostNo}`)
        .then(() => {
          console.log('공지사항 삭제 완료');
          navigate('/listNoticePost');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleUpdate = () => {
    navigate(`/notice/updateNoticePost/noticePostNo/${noticePostNo}`, { state: { noticePost } });
  };

  return (
    <Box sx={{ margin: '2rem', padding: '1rem' }}>
      <Typography variant="h4" gutterBottom>공지사항 조회</Typography>
      <Paper elevation={3} sx={{ padding: '2rem' }}>
        <Typography variant="body1"><strong>번호:</strong> {noticePost.noticePostNo}</Typography>
        <Typography variant="body1"><strong>제목:</strong> {noticePost.noticePostTitle}</Typography>
        <Typography variant="body1"><strong>내용:</strong> {noticePost.noticePostText}</Typography>
        <Typography variant="body1"><strong>이미지:</strong> {noticePost.noticePostImg}</Typography>
        <img src={`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getImage/${noticePost.noticePostImg}`} alt="공지사항 이미지" />
      </Paper>
      <Grid container spacing={2} sx={{ marginTop: '1rem' }}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handleUpdate}>수정</Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="secondary" onClick={handleDelete}>삭제</Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default GetNoticePost;