import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const listReportAdmin = () => {
  const [reports, setReports] = useState([]);
  const navigate = useNavigate();


  if (!reports) {
    return <div>잠시만 기다려주세요</div>; // 데이터를 불러오는 동안 보여줄 메시지
}

  console.log("아름다워!", reports);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getReportAdminList`);
        setReports(response.data);
        console.log("아름다워", response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleReportClick = (reportedNo) => {
    console.log("handleReportClick 호출됨:", reportedNo);
    navigate(`/getReportAdmin/${reportedNo}`);
  };

  const getReportReason = (reportCategoryNo) => {
    switch (reportCategoryNo) {
      case 1:
        return '욕설';
      case 2:
        return '성추행';
      case 3:
        return '범죄';
      case 4:
        return '규정위반';
      default:
        return '';
    }
  };
  const formatUserId = (userId) => {
    const atIndex = userId.indexOf('@');
    if (atIndex !== -1) {
      const username = userId.substring(0, atIndex);
      return username;
    }
    return userId;
  };

  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const goHome = () => {
    navigate('/'); // 홈으로 이동
  };

  return (
    <>
      <h2>전체 신고목록</h2>
      <button onClick={goBack}>뒤로 가기</button>
      <button onClick={goHome}>홈으로 돌아가기</button>
      <ul>
        {reports.map((report, index) => (
          <li key={index} onClick={() => handleReportClick(report.reportedNo)}>
            <div style={{ marginBottom: '10px', backgroundColor: index % 2 === 0 ? '#7a0404' : '#752222' }}>
              <p style={{ marginBottom: '5px' }}>신고사유: {getReportReason(report.reportCategoryNo)}</p>
              <p style={{ cursor: 'pointer', marginBottom: '5px' }} onClick={() => handleReportClick(report.reportedNo)}>
                피신고자 ID: {formatUserId(report.userId)}
              </p>
              <p>신고날짜: {report.reportDate}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default listReportAdmin;