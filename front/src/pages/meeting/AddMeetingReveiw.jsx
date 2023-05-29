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
          const data = {
            meetingScore: meetingReview.meetingScore,
            meetingReviewContent: meetingReview.meetingReviewContent,
            meetingReviewerNo: myData.userNo,
            meetingNo: meetingno
          };
          data.append('file', selectedFile);
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
                        width: '100%',
                        height: '100%',
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
            label="meetingReviewContent"
            name="meetingReviewContent"
            onChange={onChangeMeetingReview}
            required
            value={meetingReview.meetingReviewContent}
          />

    
          <Button onClick={handleSubmit}>작성하기</Button>
        </Box>
        </>
    );
};

export default AddMeetingReveiw;