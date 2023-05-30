import { Avatar, AvatarGroup, Chip, ImageListItem, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React from 'react';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

const StyledAvatarGroup = styled(AvatarGroup)({
  '& .MuiAvatar-root': {
    width: 24,
    height: 24,
    fontSize: 12,
  },
});

const CenteredText = styled('h5')({
  display: 'flex',
  alignItems: 'center',
});

const AddMeetingMemberThumnail = ({ meeting }) => {
  const { meetingName, meetingAddr, meetingMaxMemberNo } = meeting;

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 2,
        minWidth: 300,
        padding: 1.3,
      }}
    >
      <Stack direction="row" spacing={2}>
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
            style={{ borderRadius: '3px' }}
          />
        </ImageListItem>
        <Box>
          <Box
            sx={{ color: 'text.primary', fontSize: 16, fontWeight: 'medium' }}
          >
            {meetingName}
          </Box>

          <Box
            sx={{ color: 'text.secondary', display: 'inline', fontSize: 12 }}
          >
          </Box>
          <Stack spacing={0.5}>

            <Stack direction={'row'} spacing={1} alignItems={'center'}>
              <LocationOnIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12 }}>
                {meeting?.meetingAddr}
              </Typography>
            </Stack>

            <CenteredText>
              <CalendarMonthIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12 }}>
              {meeting?.meetingDate}
              </Typography>
            </CenteredText>

            <CenteredText>
              <QueryBuilderIcon sx={{ fontSize: 14 }} />
              <Typography sx={{ fontSize: 12 }}>
              {meeting?.meetingStartTime} ~ {meeting?.meetingEndTime}
              </Typography>
            </CenteredText>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

AddMeetingMemberThumnail.propTypes = {
  meeting: PropTypes.shape({
    filterTag: PropTypes.string.isRequired,
    meetingName: PropTypes.string.isRequired,
    meetingAddr: PropTypes.string.isRequired,
    meetingMaxMemberNo: PropTypes.number.isRequired,
    meetingDate: PropTypes.string.isRequired,
    meetingStartTime: PropTypes.number.isRequired,
    meetingEndTime: PropTypes.number.isRequired,
  }).isRequired,
};

export default AddMeetingMemberThumnail;