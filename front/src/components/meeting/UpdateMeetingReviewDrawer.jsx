import { Avatar, Button, Divider, List, ListItem, Rating, SwipeableDrawer, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelIcon from '@mui/icons-material/Cancel';
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router';
import useInput from '@hooks/common/useInput';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import PropTypes from 'prop-types';


const UpdateMeetingReviewDrawer = ({settingsUpdateReviewOpen, setSettingsUpdateReviewOpen, toggleSettingsUpdateReview}) => {
    const { reviewno } = useParams();
    const [meetingReview, onChangeMeetingReview, setMeetingReview] = useInput({
      meetingScore: '',
      meetingReviewImg: '',
      meetingReviewContent: '',
      meetingNo: '',
    });
  
    const {data : meetingReviewList, mutate: mutateMeetingReviewList } = useSWR(
      `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${meetingReview?.meetingNo}`,
      fetcher
  );
  
    const [selectedImage, setSelectedImage] = useState(
      meetingReview?.meetingReviewImg
        ? `${import.meta.env.VITE_CDN_HOST}/upload_images/meeting/${
            meetingReview?.meetingReviewImg
          }`
        : null
    );
    const [selectedFile, setSelectedFile] = useState(null);
  
    const onChangeImg = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    };
  
    useEffect(() => {
      axios
        .get(
          `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/no/${reviewno}`
        )
        .then((response) => {
          console.log(response.data);
          setMeetingReview(response.data);
          setSelectedImage(
            response.data?.meetingReviewImg
              ? `${import.meta.env.VITE_SPRING_HOST}/upload_images/meeting/${
                  response.data?.meetingReviewImg
                }`
              : null
          );
        })
        .catch((error) => {
          console.log(error);
        });
    }, [reviewno, setMeetingReview]);
  
    const navigate = useNavigate();
  
    const handleSubmit = useCallback(() => {
      event.preventDefault();
  
      try {
        const formData = new FormData();
  
        formData.append('file', selectedFile);
        formData.append('meetingScore', meetingReview.meetingScore);
        formData.append(
          'meetingReviewContent',
          meetingReview.meetingReviewContent
        );
        formData.append('meetingReviewNo', reviewno);
  
        console.log(formData);
        const response = 
        axios
        .patch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review`,
          formData )
          .then(()=>{
            mutateMeetingReviewList()
          });
  
        navigate(`/meeting/meetingno/${meetingReview.meetingNo}`);
  
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }, [meetingReview, selectedFile, navigate]);

    return (
        <SwipeableDrawer
            anchor="right"
            open={settingsUpdateReviewOpen}
            onClose={toggleSettingsUpdateReview(false)}
            onOpen={toggleSettingsUpdateReview(true)}
        >
            <Box sx={{ minWidth: '100vw' }}>
                <List>
                    <ListItem>
                        <Button
                        onClick={() => {
                            setSettingsUpdateReviewOpen(false);
                        }}>
                            확인
                        </Button>
                        <Box
                            sx={{
                                minWidth: 'calc(100vw - 108px)',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                        </Box>
                    </ListItem>
                    <Divider />
                </List>
            </Box>
            <Stack direction={'row'} spacing={3} sx={{ marginBottom: '30px' }}>
          <Button
            variant="outlined"
            startIcon={
              <Avatar>
                <AddPhotoAlternateIcon />
              </Avatar>
            }
            color="primary"
            aria-label="upload picture"
            component="label"
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderColor: 'grey',
              width: '110px',
              height: '110px',
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
          {selectedImage && (
            <Box
              sx={{
                backgroundColor: '#ffffff',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flexDirection: 'column',
              }}
            >
              <CancelIcon
                fontSize="small"
                onClick={() => setSelectedImage(null)}
                sx={{
                  alignSelf: 'flex-end',
                  marginTop: '-8px',
                  marginRight: '-8px',
                  cursor: 'pointer',
                }}
              />
              <img
                src={selectedImage}
                style={{ width: '100px', height: '100px' }}
              />
            </Box>
          )}
        </Stack>
        <Stack
          justifyContent="center"
          alignItems="center"
          spacing={2}
          marginBottom={1.3}
        >
          <Rating
            name="meetingScore"
            defaultValue={5}
            precision={0.5}
            onChange={onChangeMeetingReview}
            required
            value={meetingReview.meetingScore}
            size="large"
          />
          <h3>{meetingReview.meetingScore}/5</h3>
        </Stack>
        <TextField
          fullWidth
          label="meetingReviewContent"
          name="meetingReviewContent"
          onChange={onChangeMeetingReview}
          multiline
          rows={4}
          required
          value={meetingReview.meetingReviewContent}
        />

        <Stack
          spacing={0}
          direction="row"
          justifyContent="center"
          alignItems="center"
          sx={{ position: 'fixed', bottom: 5, left: 0, right: 0 }}
        >
          <Button
            variant="contained"
            sx={{ width: '85vw', borderRadius: '50px' }}
            onClick={handleSubmit}
          >
            수정하기
          </Button>
        </Stack>
        </SwipeableDrawer>
    );
};

UpdateMeetingReviewDrawer.propTypes = {
    settingsUpdateReviewOpen: PropTypes.object.isRequired,
    setSettingsUpdateReviewOpen: PropTypes.object.isRequired,
    toggleSettingsUpdateReview: PropTypes.object.isRequired,
    };

export default UpdateMeetingReviewDrawer;