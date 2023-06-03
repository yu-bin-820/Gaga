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
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );



  return (
    <Box>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
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
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget maximus est, id dignissim quam.
          </Typography>
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