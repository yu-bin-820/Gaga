import { Button } from '@mui/material';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';


const AddMeetingMember = () => {
    const { meetingno } = useParams();
    const [meeting, setMeeting] = useState();
    const navigate = useNavigate();
    const { data: myData, mutate: mutateMe } = useSWR(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

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

        const onClickAddMember = useCallback(
            async (event) => {
                event.preventDefault();
    
                try {
                const data = {
                    meetingNo: meeting?.meetingNo,
                    userNo: myData.userNo
                };
    
                console.log(data);
    
                const response = await axios.post(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`, data);
    
                navigate(`/`);
                    
                } catch (error) {
                    console.error(error);
                }
            },
            [meeting, navigate]
        );

        console.log(myData)
    return (
        <Box sx={{marginTop:'64px'}}>
                <Button onClick={onClickAddMember}>신청하기</Button>
        </Box>
    );
};

export default AddMeetingMember;