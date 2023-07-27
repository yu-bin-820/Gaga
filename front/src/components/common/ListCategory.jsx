import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButton,
  Typography,
} from "@mui/material";
import PropTypes from 'prop-types';
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StyledToggleButtonGroup from "./StyledToggleButtonGroup";

const ListCategory = ({ onMainCategoryChange, onSubCategoryClick, mainCategoryNo, subCategoryTag }) => {
  const [alignment, setAlignment] = React.useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const [mainCategoryList, setMainCategoryList] = useState();
  const [subCategoryList, setSubCategoryList] = useState();
  const [open, setOpen] = useState(true); 

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/maincategory`
      )
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
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/subcategory`
      )
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

  const onClickSubCategory = (subCategoryTag) => {
    console.log("서브카테고리", subCategoryTag);
    onSubCategoryClick(subCategoryTag); // 부모 컴포넌트로 subCategoryTag 전달
  };

  const [expanded, setExpanded] = React.useState(mainCategoryNo || false);

  const handleChange = (mainCategoryNo) => (event, isExpanded) => {
    setExpanded(isExpanded ? mainCategoryNo : false);
    onMainCategoryChange(mainCategoryNo); // 부모 컴포넌트로 mainCategoryNo 전달
  };

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
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                {mainCategory.mainCategoryName}
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <StyledToggleButtonGroup
                size="small"
                value={alignment}
                exclusive
                onChange={handleAlignment}
                aria-label="text alignment"
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
                        onClick={() => onClickSubCategory(subCategory.tag)}
                      >
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

ListCategory.propTypes = {
  onMainCategoryChange: PropTypes.func,
  onSubCategoryClick: PropTypes.func,
  mainCategoryNo: PropTypes.number,
  subCategoryTag: PropTypes.string,
};

export default ListCategory;
