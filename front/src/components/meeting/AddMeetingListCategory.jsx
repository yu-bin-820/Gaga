import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect } from 'react';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';
import ListCategory from '../common/ListCategory';
import PropTypes from 'prop-types';

const AddMeetingListCategory = ({ setNextButtonDisable }) => {
  const { mainCategoryNo, filterTag, onChangeField, setField } =
    useMeetingFormStore();

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

AddMeetingListCategory.propTypes = {
  setNextButtonDisable: PropTypes.bool,
};

export default AddMeetingListCategory;
