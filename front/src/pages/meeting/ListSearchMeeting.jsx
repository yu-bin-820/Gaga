import MeetingThumbnail from '@components/meeting/MeetingThumnail';
import useSearchMeetingFormStore from '@hooks/meeting/useSearchMeetingFormStore';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
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


      const onClickMeeting=useCallback((event)=>{
        const { id } = event.target;
        navigate(`/meeting/meetingno/${id}`);
    },[]);

    const handleScroll = () => {
        if (
          window.innerHeight + window.scrollY >= document.body.offsetHeight && !loading
        ) {
          fetchData();
        }
        };

    return (
        <div>
            <Box>
            <Box sx={{ marginBottom: '136px'}}>
                {meetingList?.map((meeting,i)=>(
                    
                    <Box key={i}>
                    <MeetingThumbnail meeting={meeting}/>
                    <h5>{meeting.state}</h5>
                    <Button
                    id={meeting.meetingNo}
                    onClick={onClickMeeting}>미팅정보</Button>
                    </Box>
                    
                ))}
            </Box>
        </Box>
        </div>
    );
};

export default ListSearchMeeting;