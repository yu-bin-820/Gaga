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
    const categoryNo = noticePost.noticePostCategoryNo; // noticePost 객체에서 categoryNo 값을 가져옴
    const noticePostCategoryNo = noticePost.noticePostCategoryNo;
    if (window.confirm(`정말로 이 ${getCategoryText(categoryNo)}글을 삭제하시겠습니까?`)) {
      axios
        .delete(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/deleteNoticePost/noticePostNo/${noticePostNo}`)
        .then(() => {
          console.log('공지사항 삭제 완료');
          navigate(`/notice/list${getCategoryBack(noticePostCategoryNo)}Post`);
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
        return "자주묻는 질문";
      default:
        return "";
    }
}

function getCategoryBack(noticePostCategoryNo) {
    switch (noticePostCategoryNo) {
      case 0:
        return "Notice";
      case 1:
        return "Event";
      case 2:
        return "Qna";
      default:
        return "";
    }
}
const noticePostCategoryNo = noticePost.noticePostCategoryNo;
const prevPath = `/notice/list${getCategoryBack(noticePostCategoryNo)}Post`;

  const handleUpdate = () => {
    navigate(`/notice/updateNoticePost/noticePostNo/${noticePostNo}`, { state: { noticePost } });
  };
  const handleList = () => {
    navigate(`/notice/list${getCategoryBack(noticePostCategoryNo)}Post`);
  };

  return (
    <Box sx={{ margin: '0.5rem', padding: '0rem', paddingTop: '0.9rem', backgroundColor: '#ffffff', borderRadius: '0px' }}>
      <CommonTop
        pageName={getCategoryText(noticePost.noticePostCategoryNo) + " 조회"}
        prevPath={prevPath}
      />
  
      <Box sx={{ padding: '1rem', backgroundColor: '#ffffff',  marginTop: '35px', marginBottom: '1rem', boxShadow: 'none',  minWidth:'10rem', borderBottom: '0.2px solid gray' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h7" style={{ fontWeight: 'bold' }}> 
              [{getCategoryText(noticePost.noticePostCategoryNo)}] {noticePost.noticePostTitle}
            </Typography>
            <Typography variant="body1" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>GAGA 운영자</span>
              <span>{noticePost.noticePostRegDate ? noticePost.noticePostRegDate.split('T')[0] : ''}</span>
            </Typography>
          </Grid>
        </Grid>
      </Box>
  
      <Box sx={{ padding: '1rem', backgroundColor: '#ffffff', borderRadius: '0px', marginTop: '15px', marginBottom: '1rem', boxShadow: 'none' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              {noticePost.noticePostText ? noticePost.noticePostText.split('\n').map((line, i) => (
                <div key={i}>{line}</div>
              )) : ''}
            </Typography>
            {noticePost.noticePostImg && (
              <img
                src={`${import.meta.env.VITE_CDN_HOST}/upload_images/admin/${noticePost.noticePostImg}?type=sh&sharp_amt=1.0`}
                alt="공지사항 이미지"
                style={{ maxWidth: '83vw', display: 'block', objectFit: 'contain', maxHeight: 'auto' }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
  
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