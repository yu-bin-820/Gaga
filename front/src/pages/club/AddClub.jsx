import AddClubName from '@components/club/AddClubName';
import AddClubRegion from '@components/club/AddClubRegion';
import AddClubImg from '@components/club/AddClubImg';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { Button, MobileStepper } from '@mui/material';
import { Box, useTheme } from '@mui/system';
import React, { useState } from 'react';
import SelectClubType from '@components/club/SelectClubType';
import AddClubListCategory from '@components/club/AddClubListCategory';
import CommonTop from '@layouts/common/CommonTop';
import AddClubFilter from '@components/club/AddClubFilter';
import AddClubMaxMember from '@components/club/AddClubMaxMember';

const AddClub = () => {
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
        return <SelectClubType />;
      case 1:
        return <AddClubListCategory />;
      case 2:
        return <AddClubRegion />;
      case 3:
        return <AddClubName />;
      case 4:
        return <AddClubImg />;
      case 5:
        return <AddClubFilter />;
      case 6:
        return <AddClubMaxMember />;
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <>
      <CommonTop />
      <Box sx={{ marginTop: '64px' }}>
        <MobileStepper
          variant='progress'
          steps={7}
          position='static'
          activeStep={activeStep}
          sx={{ maxWidth: 600, flexGrow: 1 }}
          nextButton={
            <Button
              size='small'
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
              size='small'
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

export default AddClub;
