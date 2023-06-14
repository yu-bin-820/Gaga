import CommonTop from '@layouts/common/CommonTop';
import { ButtonBase, Divider, IconButton, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { DateTime } from 'luxon';
import useCommunityStore from '@stores/communication/useCommunityStore';
import { useLocation, useNavigate } from 'react-router';
import BlackListTabs from '@components/admin/BlackListTabs';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import Chatbot from '@components/chatbot/ChatBot';

const ListReport = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState('');
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { setField } = useCommunityStore();

  const { data: reportListData, mutate: mutateReportList } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/community/report/list/userno/${myData?.userNo}/role/${myData?.role}`,
    fetcher
  );

  const onClickReport = useCallback(
    (e) => {
      console.log(e.currentTarget.dataset.value);
      setField('reportNo', e.currentTarget.dataset.value);
      setField('prevPath', location.pathname);
      navigate('/community/report');
    },
    [navigate, setField, location]
  );

  const handleSearch = async () => {
    if (searchKeyword.length > 0) {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SPRING_HOST}/rest/admin/searchReport`,
          {
            params: {
              searchKeyword: searchKeyword,
            },
          }
        );
        mutateReportList(response.data); // 검색 결과로 데이터 갱신
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ marginTop: "13%", marginLeft: "3%", marginRight: "3%" }}>
      <CommonTop pageName="신고 목록 조회" prevPath="/community/profile/mine" />
      <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
      
      </Box>
      <Chatbot />
      <BlackListTabs />
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
          alignItems: "center",
        }}
      >
        <Box sx={{ flexGrow: 1 }} />
        </Box>
      <TextField
      style={{ marginLeft:'39%', marginRight: '1%' }}
            
    type="text"
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
    onKeyPress={handleKeyPress}
    placeholder="제목, 내용 검색" // 여기에 placeholder를 추가했습니다.
    InputProps={{
      endAdornment: (
        <IconButton onClick={handleSearch}> {/* 버튼을 IconButton으로 변경하고, variant를 제거했습니다. */}
          <SearchIcon color="primary" style={{ marginLeft: '3px' }} /> {/* 검색 아이콘을 사용했습니다. 필요하면 이를 변경하실 수 있습니다. */}
        </IconButton>
      ),
      sx: { height: '38px', width: '200px' },
    }}
  />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: '70vw', maxWidth: '90vw' }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell align="center" sx={{ fontWeight: 600, color: 'white' }}>
                피신고자
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 600, color: 'white' }}>
                신고일자
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reportListData?.map((report, i) => {
              const formattedDate = DateTime.fromISO(report.reportDate).toFormat('yyyy년 MM월 dd일');
              return (
                <TableRow
                  key={i}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  onClick={onClickReport}
                  data-value={report.reportNo}
                >
                  <TableCell align="center" component="th" scope="row">
                    {report.reportedId}
                  </TableCell>
                  <TableCell align="center">{formattedDate}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ListReport;
