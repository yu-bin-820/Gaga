import useInput from '@hooks/common/useInput';
import { Button, Rating, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';

const AddMeetingReveiw = () => {

    const { meetingno } = useParams();
    const [meetingReview, onChangeMeetingReview, setMeetingReview] = useInput({
        meetingScore: '',
        meetingReviewImg: '',
        meetingReviewContent: ''
      });
    
      const { data: myData, mutate: mutateMe } = useSWR(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );
    
      const navigate = useNavigate();
      const handleSubmit = useCallback(async () => {
        event.preventDefault();
    
        try {
          const data = {
            meetingScore: meetingReview.meetingScore,
            meetingReviewImg: meetingReview.meetingReviewImg,
            meetingReviewContent: meetingReview.meetingReviewContent,
            meetingReviewerNo: myData.userNo,
            meetingNo: meetingno

          };
          console.log(data);
          const response = await axios.post(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review`,
            data
    
          );

          navigate(`/meeting/meetingno/${meetingno}`);
    
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }, [meetingReview]);
      return (
        <Box sx={{ marginTop: '64px' }}>
          <Stack spacing={1}>
            <Rating 
            name="meetingScore" 
            defaultValue={5} 
            precision={0.5}
            onChange={onChangeMeetingReview}
            required
            value={meetingReview.meetingScore}
            size="large" />
          </Stack>
          <TextField
            fulWidth
            label="meetingScore"
            name="meetingScore"
            onChange={onChangeMeetingReview}
            required
            value={meetingReview.meetingScore}
          />
          <TextField
            fulWidth
            label="meetingReviewImg"
            name="meetingReviewImg"
            onChange={onChangeMeetingReview}
            required
            value={meetingReview.meetingReviewImg}
          />
          <TextField
            fulWidth
            label="meetingReviewContent"
            name="meetingReviewContent"
            onChange={onChangeMeetingReview}
            required
            value={meetingReview.meetingReviewContent}
          />

    
          <Button onClick={handleSubmit}>작성하기</Button>
        </Box>
    );
};

export default AddMeetingReveiw;