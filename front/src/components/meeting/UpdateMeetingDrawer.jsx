import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  MobileStepper,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import UpdateMeetingName from './UpdateMeetingName';
import UpdateMeetingImg from './UpdateMeetingImg';
import UpdateMeetingDate from './UpdateMeetingDate';
import UpdateMeetingFilter from './UpdateMeetingFilter';
import UpdateMeetingMaxMember from './UpdateMeetingMaxMember';
import UpdateMeetingState from './UpdateMeetingState';
import { useTheme } from '@emotion/react';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';
import dayjs from 'dayjs';

const UpdateMeetingDrawer = ({
  settingsUpdateMeetingOpen,
  setSettingsUpdateMeetingOpen,
  toggleSettingsUpdateMeeting,
  meetingno,
}) => {
  const { meetingImg, setField } = useUpdateMeetingFormStore();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/no/${meetingno}`)
      .then((response) => {
        console.log(response.data);
        setField('meetingName', response.data.meetingName);
        setField('meetingIntro', response.data.meetingIntro);
        setField('meetingImg', response.data.meetingImg);
        setField('meetingDate', dayjs(response.data.meetingDate));
        setField(
          'meetingStartTime',
          dayjs(
            response.data.meetingDate + 'T' + response.data.meetingStartTime
          )
        );
        setField(
          'meetingEndTime',
          dayjs(response.data.meetingDate + 'T' + response.data.meetingEndTime)
        );
        setField('filterGender', response.data.filterGender);
        setField('filterMinAge', response.data.filterMinAge);
        setField('filterMaxAge', response.data.filterMaxAge);
        setField('meetingMaxMemberNo', response.data.meetingMaxMemberNo);
        setField('meetingState', response.data.meetingState);
        setField(
          'image',
          response.data?.meetingImg
            ? `${
                import.meta.env.VITE_CDN_HOST
              }/upload_images/meeting/${meetingImg}?type=f_sh&w=100&h=100&faceopt=true&sharp_amt=1.0`
            : null
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [meetingImg, meetingno, setField]);

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
        return <UpdateMeetingMaxMember meetingno={meetingno}/>;
      case 5:
        return (
          <UpdateMeetingState
            setSettingsUpdateMeetingOpen={setSettingsUpdateMeetingOpen}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Drawer
      anchor="right"
      open={settingsUpdateMeetingOpen}
      onClose={toggleSettingsUpdateMeeting(false)}
      onOpen={toggleSettingsUpdateMeeting(true)}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{ height: '55px', minWidth: '100vw' }}
      >
        <IconButton
          onClick={() => {
            setSettingsUpdateMeetingOpen(false);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Box>
        <MobileStepper
          variant="progress"
          steps={6}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 500, flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === 5}
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
    </Drawer>
  );
};

UpdateMeetingDrawer.propTypes = {
  settingsUpdateMeetingOpen: PropTypes.bool,
  setSettingsUpdateMeetingOpen: PropTypes.func,
  toggleSettingsUpdateMeeting: PropTypes.func,
  meetingno: PropTypes.object,
};

export default UpdateMeetingDrawer;
