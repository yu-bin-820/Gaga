import MeetingThumbnail from '@components/meeting/MeetingThumnail';
import useSearchMeetingFormStore from '@hooks/meeting/useSearchMeetingFormStore';
import CommonTop from '@layouts/common/CommonTop';
import { Button } from '@mui/material';
import { Box, margin } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const ListSearchMeeting = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [meetingList, setMeetingList] = useState();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);


    const {
        searchKeyword,
      } = useSearchMeetingFormStore();

    useEffect(() => {
        fetchData();
      }, [searchKeyword]);

      useEffect(() => {
        // 스크롤 이벤트 리스너 등록
        window.addEventListener('scroll', handleScroll);
        return () => {
          // 컴포넌트 언마운트 시 스크롤 이벤트 리스너 해제
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      const fetchData = async () => {
        setLoading(true);
        const data = {
            currentPage: currentPage,
            searchKeyword: searchKeyword,
        };

        console.log(data)
    
        const response
         = await axios.post(
          `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/search`,
          data
        )
        const newData = await response.data;

        console.log(newData)
    
        setMeetingList((prevData) => [...(prevData || []), ...newData]);
        setCurrentPage((prevPage) => prevPage + 1);
        setLoading(false);
      };

    const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading
        ) {
          fetchData();
        }
        };

    return (
        <div>
          <CommonTop />
            <Box sx={{ bgcolor: '#ededed' }}>
            <Box sx={{ marginTop: '70px', marginBottom: '136px'}}>
                {meetingList?.map((meeting,i)=>(
                    
                    <Box key={i}
                    sx={{
                      margin: 0.3,
                      borderRadius: 3,
                      p: 2,
                      minWidth: 300,
                      padding: 1,
                      backgroundColor: '#ffffff',
                      marginLeft: '5px',
                      marginRight: '5px',
                      marginTop: '7px'
                  }}>
                    <MeetingThumbnail meeting={meeting}/>
                    </Box>
                    
                ))}
            </Box>
        </Box>
        </div>
    );
};

export default ListSearchMeeting;