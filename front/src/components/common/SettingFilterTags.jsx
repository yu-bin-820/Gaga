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

const SettingFilterTags = ({
  // handleTagToggle,

  handleMainCategory,
  mainCategoryNo,
}) => {
  const [alignment, setAlignment] = useState('left');
  const { selectedTags, setField } = useCommonStore();

  const handleTagToggle = (event, newTags) => {
    if (newTags.length <= 3) {
      setField('selectedTags', newTags);
    }
  };

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [mainCategoryList, setMainCategoryList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [open, setOpen] = useState(true);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/maincategory`)
      .then((response) => {
        // console.log(response.data);
        setMainCategoryList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SPRING_HOST}/rest/meeting/subcategory`)
      .then((response) => {
        // console.log(response.data);
        setSubCategoryList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  const [expanded, setExpanded] = useState(mainCategoryNo || false);

  const handleChange = (mainCategoryNo) => (event, isExpanded) => {
    setExpanded(isExpanded ? mainCategoryNo : false);
    handleMainCategory(mainCategoryNo);
  };

  const handleDelete = useCallback(
    (tagToDelete) => {
      setField(
        'selectedTags',
        selectedTags.filter((tag) => tag !== tagToDelete)
      );
    },
    [selectedTags, setField]
  );

  return (
    <Box>
      <Box>
        {mainCategoryList?.map((mainCategory, i) => (
          <Accordion
            key={i}
            id={mainCategory.mainCategoryNo}
            expanded={expanded === mainCategory.mainCategoryNo}
            onChange={handleChange(mainCategory.mainCategoryNo)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id={mainCategory.mainCategoryNo}
            >
              <Typography sx={{ width: '33%', flexShrink: 0 }}>
                {mainCategory.mainCategoryName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ marginLeft: '10px', marginTop: '7px' }}>
                <StyledToggleButtonGroup
                  value={selectedTags}
                  onChange={handleTagToggle}
                >
                  {subCategoryList?.map((subCategory, k) => {
                    if (
                      subCategory.mainCategoryNo === mainCategory.mainCategoryNo
                    ) {
                      return (
                        <ToggleButton
                          key={k}
                          value={subCategory.tag}
                          aria-label={subCategory.tag}
                          sx={{
                            padding: '5px',
                            minWidth: '85px',
                            margin: '3px',
                            backgroundColor: 'white',
                          }}
                        >
                          {subCategory.tag}
                        </ToggleButton>
                      );
                    }
                  })}
                </StyledToggleButtonGroup>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: '0rem',
          backgroundColor: 'white',
          minWidth: '100vw',
          display: 'flex',
          justifyContent: 'center',
          borderTop: '1px solid #ededed',
          padding: '20px',
        }}
      >
        <Stack alignItems={'center'}>
          <Typography sx={{ marginBottom: '12px', fontSize: '13px' }}>
            선택 된 관심 분야
          </Typography>
          <Stack direction={'row'}>
            {selectedTags?.map((tag, i) => (
              <Chip
                key={tag}
                label={tag}
                sx={{ marginLeft: '10px' }}
                onDelete={() => handleDelete(tag)}
              />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

SettingFilterTags.propTypes = {
  // handleTagToggle: PropTypes.func,
  handleMainCategory: PropTypes.func,
  mainCategoryNo: PropTypes.number,
  selectedTags: PropTypes.array,
  setSelectedTags: PropTypes.func,
};

export default SettingFilterTags;
