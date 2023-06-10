import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Chip,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import PropTypes from 'prop-types';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StyledToggleButtonGroup from './StyledToggleButtonGroup';
import useCommonStore from '@stores/common/useCommonStore';
import CancelIcon from '@mui/icons-material/Cancel';
import { Cancel } from '@mui/icons-material';

const SettingFilterStepThree = ({
  // handleTagToggle,

  handleMainCategory,
  mainCategoryNo,
}) => {
  const { selectedTags } = useCommonStore();

  return (
    <Stack>
      <h4 style={{ marginBottom: '5px' }}>관심분야</h4>
      <Stack direction={'row'}>
        {selectedTags?.map((tag, i) => (
          <Chip key={tag} label={tag} sx={{ marginLeft: '10px' }} />
        ))}
      </Stack>
    </Stack>
  );
};

SettingFilterStepThree.propTypes = {
  // handleTagToggle: PropTypes.func,
  handleMainCategory: PropTypes.func,
  mainCategoryNo: PropTypes.number,
  selectedTags: PropTypes.array,
  setSelectedTags: PropTypes.func,
};

export default SettingFilterStepThree;
