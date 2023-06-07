import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, ImageList, ImageListItem, Stack } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

function UpdateNoticePost() {
  const { noticePostNo } = useParams();
  const location = useLocation();
  const initialNoticePost = location.state?.noticePost || {};
  const navigate = useNavigate();
  const [noticePost, setNoticePost] = useState(initialNoticePost);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!noticePost.noticePostNo) {
      axios
        .get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePost/${noticePostNo}`)
        .then((response) => {
          setNoticePost(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [noticePostNo, noticePost.noticePostNo]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNoticePost((prevNoticePost) => ({
      ...prevNoticePost,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpdate = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('noticePostTitle', noticePost.noticePostTitle);
    formData.append('noticePostText', noticePost.noticePostText);
    formData.append('noticePostCategory', noticePost.noticePostCategoryNo); // 변경된 필드명
    formData.append('userNo', noticePost.userNo);

    axios
      .put(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/updateNoticePost/noticePostNo/${noticePostNo}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }, // Content-Type 설정 추가
      })
      .then((response) => {
        console.log(response.data);
        navigate(`/notice/getNoticePost/noticePostNo/${noticePostNo}`);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Box sx={{ marginTop: '64px', marginLeft: '10px', marginRight: '10px' }}>
      <Typography variant="h5" gutterBottom>
        공지사항 업데이트
      </Typography>
      <Stack spacing={2}>
        <TextField
          label="제목"
          name="noticePostTitle"
          value={noticePost.noticePostTitle || ''}
          onChange={handleChange}
        />
        <TextField
          label="내용"
          name="noticePostText"
          multiline
          rows={4}
          value={noticePost.noticePostText || ''}
          onChange={handleChange}
        />
        <TextField
          select
          label="카테고리"
          name="noticePostCategoryNo"
          value={noticePost.noticePostCategoryNo || ''}
          onChange={handleChange}
        >
          <MenuItem value={0}>공지사항</MenuItem>
          <MenuItem value={1}>이벤트</MenuItem>
          <MenuItem value={2}>QnA</MenuItem>
        </TextField>
        <ImageList cols={1} rowHeight={180}>
          <ImageListItem key="Update Image">
            {selectedImage ? (
              <img src={selectedImage} alt="" />
            ) : (
              <Button
                variant="outlined"
                startIcon={<PhotoCamera />}
                color="primary"
                component="label"
              >
                이미지 업로드
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={handleFileChange} // 변경된 이벤트 핸들러 사용
                />
              </Button>
            )}
          </ImageListItem>
        </ImageList>
        <Button variant="contained" onClick={handleUpdate}>
          업데이트
        </Button>
      </Stack>
    </Box>
  );
}

export default UpdateNoticePost;