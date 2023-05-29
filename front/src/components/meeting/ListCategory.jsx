import { Accordion, AccordionDetails, AccordionSummary, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { styled } from '@mui/material/styles';
import useMeetingFormStore from '@hooks/meeting/useMeetingFormStore';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
    display: 'flex',
    flexWrap: 'wrap',
  }));

const ListCategory = () => {

    const {
        mainCategoryNo,
        filterTag,
        onChangeField,
        setField
      } = useMeetingFormStore();

    const [alignment, setAlignment] = React.useState('left');
  
    const handleAlignment = (event, newAlignment) => {
      setAlignment(newAlignment);
    };

    const [mainCategoryList, setMainCategoryList] = useState();
    const [subCategoryList, setSubCategoryList] = useState();
    const [open, setOpen] = useState(true);

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/maincategory`)
            .then((response)=>{
                console.log(response.data);
                setMainCategoryList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

    useEffect(()=>{
        axios
            .get(`http://${import.meta.env.VITE_SPRING_HOST}/rest/meeting/subcategory`)
            .then((response)=>{
                console.log(response.data);
                setSubCategoryList(response.data);
            })
            .catch((error)=>{
                console.log(error);
            });
    },[]);

    const handleClick = () => {
        setOpen(!open);
    };
    
    const onClickSubCategory = useCallback((e)=>{
      console.log('서브카테고리',e.currentTarget.value);
      setField('filterTag',e.currentTarget.value)
    },[setField]);

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
      setField('mainCategoryNo',event.currentTarget.id)
    };

    return (
        <Box>
          <Box>
            {mainCategoryList?.map((mainCategory, i) => (
              <Accordion 
              key={i} 
              id={mainCategory.mainCategoryNo}
              expanded={expanded === i} 
              onChange={handleChange(i)}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id={mainCategory.mainCategoryNo}>
                  <Typography sx={{ width: '33%', flexShrink: 0 }}>{mainCategory.mainCategoryName}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <StyledToggleButtonGroup size="small" value={alignment} exclusive onChange={handleAlignment} aria-label="text alignment">
                    {subCategoryList?.map((subCategory, k) => {
                      if (subCategory.mainCategoryNo === mainCategory.mainCategoryNo) {
                        return (
                          <ToggleButton key={k} value={subCategory.tag} aria-label={subCategory.tag} onClick={onClickSubCategory}>
                            {subCategory.tag}
                          </ToggleButton>
                        );
                      }
                    })}
                  </StyledToggleButtonGroup>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Box>
      );
    };
    
    export default ListCategory;