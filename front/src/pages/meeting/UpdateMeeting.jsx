import useInput from '@hooks/common/useInput';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const UpdateMeeting = () => {
    const { meetingno } = useParams();
    const [meeting,onChangeMeeting,setMeeting] = useInput('');


    const navigate = useNavigate();
    const handleSubmit = useCallback(
        async => {
            event.preventDefault();
            
            try{
                const data = {
                    meetingName: meeting.meetingName,
                    meetingIntro: meeting.meetingIntro,
                    meetingImg: meeting.meetingImg,
                    filterGender: meeting.meetingGender
                }
            }
        }
    )

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
        <TextField
            fulWidth label="meetingName"
            name="meetingName"
            onChange={onChangeMeeting}
            required value={meeting.meetingName}
            />
        </Box>
    );
};

export default UpdateMeeting;