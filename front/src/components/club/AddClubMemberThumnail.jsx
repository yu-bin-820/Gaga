import { ImageListItem, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WcIcon from '@mui/icons-material/Wc';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';

const AddClubMemberThumnail = ({ club }) => {
  const { clubName, clubRegion, clubMaxMemberNo, filterGender } = club;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 2,
        minWidth: 300,
        padding: 1.3,
      }}
    >
      <Stack direction='row' spacing={2}>
        <ImageListItem
          sx={{
            maxWidth: '95px',
            maxHeight: '95px',
            minWidth: '95px',
            minHeight: '95px',
          }}
        >
          <img
            src={`https://images.unsplash.com/photo-1551963831-b3b1ca40c98e?w=164&h=164&fit=crop&auto=format`}
            style={{
              borderRadius: '3px',
              maxWidth: '100%',
              maxHeight: '400px',
              objectFit: 'cover',
            }}
          />
        </ImageListItem>
        <Box>
          <Box
            sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'medium' }}
          >
            {clubName}
          </Box>
          <Box
            sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
          ></Box>
          <Stack spacing={0.5}>
            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <LocationOnIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12 }}>{club?.clubRegion}</Typography>
            </Stack>
          </Stack>
          <Box>
            {filterGender === 0 ? (
              <WcIcon />
            ) : filterGender === 1 ? (
              <ManIcon />
            ) : filterGender === 2 ? (
              <WomanIcon />
            ) : (
              ''
            )}
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

AddClubMemberThumnail.propTypes = {
  club: PropTypes.object.isRequired,
};

export default AddClubMemberThumnail;
