import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ListCategory from '../common/ListCategory';
import useClubFormStore from '@hooks/club/useClubFormStore';

const AddClubListCategory = () => {
  const { mainCategoryNo, filterTag, onChangeField, setField } =
    useClubFormStore();

  const handleSubCategoryClick = useCallback(
    (subCategoryTag) => {
      setField('filterTag', subCategoryTag);
    },
    [setField]
  );

  const handleMainCategoryChange = useCallback(
    (mainCategoryNo) => {
      setField('mainCategoryNo', mainCategoryNo);
    },
    [setField]
  );

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>클럽 목적을 선택해 주세요!</h4>
      <ListCategory
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryClick={handleSubCategoryClick}
      />
    </Box>
  );
};

export default AddClubListCategory;
