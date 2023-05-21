import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';

const ListMeetingMember = () => {
    const { meetingno } = useParams();
    const navigate = useNavigate();


    const onClickUpdateMember = useCallback(
        async (event) => {
            event.preventDefault();

            try {
            const data = {
                meetingNo: meetingno,
                userNo: 2,
                state: 2
            };

            console.log(data);

            const response = await axios.patch(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`, data);
                
            } catch (error) {
                console.error(error);
            }
        },
        []
    );

    const onClickDeleteMember = useCallback(
        async (event) => {
            event.preventDefault();

            try {
            const data = {
                meetingNo: meetingno,
                userNo: 2
            };

            console.log(data);

            const response = await axios.delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/member`, {
                data: data
            });                
            } catch (error) {
                console.error(error);
            }
        },
        []
    );

    return (
        <Box sx={{marginTop:'64px'}}>
        <Button onClick={onClickUpdateMember}>신청받기 </Button>
        <Button onClick={onClickDeleteMember}>거절하기 </Button>
        </Box>
    );
};

export default ListMeetingMember;