import React, { useState } from 'react';
import { Box, Stack, ThemeProvider, createTheme } from '@mui/system';
import { Avatar, AvatarGroup, Chip, ImageListItem, Paper } from '@mui/material';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { useCallback } from 'react';

const StyledAvatarGroup = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    width: 24,
    height: 24,
    fontSize: 12,
  },
});

const ClubThumbnail = ({ club }) => {
  const navigate = useNavigate();
  const [imageLoadingError, setImageLoadingError] = useState(false);

  const onClickClub = useCallback((event) => {
    navigate(`/club/no/${clubNo}`);
  }, []);

  const handleImageError = useCallback(() => {
    setImageLoadingError(true);
  }, []);

  const {
    clubName,
    clubRegion,
    clubMaxMemberNo,
    memberCount,
    clubNo,
    clubImg,
  } = club;
  return (
    <Box
      sx={{
        margin: 1,
        bgcolor: 'background.paper',
        boxShadow: 1,
        borderRadius: 2,
        p: 2,
        minWidth: 300,
        padding: 1.3,
      }}
    >
      <Stack direction='row' spacing={2}>
        <ImageListItem
          sx={{
            maxWidth: '100px',
            maxHeight: '100px',
            minWidth: '100px',
            minHeight: '100px',
          }}
        >
          {club?.clubImg ? (
            <img
              src={`${import.meta.env.VITE_SPRING_HOST}/upload_images/club/${
                club?.clubImg
              }`}
              alt='noImg'
              loading='lazy'
              onError={handleImageError}
            />
          ) : (
            <img
              src={`https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c`}
            />
          )}
        </ImageListItem>
        <Box>
          <Chip label={club.filterTag} size='small' />
          <Box
            sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'medium' }}
          >
            {clubName}
          </Box>

          <Box
            sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
          >
            {clubRegion}
          </Box>
          <Stack direction='row' spacing={2}>
            <StyledAvatarGroup max={6}>
              <Avatar alt='Remy Sharp' src='/static/images/avatar/1.jpg' />
              <Avatar alt='Travis Howard' src='/static/images/avatar/2.jpg' />
              <Avatar alt='Cindy Baker' src='/static/images/avatar/3.jpg' />
              <Avatar alt='Agnes Walker' src='/static/images/avatar/4.jpg' />
              <Avatar
                alt='Trevor Henderson'
                src='/static/images/avatar/5.jpg'
              />
              <Avatar
                alt='Trevor Henderson'
                src='/static/images/avatar/5.jpg'
              />
              <Avatar
                alt='Trevor Henderson'
                src='/static/images/avatar/5.jpg'
              />
              <Avatar
                alt='Trevor Henderson'
                src='/static/images/avatar/5.jpg'
              />
            </StyledAvatarGroup>
            <Box
              sx={{
                color: 'text.secondary',
                display: 'inline',
                fontSize: 14,
              }}
            >
              {memberCount}/{clubMaxMemberNo}
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

ClubThumbnail.propTypes = {
  club: PropTypes.shape({
    clubNo: PropTypes.number.isRequired,
    clubImg: PropTypes.string.isRequired,
    filterTag: PropTypes.string.isRequired,
    clubName: PropTypes.string.isRequired,
    clubRegion: PropTypes.string.isRequired,
    clubMaxMemberNo: PropTypes.number.isRequired,
    memberCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default ClubThumbnail;
