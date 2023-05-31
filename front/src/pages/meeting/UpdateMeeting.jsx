import useInput from '@hooks/common/useInput';
import { Avatar, Button, ImageListItem, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

const UpdateMeeting = () => {
  const { meetingno } = useParams();
  const [meeting, onChangeMeeting, setMeeting] = useInput({
    meetingName: '',
    meetingIntro: '',
    meetingImg: '',
    meetingDate: '',
    meetingStartTime: '',
    meetingEndTime: '',
    filterGender: '',
    filterMinAge: '',
    filterMaxAge: '',
    meetingState: '',
    meetingMaxMemberNo: '',
    meetingNo: '',
  });

  const [selectedImage, setSelectedImage] = useState(
    meeting?.meetingImg?
    `http://${import.meta.env.VITE_SPRING_HOST}/upload_images/meeting/${
      meeting?.meetingImg
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
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`
      )
      .then((response) => {
        console.log(response.data);
        setMeeting(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const navigate = useNavigate();

  const handleSubmit = useCallback(() => {
    event.preventDefault();
    

    try {
      const formData = new FormData();

      formData.append('file', selectedFile);
      formData.append('meetingName',meeting.meetingName);
      formData.append('meetingIntro',meeting.meetingIntro);
      formData.append('meetingDate',meeting.meetingDate);
      formData.append('meetingStartTime',meeting.meetingStartTime);
      formData.append('meetingEndTime',meeting.meetingEndTime);
      formData.append('filterGender',meeting.filterGender);
      formData.append('filterMinAge',meeting.filterMinAge);
      formData.append('filterMaxAge',meeting.filterMaxAge);
      formData.append('meetingMaxMemberNo',meeting.meetingMaxMemberNo);
      formData.append('entryFee',meeting.entryFee);
      formData.append('meetingState',meeting.meetingState);
      formData.append('meetingNo',meetingno);

        console.log(meeting.meetingDate)

      console.log(formData);

      const response = axios.patch(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting`,
        formData
      );

      navigate(`/meeting/meetingno/${meetingno}`);
    } catch (error) {
      console.error(error);
    }
  }, [meeting, selectedFile, meetingno, navigate]);

  return (
    <Box sx={{ marginTop: '64px' }}>
      <TextField
        fulWidth
        label="meetingName"
        name="meetingName"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingName}
      />
      <TextField
        fulWidth
        label="meetingIntro"
        name="meetingIntro"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingIntro}
      />
      <TextField
        fulWidth
        label="meetingImg"
        name="meetingImg"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingImg}
      />
      <TextField
        fulWidth
        label="filterGender"
        name="filterGender"
        onChange={onChangeMeeting}
        required
        value={meeting.filterGender}
      />
      <TextField
        fulWidth
        label="meetingDate"
        name="meetingDate"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingDate}
      />
      <TextField
        fulWidth
        label="meetingStartTime"
        name="meetingStartTime"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingStartTime}
      />
      <TextField
        fulWidth
        label="meetingEndTime"
        name="meetingEndTime"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingEndTime}
      />
      <TextField
        fulWidth
        label="meetingMaxMemberNo"
        name="meetingMaxMemberNo"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingMaxMemberNo}
      />
      <TextField
        fulWidth
        label="meetingState"
        name="meetingState"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingState}
      />
      <TextField
        fulWidth
        label="filterMinAge"
        name="filterMinAge"
        onChange={onChangeMeeting}
        required
        value={meeting.filterMinAge}
      />
      <TextField
        fulWidth
        label="filterMaxAge"
        name="filterMaxAge"
        onChange={onChangeMeeting}
        required
        value={meeting.filterMaxAge}
      />
      <TextField
        fulWidth
        label="meetingNo"
        name="meetingNo"
        onChange={onChangeMeeting}
        required
        value={meeting.meetingNo}
      />
        <Stack direction="row" spacing={2} alignItems={'center'} marginLeft='5px'>
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
            </Stack>
      <Button onClick={handleSubmit}>수정하기</Button>
    </Box>
  );
};

export default UpdateMeeting;
