import useInput from '@hooks/common/useInput';
import CommonTop from '@layouts/common/CommonTop';
import { Avatar, Button, ImageListItem, Rating, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const UpdateMeetingReview = () => {

    const { reviewno } = useParams();
    const [meetingReview, onChangeMeetingReview, setMeetingReview] = useInput({
        meetingScore: '',
        meetingReviewImg: '',
        meetingReviewContent: ''
      });

      const [selectedImage, setSelectedImage] = useState(
        meetingReview?.meetingReviewImg?
        `http://${import.meta.env.VITE_SPRING_HOST}/upload_images/meeting/${
          meetingReview?.meetingReviewImg
          }`
          : null
        );
      const [selectedFile, setSelectedFile] = useState( null );

      const onChangeImg = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedImage(URL.createObjectURL(file));
      };

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
      <>
        <CommonTop/>
        <Box sx={{ marginTop: '64px' }}>
          <Button
              variant="outlined"
              startIcon={<Avatar><AddPhotoAlternateIcon /></Avatar>}
              color="primary"
              aria-label="upload picture"
              component="label"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: 'grey',
                width: '150px',
                height: '150px',
              }}
              size="large"
            >
              <input
                hidden
                accept="image/*"
                type="file"
                id="file"
                name="file"
                onChange={onChangeImg}
              />
            </Button>
            <ImageListItem>
            {selectedImage && <img src={selectedImage} /> }
            </ImageListItem>
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
          <h3>{meetingReview.meetingScore}/5</h3>
          <TextField
            fulWidth
            label="meetingReviewContent"
            name="meetingReviewContent"
            onChange={onChangeMeetingReview}
            multiline
            rows={4}
            required
            value={meetingReview.meetingReviewContent}
          />

    
          <Button onClick={handleSubmit}>수정하기</Button>
        </Box>
      </>
    );
};

export default UpdateMeetingReview;