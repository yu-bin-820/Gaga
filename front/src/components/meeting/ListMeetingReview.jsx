import { Button } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const ListMeetingReview = () => {
    const { meetingno } = useParams();
    const [meetingReviewList, setMeetingReviewList] = useState();
    const navigate = useNavigate();


    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${meetingno}`)
            .then((response)=>{
                console.log(response.data);
                setMeetingReviewList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
        },[]);

        const onClickMeetingReviewUpdate = React.useCallback((MouseEvent)=>{
            const { id } = event.target;
            navigate(`/meeting/updatemeetingsuccess/meetingno/${id}`);
            },[]);

    return (
        <Box>
            <Box>
                {meetingReviewList?.map((meetingReview,i)=>(
                    <Box key={i}>
                    <h5>{meetingReview.meetingScore}</h5>
                    <h5>{meetingReview.meetingReviewImg}</h5>
                    <Button 
                    id={meetingReview.meetingReviewNo}
                    onClick={onClickMeetingReviewUpdate}>수정하기</Button>
                    </Box>
                    
                ))}
            </Box>
        </Box>
    );
};

export default ListMeetingReview;