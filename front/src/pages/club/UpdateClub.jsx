import useInput from '@hooks/common/useInput';
import {
  Avatar,
  Button,
  ImageListItem,
  MobileStepper,
  TextField,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import useUpdateClubFormStore from '@stores/club/useUpdateClubFormStore';
import { useTheme } from '@emotion/react';
import CommonTop from '@layouts/common/CommonTop';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import UpdateClubName from '@components/club/UpdateClubName';
import UpdateClubImg from '@components/club/UpdateClubImg';
import UpdateClubFilter from '@components/club/UpdateClubFilter';
import UpdateClubMaxMember from '@components/club/UpdateClubMaxMember';
import UpdateClubState from '@components/club/UpdateClubState';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

const UpdateClub = () => {
  const { clubNo } = useParams();
  const {
    clubName,
    clubIntro,
    clubImg,
    clubRegion,
    filterGender,
    filterMinAge,
    filterMaxAge,
    clubState,
    clubMaxMemberNo,
    filterTag,
    file,
    image,
    setField,
    onChangeField,
  } = useUpdateClubFormStore();

  const { data: clubData, mutate: mutateClub } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`,
    fetcher
  );

  const [selectedImage, setSelectedImage] = useState(
    clubImg
      ? `${import.meta.env.VITE_SPRING_HOST}/upload_images/club/${clubImg}`
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
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/club/no/${clubNo}`)
      .then((response) => {
        console.log(response.data);
        setField('clubName', response.data.clubName);
        setField('clubIntro', response.data.clubIntro);
        setField('clubImg', response.data.clubImg);
        setField('clubRegion', response.data.clubRegion);
        setField('filterTag', response.data.filterTag);
        setField('filterGender', response.data.filterGender);
        setField('filterMinAge', response.data.filterMinAge);
        setField('filterMaxAge', response.data.filterMaxAge);
        setField('clubMaxMemberNo', response.data.clubMaxMemberNo);
        setField('clubState', response.data.clubState);
        setField(
          'image',
          response.data?.clubImg
            ? `${import.meta.env.VITE_CDN_HOST}/upload_images/club/${
                response.data?.clubImg
              }?type=f_sh&w=100&h=100&faceopt=true&sharp_amt=1.0`
            : null
        );

        mutateClub();
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubImg, clubNo, setField]);

  const navigate = useNavigate();

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();

      try {
        const formData = new FormData();

        formData.append('file', selectedFile);
        formData.append('clubName', clubName);
        formData.append('clubIntro', clubIntro);
        formData.append('clubRegion', clubRegion);
        formData.append('filterTag', filterTag);
        formData.append('filterGender', filterGender);
        formData.append('filterMinAge', filterMinAge);
        formData.append('filterMaxAge', filterMaxAge);
        formData.append('clubMaxMemberNo', clubMaxMemberNo);
        formData.append('clubState', clubState);
        formData.append('clubNo', clubNo);

        console.log(clubRegion);

        console.log(formData);

        const response = axios.patch(
          `${import.meta.env.VITE_SPRING_HOST}/rest/club`,
          formData
        );

        mutateClub();

        navigate(`/club/no/${clubNo}`);
      } catch (error) {
        console.error(error);
      }
    },
    [clubNo, navigate]
  );

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
        return <UpdateClubState />;
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
    </>
  );
};

export default UpdateClub;
