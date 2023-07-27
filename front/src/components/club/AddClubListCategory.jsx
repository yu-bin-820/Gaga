import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ListCategory from '../common/ListCategory';
import useClubFormStore from '@hooks/club/useClubFormStore';
import PropTypes from 'prop-types';

const AddClubListCategory = ({ setNextButtonDisable }) => {
  const { mainCategoryNo, filterTag, onChangeField, setField } =
    useClubFormStore();

  useEffect(() => {
    if (mainCategoryNo || filterTag) {
      setNextButtonDisable(false);
    } else {
      setNextButtonDisable(true);
    }
  }, [mainCategoryNo, filterTag, setNextButtonDisable]);

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
      <h4>{'클럽 목적을 선택해 주세요!'}</h4>
      <ListCategory
        onMainCategoryChange={handleMainCategoryChange}
        onSubCategoryClick={handleSubCategoryClick}
        mainCategoryNo={mainCategoryNo}
        subCategoryTag={filterTag}
      />
    </Box>
  );
};

AddClubListCategory.propTypes = {
  setNextButtonDisable: PropTypes.bool,
};

export default AddClubListCategory;
