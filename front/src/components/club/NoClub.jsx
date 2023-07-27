import React from 'react';
import StarsIcon from '@mui/icons-material/Stars';
import { Box, Stack } from '@mui/system';
import PropTypes from 'prop-types';

const NoClub = ({ ment }) => {
  return (
    <Box
      padding={3}
      sx={{
        borderRadius: 2,
        p: 2,
        minWidth: 295,
        padding: 1,
        backgroundColor: '#ffffff',
      }}
    >
      <Stack justifyContent={'center'} alignItems={'center'} spacing={1}>
        <StarsIcon sx={{ fontSize: 30 }} color='disabled' />
        <p>{ment}</p>
      </Stack>
    </Box>
  );
};

NoClub.propTypes = {
  ment: PropTypes.object.isRequired,
};

export default NoClub;
