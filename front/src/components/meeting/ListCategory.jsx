import { StarBorder } from '@mui/icons-material';
import { Accordion, AccordionDetails, AccordionSummary, Button, Collapse, List, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const ListCategory = () => {
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

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box>

            <Box>
                {mainCategoryList?.map((mainCategory,i)=>(
                          <Accordion key={i} expanded={expanded === 'panel'+i} onChange={handleChange('panel'+i)}>
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
                            {subCategoryList?.map((subCategory, k) => {
                                if (subCategory.mainCategoryNo === mainCategory.mainCategoryNo) {
                                    return (
                                        <Button key={k}
                                            id={subCategory.tag}
                                            onClick={handleClick}
                                        >
                                        {subCategory.tag}
                                    </Button>
                                    )
                                }})}
                          </AccordionDetails>
                        </Accordion>
                    
                ))}
            </Box>
        </Box>
    );
};

export default ListCategory;