import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@emotion/react';
import SelectMeetingType from './SelectMeetingType';
import AddMeetingListCategory from './AddMeetingListCategory';
import AddMeetingName from './AddMeetingName';
import AddMeetingImg from './AddMeetingImg';
import AddMeetingMap from './map/AddMeetingMap';
import AddMeetingDate from './AddMeetingDate';
import AddMeetingFilter from './AddMeetingFilter';
import AddMeetingMaxMember from './AddMeetingMaxMember';
import AddMeeting1 from './AddMeeting1';
import { Button, Divider, Drawer, IconButton, MobileStepper } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';


const AddMeetingDrawer = ({settingsAddMeetingOpen, setSettingsAddMeetingOpen, toggleSettingsAddMeeting}) => {
    const theme = useTheme();
    const [activeStep, setActiveStep] = useState(0);
    const [ nextButtonDisable, setNextButtonDisable ] = useState(false);
  
    const handleNext = () => {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };
  
    const handleBack = () => {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };
  
    function getStepContent(step) {
      switch (step) {
        case 0:
          return <SelectMeetingType setNextButtonDisable={setNextButtonDisable}/>;
        case 1:
          return <AddMeetingListCategory setNextButtonDisable={setNextButtonDisable}/>;
        case 2:
          return <AddMeetingName setNextButtonDisable={setNextButtonDisable}/>;
        case 3:
          return <AddMeetingImg setNextButtonDisable={setNextButtonDisable}/>;
        case 4:
          return <AddMeetingMap setNextButtonDisable={setNextButtonDisable}/>;
        case 5:
            return <AddMeetingDate setNextButtonDisable={setNextButtonDisable}/>;
        case 6:
          return <AddMeetingFilter setNextButtonDisable={setNextButtonDisable}/>;
        case 7:
            return <AddMeetingMaxMember />;
        case 8:
          return <AddMeeting1 setSettingsAddMeetingOpen={setSettingsAddMeetingOpen}
          setActiveStep={setActiveStep}/>;
        default:
          throw new Error('Unknown step');
      }
    }

    return (
        <Drawer
            anchor="right"
            open={settingsAddMeetingOpen}
            onClose={toggleSettingsAddMeeting(false)}
            onOpen={toggleSettingsAddMeeting(true)}
        >
            <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ height: '55px', minWidth: '100vw' }}
        >
            <IconButton
            onClick={() => {
                setSettingsAddMeetingOpen(false);}}>
                <ArrowBackIosNewIcon />
            </IconButton>
          </Stack>
        <Divider />
        <Box >
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
                disabled={activeStep === 8 || nextButtonDisable}
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

AddMeetingDrawer.propTypes = {
    settingsAddMeetingOpen: PropTypes.bool,
    setSettingsAddMeetingOpen: PropTypes.func,
    toggleSettingsAddMeeting: PropTypes.func,
    };

export default AddMeetingDrawer;