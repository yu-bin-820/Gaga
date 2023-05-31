import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SearchUser() {
  const [searchQuery, setSearchQuery] = useState('');
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    fetchUserList();
  }, []);

  const fetchUserList = async () => {
    try {
      const response = await axios.get('http://localhost:8080/rest/admin/listUser');
      setUserList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchMember?q=${searchQuery}`);
      setUserList(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>회원 검색 (관리자 전용)</h2>
      <div>
        <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button onClick={handleSearch}>검색</button>
      </div>
      <div>
        {userList.map((user) => (
          <div key={user.userNo}>
            <Link to={`/admin/user/${user.userNo}`}>{user.userName}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SearchUser;