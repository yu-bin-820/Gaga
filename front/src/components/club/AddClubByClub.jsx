import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';

const AddClubByClub = ({
  expanded,
  handleChange,
  userNo,
  onParentClubNoClick,
}) => {
  const [clubList, setClubList] = useState();

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/club/list/joincreate/${userNo}`
      )
      .then((response) => {
        console.log(response.data);
        setClubList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userNo]);
  const [alignment, setAlignment] = useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const onClickParentClub = (clubNo) => {
    console.log('부모클럽번호', clubNo);
    onParentClubNoClick(clubNo);
  };

  console.log(userNo);

  if (!clubList) {
    return <>로딩중</>;
  }

  return (
    <Accordion
      expanded={expanded === 'parentClub'}
      onChange={handleChange('parentClub')}
      sx={{
        backgroundColor: expanded === 'parentClub' ? '#f3f8f7' : '#ffffff',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel3bh-content'
        id='panel3bh-header'
      >
        <Stack>
          <Typography sx={{ width: '60%', flexShrink: 0 }}>
            {'기존 클럽 기반 새 클럽'}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {' 기존 클럽 멤버를 초대하는 클럽을 열어요.'}
            <br />
            {'클럽이 남아있는 경우에만 가능해요!'}
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <StyledToggleButtonGroup
          size='small'
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label='text alignment'
        >
          {clubList?.map((club, k) => (
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

AddClubByClub.propTypes = {
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  userNo: PropTypes.number,
  onParentClubNoClick: PropTypes.func,
};
export default AddClubByClub;
