import useInput from '@hooks/common/useInput';
import { Avatar, Button, ImageListItem, MobileStepper, TextField } from '@mui/material';
import { Box, Stack } from '@mui/system';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import UpdateMeetingName from '@components/meeting/UpdateMeetingName';
import { useTheme } from '@emotion/react';
import CommonTop from '@layouts/common/CommonTop';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import UpdateMeetingImg from '@components/meeting/UpdateMeetingImg';
import UpdateMeetingDate from '@components/meeting/UpdateMeetingDate';
import dayjs from 'dayjs';
import UpdateMeetingFilter from '@components/meeting/UpdateMeetingFilter';
import UpdateMeetingMaxMember from '@components/meeting/UpdateMeetingMaxMember';
import UpdateMeetingState from '@components/meeting/UpdateMeetingState';

const UpdateMeeting = () => {
  const { meetingno } = useParams();
  const {
    meetingName,
    meetingIntro,
    meetingImg,
    meetingDate,
    meetingStartTime,
    meetingEndTime,
    filterGender,
    filterMinAge,
    filterMaxAge,
    meetingMaxMemberNo,
    meetingState,
    file,
    image,
    setField,
    onChangeField,
  } =useUpdateMeetingFormStore();


  const [selectedImage, setSelectedImage] = useState(
    meetingImg
      ? `${import.meta.env.VITE_SPRING_HOST}/upload_images/meeting/${
          meetingImg
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
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`)
      .then((response) => {
        console.log(response.data);
        setField('meetingName', response.data.meetingName);
        setField('meetingIntro', response.data.meetingIntro);
        setField('meetingImg', response.data.meetingImg);
        setField('meetingDate', dayjs(response.data.meetingDate));
        setField('meetingStartTime', dayjs(response.data.meetingDate+'T'+response.data.meetingStartTime));
        setField('meetingEndTime', dayjs(response.data.meetingDate+'T'+response.data.meetingEndTime));
        setField('filterGender', response.data.filterGender);
        setField('filterMinAge', response.data.filterMinAge);
        setField('filterMaxAge', response.data.filterMaxAge);
        setField('meetingMaxMemberNo', response.data.meetingMaxMemberNo);
        setField('meetingState', response.data.meetingState);
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
      formData.append('meetingName', meetingName);
      formData.append('meetingIntro', meetingIntro);
      formData.append('meetingDate', meetingDate);
      formData.append('meetingStartTime', meetingStartTime);
      formData.append('meetingEndTime', meetingEndTime);
      formData.append('filterGender', filterGender);
      formData.append('filterMinAge', filterMinAge);
      formData.append('filterMaxAge', filterMaxAge);
      formData.append('meetingMaxMemberNo', meetingMaxMemberNo);
      formData.append('meetingState', meetingState);
      formData.append('meetingNo', meetingno);

      console.log(meetingDate);

      console.log(formData);

      const response = axios.patch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting`,
        formData
      );

      navigate(`/meeting/meetingno/${meetingno}`);
    } catch (error) {
      console.error(error);
    }
  }, [meetingno, navigate]);

  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <UpdateMeetingName />;
      case 1:
        return <UpdateMeetingImg />;
      case 2:
        return <UpdateMeetingDate />;
      case 3:
        return <UpdateMeetingFilter />;
      case 4:
        return <UpdateMeetingMaxMember />;
      case 5:
        return <UpdateMeetingState />;
      default:
        throw new Error('Unknown step');
    }
  }
  return (
    <>
          <CommonTop />
      <Box sx={{ marginTop: '64px'}}>
        <MobileStepper
          variant="progress"
          steps={9}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 500, flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === 6}
            >
              Next
              {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
        />
        <React.Fragment>
          {getStepContent(activeStep)}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}></Box>
        </React.Fragment>
      </Box>
    <Box sx={{ marginTop: '64px' }}>
      <TextField
        fulWidth
        label="meetingName"
        name="meetingName"
        onChange={(e)=>onChangeField('meetingName',e)}
        required
        value={meetingName}
      />
      <TextField
        fulWidth
        label="meetingIntro"
        name="meetingIntro"
        onChange={(e)=>onChangeField('meetingIntro',e)}
        required
        value={meetingIntro}
      />
      <TextField
        fulWidth
        label="meetingImg"
        name="meetingImg"
        onChange={(e)=>onChangeField('meetingImg',e)}
        required
        value={meetingImg}
      />
      <TextField
        fulWidth
        label="filterGender"
        name="filterGender"
        onChange={(e)=>onChangeField('filterGender',e)}
        required
        value={filterGender}
      />
      <TextField
        fulWidth
        label="meetingDate"
        name="meetingDate"
        onChange={(e)=>onChangeField('meetingDate',e)}
        required
        value={meetingDate}
      />
      <TextField
        fulWidth
        label="meetingStartTime"
        name="meetingStartTime"
        onChange={(e)=>onChangeField('meetingStartTime',e)}
        required
        value={meetingStartTime}
      />
      <TextField
        fulWidth
        label="meetingEndTime"
        name="meetingEndTime"
        onChange={(e)=>onChangeField('meetingEndTime',e)}
        required
        value={meetingEndTime}
      />
      <TextField
        fulWidth
        label="meetingMaxMemberNo"
        name="meetingMaxMemberNo"
        onChange={(e)=>onChangeField('meetingMaxMemberNo',e)}
        required
        value={meetingMaxMemberNo}
      />
      <TextField
        fulWidth
        label="meetingState"
        name="meetingState"
        onChange={(e)=>onChangeField('meetingState',e)}
        required
        value={meetingState}
      />
      <TextField
        fulWidth
        label="filterMinAge"
        name="filterMinAge"
        onChange={(e)=>onChangeField('filterMinAge',e)}
        required
        value={filterMinAge}
      />
      <TextField
        fulWidth
        label="filterMaxAge"
        name="filterMaxAge"
        onChange={(e)=>onChangeField('filterMaxAge',e)}
        required
        value={filterMaxAge}
      />
      <TextField
        fulWidth
        label="meetingNo"
        name="meetingNo"
        onChange={(e)=>onChangeField('meetingNo',e)}
        required
        value={meetingno}
      />
      <Stack direction="row" spacing={2} alignItems={'center'} marginLeft="5px">
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
          {selectedImage && <img src={selectedImage} />}
        </ImageListItem>
      </Stack>
      <Button onClick={handleSubmit}>수정하기</Button>
    </Box>
    </>
  );
};

export default UpdateMeeting;
