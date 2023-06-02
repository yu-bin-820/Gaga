import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ListReportAdmin = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/admin/getReportAdminList`);
        setReports(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>전체 신고목록</h2>
      <ul>
        {reports.map((report) => (
          <li key={report.report_no}>
            <p>신고번호: {report.report_no}</p>
            <p>신고자: {report.reporting_id}</p>
            <p>피신고자: {report.reported_id}</p>
            <p>신고사유: {report.report_category_no}</p>
            <p>신고날짜: {report.report_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListReportAdmin;