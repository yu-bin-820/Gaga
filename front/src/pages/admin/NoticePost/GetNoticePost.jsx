import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function GetNoticePost() {
  const [noticePost, setNoticePost] = useState({});
  const { noticePostNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePost/${noticePostNo}`)
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
        .delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/deleteNoticePost/${noticePostNo}`)
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
    navigate(`/updateNoticePost/${noticePostNo}`, { state: { noticePost } });
  };

  return (
    <div>
      <h1>공지사항 조회</h1>
      <div>
        <p>번호: {noticePost.noticePostNo}</p>
        <p>제목: {noticePost.noticePostTitle}</p>
        <p>내용: {noticePost.noticePostText}</p>
        <p>이미지: {noticePost.noticePostImg}</p>
        <img src={`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getImage/${noticePost.noticePostImg}`} alt="공지사항 이미지" />
      </div>
      <button onClick={handleUpdate}>수정</button>
      <button onClick={handleDelete}>삭제</button>
    </div>
  );
}

export default GetNoticePost;