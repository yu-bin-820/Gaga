import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';
import { ToggleButton } from '@mui/material';
import React, { useState } from 'react';

const SelectGender = ({ onGenderClick, myGender }) => {
    
    const [selectedValue, setSelectedValue] = useState(null);

    const handleChange = (event, newValue) => {
        setSelectedValue(newValue);
      };

      const onClickGender = (gender) => {
        console.log('성별 선택', gender);
        onGenderClick(gender); // 부모 컴포넌트로 subCategoryTag 전달
      };

    return (
        <div>
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
        {myGender =="1" &&(
        <ToggleButton 
            value="1"
            onClick={() => onClickGender("1")}
            >
            남자만
        </ToggleButton>
        )}
        {myGender =="2" &&(
        <ToggleButton 
            value="2"
            onClick={() => onClickGender("2")}
            >
            여자만
        </ToggleButton>
        )}
      </StyledToggleButtonGroup>
        </div>
    );
};

export default SelectGender;

