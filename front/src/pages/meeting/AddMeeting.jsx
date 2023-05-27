import AddMeeting1 from '@components/meeting/AddMeeting1';
import AddMeetingName from '@components/meeting/AddMeetingName';
import ListCategory from '@components/meeting/ListCategory';
import SelectMeetingType from '@components/meeting/SelectMeetingType';
import AddMeetingMap from '@components/meeting/map/AddMeetingMap';
import { useTheme } from '@emotion/react';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

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
        return <ListCategory/>;
      case 1:
        return <SelectMeetingType/>;
      case 2:
        return <AddMeetingName/>;
      case 3:
        return <AddMeetingMap/>;
      case 4:
        return <AddMeeting1/>;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Box sx={{marginTop:'64px'}}>
    <MobileStepper
      variant="progress"
      steps={6}
      position="static"
      activeStep={activeStep}
      sx={{ maxWidth: 400, flexGrow: 1 }}
      nextButton={
        <Button size="small" onClick={handleNext} disabled={activeStep === 5}>
          Next
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </Button>
      }
      backButton={
        <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
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
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              </Box>
            </React.Fragment>
      </Box>
  );
};

export default AddMeeting;