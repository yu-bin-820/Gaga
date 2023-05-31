import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

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
    navigate(`/getNoticePost/${noticePostNo}`);
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
      const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getNoticePostList`, {
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', width: '100%' }}>
      <button onClick={() => window.history.back()} style={{ alignSelf: 'flex-start' }}>☜</button>
      <h2 style={{ textAlign: 'center', margin: '1rem 0' }}>공지사항</h2>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1rem', alignItems: 'center' }}>
        <input type="text" value={searchKeyword} onChange={(e) => setSearchKeyword(e.target.value)} style={{ marginRight: '0.5rem' }} />
        <button onClick={handleSearch}>검색</button>
      </div>
      <ul className="notice-post-list" style={{ listStyle: 'none', textAlign: 'center' }}>
        {filteredNoticePosts.map((noticePost, index) => (
          <li
            key={noticePost.noticePostNo}
            style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', textAlign: 'center' }}
            ref={index === filteredNoticePosts.length - 1 ? containerRef : null}
          >
            <Link
              to={`/getNoticePost/${noticePost.noticePostNo}`}
              onClick={() => handlePostClick(noticePost.noticePostNo)}
              style={{ textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}
            >
              <h3 style={{ margin: 0 }}>{noticePost.noticePostTitle}</h3>
              <h6 style={{ margin: 0 }}>{noticePost.noticePostRegDate.split('T')[0]}</h6>
            </Link>
          </li>
        ))}
      </ul>
      {isLoading && <div style={{ textAlign: 'center' }}>Loading...</div>}
      <Link to="/addNoticePost" style={{ alignSelf: 'flex-end', margin: '1rem' }}>
        <button>공지사항 작성</button>
      </Link>
    </div>
  );
}

export default ListNoticePost;