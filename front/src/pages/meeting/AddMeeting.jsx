import AddMeeting1 from '@components/meeting/AddMeeting1';
import AddMeetingImg from '@components/meeting/AddMeetingImg';
import AddMeetingName from '@components/meeting/AddMeetingName';
import SelectMeetingType from '@components/meeting/SelectMeetingType';
import AddMeetingMap from '@components/meeting/map/AddMeetingMap';
import { useTheme } from '@emotion/react';
import CommonTop from '@layouts/common/CommonTop';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import AddMeetingListCategory from '@components/meeting/AddMeetingListCategory';
import AddMeetingDate from '@components/meeting/AddMeetingDate';
import AddMeetingFilter from '@components/meeting/AddMeetingFilter';

const AddMeeting = () => {
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
        return <SelectMeetingType />;
      case 1:
        return <AddMeetingListCategory />;
      case 2:
        return <AddMeetingName />;
      case 3:
        return <AddMeetingImg />;
      case 4:
        return <AddMeetingMap />;
      case 5:
          return <AddMeetingDate />;
      case 6:
        return <AddMeetingFilter />;
      case 7:
        return <AddMeeting1 />;
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
          steps={8}
          position="static"
          activeStep={activeStep}
          sx={{ maxWidth: 500, flexGrow: 1 }}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === 7}
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
    </>
  );
};

export default AddMeeting;
