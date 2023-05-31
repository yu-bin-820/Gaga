import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ListBlackList() {
  const [blacklist, setBlacklist] = useState([]);
  const [filteredBlacklist, setFilteredBlacklist] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    fetchBlacklist();
  }, []);

  useEffect(() => {
    filterBlacklist();
  }, [searchText]);

  const fetchBlacklist = async () => {
    try {
      const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getBlackListList`);
      const blacklist = response.data.filter((user) => user.blacklist !== 0);
      setBlacklist(blacklist);
      setFilteredBlacklist(blacklist);
    } catch (error) {
      console.error(error);
    }
  };

  const filterBlacklist = () => {
    const filteredList = blacklist.filter((user) =>
      user.userName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredBlacklist(filteredList);
  };

  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>블랙리스트 목록</h2>
      <input type="text" value={searchText} onChange={handleSearch} placeholder="검색" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {filteredBlacklist.map((user) => (
          <div key={user.userNo}>
            <Link to={`/getBlackList/${user.userNo}`}>
              <span>{user.userName}</span>
            </Link>
            <hr style={{ width: '50%', margin: '10px auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListBlackList;