import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback } from 'react';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import ListCategory from '../common/ListCategory';


const AddMeetingListCategory = () => {

    const {
        mainCategoryNo,
        filterTag,
        onChangeField,
        setField
      } = useMeetingFormStore();  
    
      const handleSubCategoryClick = useCallback((subCategoryTag) => {
        setField('filterTag', subCategoryTag);
      }, [setField]);
    
      const handleMainCategoryChange = useCallback((mainCategoryNo) => {
        setField('mainCategoryNo', mainCategoryNo);
      }, [setField]);

    return (
      <Box sx={{ margin: '10px' }}>
      <h4>모임 목적을 선택해 주세요!</h4>
      <ListCategory
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryClick={handleSubCategoryClick}
        mainCategoryNo={mainCategoryNo}
        subCategoryTag={filterTag}
      />
        </Box>
      );
    };
    
    export default AddMeetingListCategory;