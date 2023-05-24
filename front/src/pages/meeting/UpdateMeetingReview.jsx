import useInput from '@hooks/common/useInput';
import { Button, TextField } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';

const UpdateMeetingReview = () => {

    const { reviewno } = useParams();
    const [meetingReview, onChangeMeetingReview, setMeetingReview] = useInput({
        meetingScore: '',
        meetingReviewImg: '',
        meetingReviewContent: ''
      });

      useEffect(() => {
        axios
          .get(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/no/${reviewno}`
          )
          .then((response) => {
            console.log(response.data);
            setMeetingReview(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      }, [reviewno]);

      const navigate = useNavigate();

      const handleSubmit = useCallback(async () => {
        event.preventDefault();
    
        try {
          const data = {
            meetingScore: meetingReview.meetingScore,
            meetingReviewImg: meetingReview.meetingReviewImg,
            meetingReviewContent: meetingReview.meetingReviewContent,
            meetingReviewNo: reviewno

          };
          console.log(data);
          const response = await axios.patch(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review`,
            data
    
          );

          navigate(`/meeting/meetingno/${meetingReview.meetingNo}`);
    
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }, [meetingReview]);

    return (
        <Box sx={{ marginTop: '64px' }}>
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

    
          <Button onClick={handleSubmit}>수정하기</Button>
        </Box>
    );
};

export default UpdateMeetingReview;