import ListCategory from '@components/common/ListCategory';
import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';
import SelectGender from '@components/meeting/SelectGender';
import useSearchMeetingFormStore from '@hooks/meeting/useSearchMeetingFormStore';
import CommonTop from '@layouts/common/CommonTop';
import { TextField, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Box, Stack, margin } from '@mui/system';
import fetcher from '@utils/fetcher';
import React, { useCallback, useState } from 'react';
import useSWR from 'swr';


const SearchMeetinggg = () => {

    const { data: myData, mutate: mutateMe } = useSWR(
        `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
      );

    const {
        gender,
        maxAge,
        minAge,
        mainCategoryNo,
        tag,
        setField,
        onChangeField
    } = useSearchMeetingFormStore();

  const handleGenderChange = useCallback((gender) => {
    setField('gender', gender);
  }, [setField]);

  const handleMainCategoryChange = useCallback((mainCategoryNo) => {
    setField('mainCategoryNo', mainCategoryNo);
  }, [setField]);

  const handleSubCategoryClick = useCallback((subCategoryTag) => {
    setField('tag', subCategoryTag);
  }, [setField]);

  return (
    <div>
        <CommonTop />
        <Box sx={{marginTop: '64px'}}>
        <Stack   
        direction='row'
        alignItems="center"
        sx={{marginLeft: 1}}>
            <h4>성별</h4>
        <SelectGender
            onGenderClick={handleGenderChange}
            myGender={myData.gender}
        />
      </Stack>
      <Stack   
        direction='row'
        alignItems="center"
        sx={{marginLeft: 1}}>
            <h4>연령</h4>
        <Stack
        direction='row'
        alignItems="center"
        sx={{marginLeft: 3}}>
        <TextField
        id="outlined-textarea"
        size="small"
        sx={{ width: '60px' }}
        onChange={(e)=>onChangeField('minAge',e)}
        >
        </TextField>
        &nbsp; <h3>~</h3> &nbsp;
        <TextField
        id="outlined-textarea"
        size="small"
        sx={{ width: '60px' }}
        onChange={(e)=>onChangeField('maxAge',e)}
        ></TextField>
        </Stack>
    </Stack>
    <ListCategory
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryClick={handleSubCategoryClick}
        />
    </Box>
    </div>
  );
};

export default SearchMeetinggg;