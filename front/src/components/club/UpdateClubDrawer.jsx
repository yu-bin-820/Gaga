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
import { useTheme } from '@emotion/react';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';
import UpdateClubName from './UpdateClubName';
import UpdateClubImg from './UpdateClubImg';
import UpdateClubFilter from './UpdateClubFilter';
import UpdateClubMaxMember from './UpdateClubMaxMember';
import UpdateClubState from './UpdateClubState';

const UpdateClubDrawer = ({
  settingsUpdateClubOpen,
  setSettingsUpdateClubOpen,
  toggleSettingsUpdateClub,
  clubNo,
}) => {
  const { clubImg, setField } = useUpdateClubFormStore();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log(response.data);
        setField('clubName', response.data.clubName);
        setField('clubIntro', response.data.clubIntro);
        setField('clubImg', response.data.clubImg);
        setField('filterGender', response.data.filterGender);
        setField('filterMinAge', response.data.filterMinAge);
        setField('filterMaxAge', response.data.filterMaxAge);
        setField('clubMaxMemberNo', response.data.clubMaxMemberNo);
        setField('clubState', response.data.clubState);
        setField(
          'image',
          response.data?.clubImg
            ? `${
                import.meta.env.VITE_CDN_HOST
              }/upload_images/club/${clubImg}?type=f_sh&w=100&h=100&faceopt=true&sharp_amt=1.0`
            : null
        );
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubImg, clubNo, setField]);

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
        return <UpdateClubName />;
      case 1:
        return <UpdateClubImg />;
      case 2:
        return <UpdateClubFilter />;
      case 3:
        return <UpdateClubMaxMember />;
      case 4:
        return (
          <UpdateClubState
            setSettingsUpdateClubOpen={setSettingsUpdateClubOpen}
          />
        );
      default:
        throw new Error('Unknown step');
    }
  }

  return (
    <Drawer
      anchor='right'
      open={settingsUpdateClubOpen}
      onClose={toggleSettingsUpdateClub(false)}
      onOpen={toggleSettingsUpdateClub(true)}
    >
      <Stack
        direction={'row'}
        alignItems={'center'}
        sx={{ height: '55px', minWidth: '100vw' }}
      >
        <IconButton
          onClick={() => {
            setSettingsUpdateClubOpen(false);
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
      </Stack>
      <Divider />
      <Box>
        <MobileStepper
          variant='progress'
          steps={5}
          position='static'
          activeStep={activeStep}
          sx={{ maxWidth: 500, flexGrow: 1 }}
          nextButton={
            <Button
              size='small'
              onClick={handleNext}
              disabled={activeStep === 4}
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

UpdateClubDrawer.propTypes = {
  settingsUpdateClubOpen: PropTypes.bool,
  setSettingsUpdateClubOpen: PropTypes.func,
  toggleSettingsUpdateClub: PropTypes.func,
  clubNo: PropTypes.object,
};

export default UpdateClubDrawer;
