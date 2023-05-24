import ListMeetingReview from '@components/meeting/ListMeetingReview';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const GetMeeting = () => {

    const { meetingno } = useParams();
    const [meeting, setMeeting] = useState();

    const navigate = useNavigate();
    const onClickUpdate = useCallback((MouseEvent)=>{
        navigate(`/meeting/updatemeeting/${ meetingno }`);
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

    const onClickDelete = useCallback(
        async (event) => {
            event.preventDefault();

            try {
            const data = {
                meetingNo: meeting?.meetingNo
            };

            console.log(data);

            const response = await axios.delete(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting`, {
                data: data,
            });

            navigate(`/`);
                
            } catch (error) {
                console.error(error);
            }
        },
        [meeting, navigate]
    );

    const onClickAddMember=useCallback((event)=>{
        navigate(`/meeting/member/addmember/${meetingno}`);
    },[]);

    return (
    <Box sx={{marginTop:'64px'}}>
    <h5>{meeting?.meetingName}</h5>
    <Button onClick={onClickUpdate}>수정하기</Button>
    <Button onClick={onClickDelete}>삭제하기</Button>
    <Button onClick={onClickAddMember}>신청하기</Button>
    <ListMeetingReview/>
    </Box>
    );
};

export default GetMeeting;