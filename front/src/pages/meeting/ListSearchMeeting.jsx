import MeetingThumbnail from '@components/meeting/MeetingThumnail';
import useSearchMeetingFormStore from '@hooks/meeting/useSearchMeetingFormStore';
import CommonTop from '@layouts/common/CommonTop';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { Box, margin } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import useSWRInfinite from 'swr/infinite';
import fetcher from '@utils/fetcher';
import makeSection from '@utils/makeSection';


const ListSearchMeeting = () => {
    const boxRef = useRef(null);

  const { searchKeyword, setField } = useSearchMeetingFormStore();

  const getKey = (index, prevPageData) => {
    if (prevPageData && !prevPageData.length) {
      return null;
    }

    return `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/search?page=${index + 1}&searchKeyword=${searchKeyword}`;
  };

    const {
    data: meetingListData,
    mutate: mutateMeetingList,
    setSize,
  } = useSWRInfinite(getKey, fetcher);

  const onScroll = useCallback((e) => {

    // console.log("스크롤 이벤트")
  
    if (      
      e.currentTarget.scrollTop + e.currentTarget.clientHeight == e.currentTarget.scrollHeight
      ) {
        // console.log("스크롤 바닥")
      setSize((prevSize) => prevSize + 1).then(() => {
        const current = boxRef?.current;
        if (current && e.currentTarget) {
          const scrollTopOffset = e.currentTarget.scrollHeight - e.currentTarget.clientHeight - current.scrollHeight;
          current.scrollTo({ top: current.scrollTop + scrollTopOffset });
        }
      });
    }
  
  }, [boxRef, setSize]);

  const meetingList = meetingListData?.flat();


  if (!meetingList) {
    return <>로딩</>;
  }

  console.log(meetingList)

  return (
    <Box
    ref={boxRef}
    onScroll={onScroll}
    style={{
      maxHeight:'100vh',
      overflow: 'scroll',
    }}>

      <CommonTop />
      <Box>
        </Box>
      <Box 
        sx={{ bgcolor: '#ededed' }}
        >
        <Box sx={{ paddingTop: '66px', paddingBottom: '20px', bgcolor: '#ededed' }}>
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
    </Box>
  );
};

export default ListSearchMeeting;
