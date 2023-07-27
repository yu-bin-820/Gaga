import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { useCallback, useEffect, useState } from 'react';
import { Box } from '@mui/system';
import SettingFilterGenderAge from './SettingFilterGenderAge';
import SettingFilterTags from './SettingFilterTags';
import { Typography } from '@mui/material';
import SettingFilterStepThree from './SettingFilterStepThree';
import useCommonStore from '@stores/common/useCommonStore';
import axios from 'axios';
import fetcher from '@utils/fetcher';
import useSWR from 'swr';
import PropTypes from 'prop-types';

const DefaultFilterStepper = ({ setDefaultFilterDrawerOpen }) => {
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const [activeStep, setActiveStep] = useState(0);
  const [filterGender, setFilterGender] = useState(myData?.filterGender);
  const [filterMinAge, setFilterMinAge] = useState(myData?.filterMinAge || 14);
  const [filterMaxAge, setFilterMaxAge] = useState(myData?.filterMaxAge || 50);
  const [mainCategoryNo, setMainCategoryNo] = useState(0);
  const { selectedTags, setField } = useCommonStore();

  useEffect(() => {
    const tags = [
      myData?.filterTag,
      myData?.filterTag2,
      myData?.filterTag3,
    ].filter(Boolean);
    setField('selectedTags', tags);
  }, [setField, myData]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleMainCategory = useCallback(
    (mainCategoryNo) => {
      setMainCategoryNo(mainCategoryNo);
    },
    [setMainCategoryNo]
  );

  const onClickSubmitDefaultFilter = useCallback(() => {
    myData.filterGender = filterGender;
    myData.filterMinAge = filterMinAge;
    myData.filterMaxAge = filterMaxAge;
    myData.filterTag = selectedTags[0];
    myData.filterTag2 = selectedTags[1];
    myData.filterTag3 = selectedTags[2];
    axios
      .post(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/updateUser`,
        myData,
        { withCredentials: true }
      )
      .then(() => {
        mutateMe();
        console.log(myData);
        setDefaultFilterDrawerOpen(false);
      });
    console.log(selectedTags);
  }, [
    selectedTags,
    myData,
    filterGender,
    filterMinAge,
    filterMaxAge,
    setDefaultFilterDrawerOpen,
    mutateMe,
  ]);

  return (
    <Box>
      <MobileStepper
        variant="progress"
        steps={2}
        position="static"
        activeStep={activeStep}
        sx={{ minWidth: '80vw', flexGrow: 1 }}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === 1}>
            <Typography sx={{ fontSize: '12px' }}>next</Typography>
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            <Typography sx={{ fontSize: '12px' }}>back</Typography>
          </Button>
        }
      />
      {activeStep === 1 && (
        <SettingFilterGenderAge
          filterGender={filterGender}
          filterMinAge={filterMinAge}
          filterMaxAge={filterMaxAge}
          setFilterGender={setFilterGender}
          setFilterMinAge={setFilterMinAge}
          setFilterMaxAge={setFilterMaxAge}
          selectedTagComponents={<SettingFilterStepThree />}
          submitButton={
            <Button
              variant="contained"
              sx={{
                position: 'fixed',
                bottom: '0rem',
                marginBottom: '20px',
                minWidth: '95%',
              }}
              onClick={onClickSubmitDefaultFilter}
            >
              필터 설정 변경하기
            </Button>
          }
        />
      )}
      {activeStep === 0 && (
        <SettingFilterTags
          handleMainCategory={handleMainCategory}
          mainCategoryNo={mainCategoryNo}
        />
      )}
    </Box>
  );
};

DefaultFilterStepper.propTypes = {
  setDefaultFilterDrawerOpen: PropTypes.func,
};
export default DefaultFilterStepper;
