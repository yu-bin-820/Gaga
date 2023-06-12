import MeetingThumbnail from '@components/meeting/MeetingThumnail';
import useSearchMeetingFormStore from '@hooks/meeting/useSearchMeetingFormStore';
import CommonTop from '@layouts/common/CommonTop';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { Box, margin } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ListSearchMeeting = () => {
  const [meetingList, setMeetingList] = useState();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { searchKeyword, currentPage, setField } = useSearchMeetingFormStore();

  const onClickSearch = useCallback(() => {
    navigate(`/meeting/meetinglist`);
    console.log(searchKeyword);
    setField('currentPage', 1);
  }, [navigate, searchKeyword]);



  useEffect(() => {
    fetchData(currentPage);
  }, []);

  // useEffect(() => {
  //   // 스크롤 이벤트 리스너 등록
  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 해제
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [currentPage]);

  const fetchData =useCallback( async (page) => {
    setLoading(true);
    const data = {
      currentPage: page,
      searchKeyword: searchKeyword,
    };

    console.log(data);

    const response = await axios.post(
      `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/search`,
      data
    );
    const newData = await response.data;

    console.log(newData);

    setMeetingList((prevData) => [...(prevData || []), ...newData]);
    setLoading(false);
  },[searchKeyword]);

  // const loadNextPage =useCallback(() => {
  //   setField('currentPage', currentPage + 1);
  //   fetchData(currentPage);
  // },[currentPage, setField, fetchData]);

  // const handleScroll =useCallback( () => {
  //   if (
  //     window.innerHeight + window.scrollY >= document.body.offsetHeight &&
  //     !loading
  //   ) {
  //     loadNextPage();
  //   }
  // },[loadNextPage, loading]);

  return (
    <div>
      <CommonTop />
      <Box>
      <Grid container spacing={2} alignItems="center">
          <Grid item></Grid>
          <Grid item xs>
            <TextField
              fullWidth
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'default' },
              }}
              variant="standard"
              value={searchKeyword}
              onChange={(e) => setField('searchKeyword', e.target.value)}
            />
          </Grid>
          <Grid item>
            <Tooltip title="Reload">
              <IconButton onClick={onClickSearch}>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        </Box>
      <Box sx={{ bgcolor: '#ededed' }}>
        <Box sx={{ paddingTop: '66px', paddingBottom: '20px', marginBottom: '136px', bgcolor: '#ededed' }}>
          {meetingList?.map((meeting, i) => (
            <Box
              key={i}
              sx={{
                marginLeft: 1.5,
                marginRight: 1.5,
                marginTop: 0.5,
                marginBottom: 2,
                borderRadius: 3,
                p: 2,
                minWidth: 300,
                padding: 1.3,
                backgroundColor: '#ffffff',
              }}
            >
              <MeetingThumbnail meeting={meeting} />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default ListSearchMeeting;
