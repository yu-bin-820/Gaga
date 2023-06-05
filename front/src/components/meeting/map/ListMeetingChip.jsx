import { Chip } from '@mui/material';
import React from 'react';

const ListMeetingChip = ({ onClick }) => (
    <Chip
      color="primary"
      size="small"
      onClick={onClick}
      label='이 위치 모임'
      sx={{
        position: 'fixed',
        bottom: '4rem',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
      }}
    />
  );

export default ListMeetingChip;