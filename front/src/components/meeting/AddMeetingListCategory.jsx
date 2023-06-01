import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
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
        <Box>
      <ListCategory
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryClick={handleSubCategoryClick}
      />
        </Box>
      );
    };
    
    export default AddMeetingListCategory;