import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function GetBlackList() {
  const { userNo } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getBlackList/userNo/${userNo}`);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.userName}의 정보</h2>
      <p>User ID: {user.userId}</p>
      {/* 추가적인 유저 정보 표시 */}
    </div>
  );
}

export default GetBlackList;