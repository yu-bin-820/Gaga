import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AddMeetingParentsClub = ({ expanded, handleChange }) => {
  return (
    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2bh-content" id="panel2bh-header">
        <Stack>
          <Typography sx={{ width: '33%', flexShrink: 0 }}>클럽 기반 모임</Typography>
          <Typography sx={{ color: 'text.secondary' }}>가입했거나 운영하는 클럽멤버를 초대하는 모임을 열어요.</Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus, varius pulvinar diam eros in elit.
          Pellentesque convallis laoreet laoreet.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

AddMeetingParentsClub.propTypes = {
  expanded: PropTypes.object.isRequired,
  handleChange: PropTypes.object.isRequired,
};

export default AddMeetingParentsClub;