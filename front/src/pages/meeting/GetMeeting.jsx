import { Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const GetMeeting = () => {

    const { meetingno } = useParams();
    const [meeting, setMeeting] = useState();

    const navigate = useNavigate();
    const onClickUpdate = useCallback((MouseEvent)=>{
        navigate(`/meeting/updatemeetig/${ meetingno }`);
    },[]);

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`)
            .then((response)=>{
                console.log(response.data);
                setMeeting(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[]);

    return (
    <Box sx={{marginTop:'64px'}}>
     <h5>{meeting?.meetingName}</h5>
     <Button onClick={onClickUpdate}>수정하기</Button>
    </Box>
    );
};

export default GetMeeting;