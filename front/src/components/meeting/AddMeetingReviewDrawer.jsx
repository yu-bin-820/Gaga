import { Avatar, Button, Divider, Drawer, IconButton, Rating, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CancelIcon from '@mui/icons-material/Cancel';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import fetcher from '@utils/fetcher';
import useInput from '@hooks/common/useInput';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import useSWR from 'swr';
import axios from 'axios';

const AddMeetingReviewDrawer = ({settingsAddReviewOpen, setSettingsAddReviewOpen, toggleSettingsAddReview, meetingNo}) => {

    const {mutate: mutateMeetingReviewList } = useSWR(
      `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${meetingNo}`,
      fetcher
  );
  
    const [meetingReview, onChangeMeetingReview] = useInput({
      meetingScore: 5,
      meetingReviewContent: '',
    });
  
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
  
    const onChangeImg = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setSelectedImage(URL.createObjectURL(file));
    };
  
    const { data: myData } = useSWR(
      `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
      fetcher
    );
  
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
        formData.append('meetingReviewerNo', myData.userNo);
        formData.append('meetingNo', meetingNo);
  
        console.log(formData);
        const response = axios.post(
          `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review`,
          formData
        ).then(()=>{
          mutateMeetingReviewList()
        })

        setSettingsAddReviewOpen(false);

        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }, [meetingReview, selectedFile, meetingNo, myData.userNo, mutateMeetingReviewList, setSettingsAddReviewOpen]);

    return (
        <Drawer
            anchor="right"
            open={settingsAddReviewOpen}
            onClose={toggleSettingsAddReview(false)}
            onOpen={toggleSettingsAddReview(true)}
          >
            <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ height: '55px', minWidth: '100vw' }}
          >
            <IconButton
            onClick={() => {
              setSettingsAddReviewOpen(false);}}>
              <ArrowBackIosNewIcon />
            </IconButton>
          </Stack>
          <Divider />
            <Box sx={{ margin: '10px' }}>
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
            작성하기
          </Button>
        </Stack>
      </Box>
        </Drawer>
    );
};

AddMeetingReviewDrawer.propTypes = {
    settingsAddReviewOpen: PropTypes.bool.isRequired,
    setSettingsAddReviewOpen: PropTypes.func.isRequired,
    toggleSettingsAddReview: PropTypes.func.isRequired,
    meetingNo: PropTypes.object.isRequired,
    };

export default AddMeetingReviewDrawer;