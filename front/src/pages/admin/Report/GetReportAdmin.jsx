import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const GetReportAdmin = () => {
  const { reportNo } = useParams();
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_SPRING_HOST}/rest/admin/getReportAdmin/reportNo/${reportNo}`);
        setReport(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReport();
  }, [reportNo]);

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
        return '신고';
    }
  };

  const goBack = () => {
    navigate(-1); // 뒤로 가기
  };

  const goHome = () => {
    navigate('/'); // 홈으로 이동
  };

  return (
    <>
      <h2>신고조회</h2>
      <button onClick={goBack}>뒤로 가기</button>
      <button onClick={goHome}>홈으로 돌아가기</button>
      {report ? (
        <div>
          <p>피신고자: {report.reportedNo}</p>
          <p>신고자: {report.reportingNo}</p>
          <p>신고사유: {getReportReason(report.reportCategoryNo)}</p>
          <p>신고날짜: {report.reportDate}</p>
          <p>신고내용: {report.reportContent}</p>
          <p>신고사진: {report.reportImg}</p>
        </div>
      ) : (
        <p>신고 정보를 불러오는 중입니다...</p>
      )}
    </>
  );
};

export default GetReportAdmin;