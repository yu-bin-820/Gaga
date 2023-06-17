import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  MobileStepper,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import SelectClubType from './SelectClubType';
import AddClubListCategory from './AddClubListCategory';
import AddClubName from './AddClubName';
import AddClubImg from './AddClubImg';
import AddClubFilter from './AddClubFilter';
import AddClubMaxMember from './AddClubMaxMember';
import AddClubRegion from './AddClubRegion';

const AddClubDrawer = ({
  settingsAddClubOpen,
  setSettingsAddClubOpen,
  toggleSettingsAddClub,
}) => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [nextButtonDisable, setNextButtonDisable] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <SelectClubType setNextButtonDisable={setNextButtonDisable} />;
      case 1:
        return (
          <AddClubListCategory setNextButtonDisable={setNextButtonDisable} />
        );
      case 2:
        return <AddClubName setNextButtonDisable={setNextButtonDisable} />;
      case 3:
        return <AddClubRegion setNextButtonDisable={setNextButtonDisable} />;
      case 4:
        return <AddClubImg setNextButtonDisable={setNextButtonDisable} />;
      case 5:
        return <AddClubFilter setNextButtonDisable={setNextButtonDisable} />;
      case 6:
        return (
          <AddClubMaxMember
            setSettingsAddClubOpen={setSettingsAddClubOpen}
            setActiveStep={setActiveStep}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Drawer
      anchor='right'
      open={settingsAddClubOpen}
      onClose={toggleSettingsAddClub(false)}
      onOpen={toggleSettingsAddClub(true)}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{ height: '55px', minWidth: '100vw' }}
      >
        <IconButton
          onClick={() => {
            setSettingsAddClubOpen(false);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Box>
        <MobileStepper
          variant='progress'
          steps={7}
          position='static'
          activeStep={activeStep}
          sx={{ maxWidth: 500, flexGrow: 1 }}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === 6 || nextButtonDisable}
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
    </Drawer>
  );
};

AddClubDrawer.propTypes = {
  settingsAddClubOpen: PropTypes.bool,
  setSettingsAddClubOpen: PropTypes.func,
  toggleSettingsAddClub: PropTypes.func,
};

export default AddClubDrawer;
