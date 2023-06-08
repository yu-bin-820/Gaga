import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, Paper, Grid, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';


function GetNoticePost() {
  const [noticePost, setNoticePost] = useState({});
  const { noticePostNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePost/noticePostNo/${noticePostNo}`)
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
        .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/deleteNoticePost/noticePostNo/${noticePostNo}`)
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
    <Box sx={{ margin: '2rem', padding: '1rem', backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
    <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
      <InfoIcon style={{ marginRight: '0.5rem' }} />
      <span style={{ fontWeight: 'bold' }}>공지사항 조회</span>
    </Typography>
    <Paper elevation={3} sx={{ padding: '2rem', backgroundColor: '#ffffff', borderRadius: '10px', marginBottom: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>게시글 번호</Typography>
          <Typography variant="body1">{noticePost.noticePostNo}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}></Typography>
          <Typography variant="body1">{noticePost.noticePostTitle}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}></Typography>
          <Typography variant="body1">{noticePost.noticePostText}</Typography>
          <img
            src={`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getImage/${noticePost.noticePostImg}`}
            alt="공지사항 이미지"
            style={{ maxWidth: '100%', maxHeight: '30vh', marginTop: '1rem' }}
          />
        </Grid>
      </Grid>
    </Paper>
    <Grid container spacing={2}>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<Edit />} onClick={handleUpdate} style={{ fontWeight: 'bold' }}>
          수정
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="secondary" startIcon={<Delete />} onClick={handleDelete} style={{ fontWeight: 'bold' }}>
          삭제
        </Button>
      </Grid>
    </Grid>
  </Box>
);
}
export default GetNoticePost;