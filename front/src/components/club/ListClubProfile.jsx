import { Box, Stack } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import ClubThumbnail from './ClubThumbnail';

const ListClubProfile = ({ club }) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        minWidth: 295,
        padding: 1,
        backgroundColor: '#ffffff',
      }}
    >
      <Stack spacing={0.8}>
        <ClubThumbnail club={club} />
      </Stack>
    </Box>
  );
};

ListClubProfile.propTypes = {
  club: PropTypes.object.isRequired,
};

export default ListClubProfile;
