import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListMyClub from './ListMyClub';

const AddClubByClub = ({ expanded, handleChange }) => {
  return (
    <Accordion
      expanded={expanded === 'panel3'}
      onChange={handleChange('panel3')}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls='panel3bh-content'
        id='panel3bh-header'
      >
        <Stack>
          <Typography sx={{ width: '60%', flexShrink: 0 }}>
            기존 클럽 기반 새 클럽
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            기존 클럽 멤버를 초대하는 클럽을 열어요.
            <br />
            클럽이 남아있는 경우에만 가능해요!
          </Typography>
        </Stack>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <ListMyClub />
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default AddClubByClub;
