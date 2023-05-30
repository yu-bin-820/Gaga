import useInput from '@hooks/common/useInput';
import CommonTop from '@layouts/common/CommonTop';
import { Avatar, Button, ImageListItem, Rating, TextField, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useSWR from 'swr';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';

const AddMeetingReveiw = () => {

    const { meetingno } = useParams();
    const [meetingReview, onChangeMeetingReview, setMeetingReview] = useInput({
        meetingScore: '',
        meetingReviewImg: '',
        meetingReviewContent: ''
      });
    
      const [selectedImage, setSelectedImage] = useState(null);
      const [selectedFile, setSelectedFile] = useState(null);

      const onChangeActivityImg = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSelectedImage(URL.createObjectURL(file));
      };

    
      const { data: myData, mutate: mutateMe } = useSWR(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );
    
      const navigate = useNavigate();
      const handleSubmit = useCallback(async () => {
        event.preventDefault();
    
        try {
          const formData = new FormData();

          formData.append('file', selectedFile);
          formData.append('meetingScore',meetingReview.meetingScore);
          formData.append('meetingReviewContent',meetingReview.meetingReviewContent);
          formData.append('meetingReviewerNo',myData.userNo);
          formData.append('meetingNo',meetingno);

          console.log(formData);
          const response = await axios.post(
            `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review`,
            formData
    
          );

          navigate(`/meeting/meetingno/${meetingno}`);
    
          console.log(response.data);
        } catch (error) {
          console.error(error);
        }
      }, [meetingReview, selectedFile]);
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
                name="meetingReviewImg"
                onChange={onChangeActivityImg}
              />
            </Button>
            <ImageListItem>
                  {selectedImage ? (
                    <img src={selectedImage} />
                  ) : (
                    <Box
                      sx={{
                        width: '150px',
                        height: '150px',
                        backgroundColor: 'grey',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: '1.2rem',
                          color: 'white',
                          fontWeight: 'bold',
                          width: '150px',
                          height: '150px',
                        }}
                      >
                        No Img
                      </Typography>
                    </Box>
                  )}
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

    
          <Button onClick={handleSubmit}>작성하기</Button>
        </Box>
        </>
    );
};

export default AddMeetingReveiw;