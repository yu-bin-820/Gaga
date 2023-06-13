import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, Typography, Paper, Grid, IconButton } from '@mui/material';
import { Edit, Delete, List } from '@mui/icons-material';
import InfoIcon from '@mui/icons-material/Info';
import CommonTop from '@layouts/common/CommonTop';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

function GetNoticePost() {
  const [noticePost, setNoticePost] = useState({});
  const { noticePostNo } = useParams();
  const navigate = useNavigate();

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
          navigate('/notice/listNoticePost');
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  function getCategoryText(categoryNo) {
    switch (categoryNo) {
      case 0:
        return "공지사항";
      case 1:
        return "이벤트";
      case 2:
        return "Q&A";
      default:
        return "";
    }
}
  const handleUpdate = () => {
    navigate(`/notice/updateNoticePost/noticePostNo/${noticePostNo}`, { state: { noticePost } });
  };
  const handleList = () => {
    navigate(`/notice/listNoticePost`, { state: { noticePost } });
  };

  return (
    <Box sx={{ margin: '1rem', padding: '0.1rem', paddingTop: '0.9rem',backgroundColor: '#f5f5f5', borderRadius: '10px' }}>
    <CommonTop
              pageName= {getCategoryText(noticePost.noticePostCategoryNo) + " 조회"}
              prevPath="/notice/listNoticePost"
          />
    <Typography variant="h4" gutterBottom style={{ display: 'flex', alignItems: 'center' }}>
      
    </Typography>
    <Paper elevation={3} sx={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '10px', marginTop: '35px' , marginBottom: '1rem' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <Typography variant="body1" >게시글 번호 {noticePost.noticePostNo}</Typography>
        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}>게시글 카테고리 :{getCategoryText(noticePost.noticePostCategoryNo)}</Typography>

        </Grid>
        <Grid item xs={12} md={2}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}></Typography>
          <Typography variant="body1" style={{ fontWeight: 'bold' }} >{noticePost.noticePostTitle}</Typography>
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="body1" style={{ fontWeight: 'bold' }}></Typography>
          <Typography variant="body1">{noticePost.noticePostText}</Typography>
          {noticePost.noticePostImg && (
  <img
    src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/admin/${noticePost.noticePostImg}`}
    alt="공지사항 이미지"
    style={{  maxWidth: '90vw',
    maxHeight: '30vh',
    display: 'block',
    margin: '0 auto',}}
  />
)}
        </Grid>
      </Grid>
    </Paper>
    <Grid container justifyContent="center" alignItems="center" spacing={3}>
    {myData && myData.role == 1 && (
        <>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<Edit />} onClick={handleUpdate} style={{ fontWeight: 'bold' }}>
          수정
        </Button>
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<Delete />} onClick={handleDelete} style={{ fontWeight: 'bold' }}>
          삭제
        </Button>
      </Grid>
      </>
    )}
      <Grid item>
        <Button variant="contained" color="primary" startIcon={<List />} onClick={handleList} style={{ fontWeight: 'bold' }}>
          목록
        </Button>
      </Grid>
    </Grid>
  </Box>
);
}
export default GetNoticePost;