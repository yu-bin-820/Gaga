import { Accordion, AccordionDetails, AccordionSummary, ToggleButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';

const AddMeetingParentsClub = ({ expanded, handleChange, userNo, onParentClubNoClick }) => {

  const [clubListList, setClubList] = useState();

  
  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/club/list/join/${
          userNo
        }`
      )
      .then((response) => {
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userNo]);

  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const onClickParentClub = (clubNo) => {
    console.log('부모클럽번호', clubNo);
    onParentClubNoClick(clubNo); 
  };


  return (
    <Accordion 
    expanded={expanded === 'parentClub'} 
    onChange={handleChange('parentClub')}
    sx={{ backgroundColor: expanded === "parentClub" ? "#e1ede7" : "white" }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
        <Stack>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>클럽 기반 모임</Typography>
          <Typography sx={{ color: 'text.secondary' }}>가입했거나 운영하는 클럽멤버를 초대하는 모임을 열어요.</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
      <StyledToggleButtonGroup
                    size="small" 
                    value={alignment} 
                    exclusive 
                    onChange={handleAlignment} 
                    aria-label="text alignment"
                  >
                    {clubListList?.map((club, k) => (
                    <ToggleButton
                        key={k} 
                        value={club.clubNo} 
                        aria-label={club.clubNo} 
                        onClick={() => onClickParentClub(club.clubNo)}
                    >
                        {club.clubName}
                    </ToggleButton>
                ))}
                  </StyledToggleButtonGroup>
      </AccordionDetails>
    </Accordion>
  );
};

AddMeetingParentsClub.propTypes = {
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  userNo: PropTypes.number,
  onParentClubNoClick: PropTypes.func,
};

export default AddMeetingParentsClub;