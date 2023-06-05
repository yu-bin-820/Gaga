import { Accordion, AccordionDetails, AccordionSummary, Button, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddMeetingParentsClub from './AddMeetingParentsClub';
import AddMeetingInChatMeeting from './AddMeetingInChatMeeting';

const SelectMeetingType = () => {
  const [expanded, setExpanded] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
  };

  const [meetingList, setMeetingList] = useState();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );



  return (
    <Box sx={{ margin: '10px' }}>
      <h4>어떤 모임을 만들까요?</h4>
      <Box sx={{ margin: '10px' }}>
        <h5 style={{ color: 'gray' }}>
        '모임'은 직접 만나 취향 활동을 함께할 수 있어요.
          <br/>
          장기간 함께 하는 공간을 원하실 경우 '클럽'으로 열어주세요!
        </h5>
        </Box>
      <Accordion 
      expanded={expanded === 'panel1'} 
      onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Stack>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>모임</Typography>
            <Typography sx={{ color: 'text.secondary' }}>누구나 자유롭게 참여할 수 있는 모임을 열어요.</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
        </AccordionDetails>
      </Accordion>
      <AddMeetingParentsClub expanded={expanded} handleChange={handleChange} />

      <AddMeetingInChatMeeting expanded={expanded} handleChange={handleChange} userNo={myData.userNo}/>
      <Box>
        {meetingList?.map((meeting, i) => (
          <Box key={i}>
            <h5>{meeting.meetingName}</h5>
            <h5>{meeting.state}</h5>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default SelectMeetingType;