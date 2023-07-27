import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';
import { ToggleButton } from '@mui/material';
import { Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import PropTypes from 'prop-types';
import WcIcon from '@mui/icons-material/Wc';

const SelectGender = ({ onGenderClick, filterGender }) => {
    
    const [selectedValue, setSelectedValue] = useState(filterGender);

    useEffect(() => {
        setSelectedValue(`${filterGender}` );
    }, [filterGender]);

    const { data: myData, mutate: mutateMe } = useSWR(
        `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
        fetcher
        );

    const handleChange = (event, newValue) => {
        setSelectedValue(newValue);
    };

    const onClickGender = (gender) => {
        // console.log('성별 선택', gender);
        onGenderClick(gender); // 부모 컴포넌트로 subCategoryTag 전달
    };

    return (
        <div>
        <Stack
        sx={{marginLeft: 1}}
        spacing={2}>
        <Stack
        direction='row'
        alignItems="center"
        spacing={2}
        sx={{marginLeft: 1, marginRight: 1.5, borderBottom: '1.5px solid #bfbdbd'}}
        >
        <WcIcon />
            <h4>성별</h4>
        </Stack>
        
        <Stack
        direction='row'
        alignItems="center"
        sx={{marginLeft: 1}}>
            <StyledToggleButtonGroup
            value={selectedValue}
            exclusive
            onChange={handleChange}
            aria-label="Styled button group"
            sx={{marginLeft: 2}}
        >
        <ToggleButton 
            value="0"
            onClick={() => onClickGender("0")}
            >
            누구나
        </ToggleButton>
        {myData.gender =="1" &&(
        <ToggleButton 
            value="1"
            onClick={() => onClickGender("1")}
            >
            남자만
        </ToggleButton>
        )}
        {myData.gender =="2" &&(
        <ToggleButton 
            value="2"
            onClick={() => onClickGender("2")}
            >
            여자만
        </ToggleButton>
        )}
      </StyledToggleButtonGroup>
      </Stack>
      </Stack>
        </div>
    );
};


SelectGender.propTypes = {
    onGenderClick: PropTypes.object.isRequired,
    filterGender: PropTypes.object.isRequired,
  };

export default SelectGender;

