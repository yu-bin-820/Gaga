import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ToggleButton,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useEffect, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';

const AddClubByMeeting = ({ expanded, handleChange, userNo }) => {
  const [meetingList, setMeetingList] = useState();

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_SPRING_HOST
        }/rest/meeting/list/inchat/no/${userNo}`
      )
      .then((response) => {
        console.log(response.data);
        setMeetingList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userNo]);

  const [alignment, setAlignment] = React.useState('left');

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const onClickSubCategory = (subCategoryTag) => {
    console.log('서브카테고리', subCategoryTag);
    //onSubCategoryClick(subCategoryTag); // 부모 컴포넌트로 subCategoryTag 전달
  };

  console.log(userNo);

  return (
    <Accordion
      expanded={expanded === 'panel2'}
      onChange={handleChange('panel2')}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel2bh-content'
        id='panel2bh-header'
      >
        <Stack>
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            모임 기반 클럽
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            가입했거나 운영하는 모임의 멤버를 초대하는 클럽을 열어요.
            <br />
            채팅방이 남아있는 경우에만 가능해요!
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
          {meetingList?.map((meeting, k) => {
            <ToggleButton
              key={k}
              value={meeting.meetingNo}
              aria-label={meeting.meetingNo}
              onClick={() => onClickSubCategory(meeting.meetingNo)}
            >
              {meeting.meetingName}
            </ToggleButton>;
          })}
        </StyledToggleButtonGroup>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddClubByMeeting;
