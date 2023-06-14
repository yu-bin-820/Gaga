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
import PropTypes from 'prop-types';
import StyledToggleButtonGroup from '@components/common/StyledToggleButtonGroup';

const AddClubByMeeting = ({
  expanded,
  handleChange,
  userNo,
  onParentMeetingNoClick,
}) => {
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

  const onClickParentMeeting = (meetingNo) => {
    console.log('부모미팅번호', meetingNo);
    onParentMeetingNoClick(meetingNo);
  };

  console.log(userNo);

  if (!meetingList) {
    return <>로딩중</>;
  }

  return (
    <Accordion
      expanded={expanded === 'parentMeeting'}
      onChange={handleChange('parentMeeting')}
      sx={{
        backgroundColor: expanded === 'parentMeeting' ? '#f3f8f7' : '#ffffff',
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel2bh-content'
        id='panel2bh-header'
      >
        <Stack>
          <Typography sx={{ width: '100%', flexShrink: 0 }}>
            {'모임 기반 클럽'}
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {'가입했거나 운영하는 모임의 멤버를 초대하는 클럽을 열어요.'}
            <br />
            {'채팅방이 남아있는 경우에만 가능해요!'}
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
          {meetingList?.map((meeting, k) => (
            <ToggleButton
              key={k}
              value={meeting.meetingNo}
              aria-label={meeting.meetingNo}
              onClick={() => onClickParentMeeting(meeting.meetingNo)}
            >
              {meeting.meetingName}
            </ToggleButton>
          ))}
        </StyledToggleButtonGroup>
      </AccordionDetails>
    </Accordion>
  );
};

AddClubByMeeting.propTypes = {
  expanded: PropTypes.string,
  handleChange: PropTypes.func,
  userNo: PropTypes.number,
  onParentMeetingNoClick: PropTypes.func,
};

export default AddClubByMeeting;
