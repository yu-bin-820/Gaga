import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Box, Button, TextField, Typography, MenuItem, ImageList, ImageListItem, Stack } from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import CommonTop from '@layouts/common/CommonTop';
import useSWR from "swr";
import fetcher from "@utils/fetcher";

function UpdateNoticePost() {
  const { noticePostNo } = useParams();
  const location = useLocation();
  const initialNoticePost = location.state?.noticePost || {};
  const navigate = useNavigate();
  const [noticePost, setNoticePost] = useState(initialNoticePost);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedThumbNailImage, setSelectedThumbNailImage] = useState(null);
  const [selectedThumbNailFile, setSelectedThumbNailFile] = useState(null);
  const [qnaCategory, setQnaCategory] = useState(0);
  const [noticePostCategory, setNoticePostCategoryNo] = useState(0); // 카테고리 선택 상태값
  
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
);

useEffect(() => {
    if (myData) {
        const { userNo, role } = myData;
        console.log(userNo, role, "유저넘버랑 권한");

        if (role !== 1) {
            alert("권한이 없습니다.");
            window.history.back();
        }
    }
}, [myData]);

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
      previousFile: prevNoticePost.file,
      previousImage: prevNoticePost.image,
    }));
  };

  const handleFileChange = (event) => {
    if (!event.target.files.length) {
      // 파일이 선택되지 않았을 때는 아무것도 하지 않습니다.
      return;
    }
    const file = event.target.files[0];
    setSelectedFile(file);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleUpdate = () => {
    const formData = new FormData();
    if (selectedFile) {
        formData.append('file', selectedFile);
    }
    formData.append('noticePostTitle', noticePost.noticePostTitle);
    formData.append('noticePostText', noticePost.noticePostText);
    formData.append('noticePostCategory', noticePost.noticePostCategoryNo); // 변경된 필드명
    formData.append('userNo', noticePost.userNo);
    if (noticePostCategory === 1) {
        formData.append("thumbNailFile", selectedThumbNailFile);
    }
    if (noticePostCategory === 2) {
        formData.append("qnaCategory", qnaCategory);
    }

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

  function getCategoryText(noticePostCategoryNo) {
    switch (noticePostCategoryNo) {
      case 0:
        return "공지사항";
      case 1:
        return "이벤트";
      case 2:
        return "FAQ";
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

useEffect(() => {
    setNoticePostCategoryNo(noticePost.noticePostCategoryNo);
}, [noticePost.noticePostCategoryNo]);

  return (
    <Box sx={{ marginTop: '64px', marginLeft: '10px', marginRight: '10px' }}>
      <Typography variant="h5" gutterBottom>
      <CommonTop
              pageName= {getCategoryText(noticePost.noticePostCategoryNo) + " 수정"}
              prevPath= {prevPath}
          />
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
                    value={noticePostCategory}
                    onChange={(e) =>
                        setNoticePostCategoryNo(Number(e.target.value))
                    }
                >
                    <MenuItem value={0}>공지사항</MenuItem>
                    <MenuItem value={1}>이벤트</MenuItem>
                    <MenuItem value={2}>QnA</MenuItem>
                </TextField>
        {noticePostCategory === 2 && (
                    <TextField
                        select
                        label="FAQ카테고리"
                        value={qnaCategory}
                        onChange={(e) => setQnaCategory(Number(e.target.value))}
                    >
                        <MenuItem value={1}>회원</MenuItem>
                        <MenuItem value={2}>모임</MenuItem>
                        <MenuItem value={3}>클럽</MenuItem>
                        <MenuItem value={4}>채팅</MenuItem>
                        <MenuItem value={5}>서비스</MenuItem>
                        <MenuItem value={6}>기타</MenuItem>
                    </TextField>
                )}
<ImageList cols={1} rowHeight={180}>
  <ImageListItem key="Update Image">
    {selectedImage || noticePost.image ? (
      <img src={selectedImage || noticePost.file} alt="" />
    ) : (
      <Button
        variant="outlined"
        startIcon={<PhotoCamera />}
        color="primary"
        component="label"
      >
        이미지 수정
        <input
          hidden
          accept="image/*"
          type="file"
          onChange={handleFileChange}
        />
      </Button>
    )}
  </ImageListItem>
</ImageList>
        {noticePostCategory === 1 && (
  <Button
    variant="outlined"
    startIcon={<PhotoCamera />}
    color="primary"
    component="label"
  >
    썸네일 수정
    <input
      hidden
      accept="image/*"
      type="file"
      onChange={(event) => {
        const thumbNailFile = event.target.files[0];
        setSelectedThumbNailFile(thumbNailFile);
        setSelectedThumbNailImage(
          URL.createObjectURL(thumbNailFile)
        );
      }}
    />
  </Button>
)}
{noticePostCategory === 1 && (
  <Box>
    {selectedThumbNailImage ? (
      <img
        style={{
          minWidth: "370px",
          minHeight: "100px",
          maxWidth: "370px",
          maxHeight: "150px",
        }}
        src={selectedThumbNailImage}
      />
    ) : (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          backgroundColor: "grey",
          display: "flex", flexDirection: "column", gap: "16px" ,
          alignItems: "center",
          justifyContent: "center",
          minWidth: "300px",
          minHeight: "100px",
          maxWidth: "300px",
          maxHeight: "100px",
        }}
      >
        <Typography
          sx={{
            fontSize: "1.2rem",
            color: "white",
            fontWeight: "bold",
          }}
        >
          No Img
        </Typography>
      </Box>
    )}
  </Box>
)}
        <Button variant="contained" onClick={handleUpdate}>
          업데이트
        </Button>
      </Stack>
    </Box>
  );
}

export default UpdateNoticePost;