import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

const MyMeeting = () => {
    
    const [meetingList, setMeetingList] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/list/mymeeting/1`)
            .then((response)=>{
                console.log(response.data);
                setMeetingList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

    const onClickMeeting=useCallback((event)=>{
        const { id } = event.target;
        navigate(`/meeting/meetingno/${id}`);
    },[]);
    return (
        <Box>
            <Box>
                {meetingList?.map((meeting,i)=>(
                    <Box key={i}>
                    <h5>{meeting.meetingName}</h5>
                    <h5>{meeting.state}</h5>
                    <Button id={meeting.meetingNo}>미팅정보</Button>
                    </Box>

                ))}
            </Box>
        </Box>
    );
};

export default MyMeeting;