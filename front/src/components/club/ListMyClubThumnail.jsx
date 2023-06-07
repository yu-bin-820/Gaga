import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import MeetingThumbnail from './MeetingThumnail';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import ClubThumbnail from './ClubThumbnail';

const ListMyClubThumnail = ({ club }) => {
  const { state, clubState, clubNo } = club;

  const navigate = useNavigate();

  const onClickListClubMember = useCallback((event) => {
    const { id } = event.target;
    navigate(`/club/member/listmember/clubno/${clubNo}`);
  }, []);

  return (
    <div>
      <Box
        sx={{
          borderRadius: 2,
          p: 2,
          minWidth: 295,
          padding: 1,
          backgroundColor: '#ffffff',
        }}
      >
        <ClubThumbnail club={club} />
        <Button onClick={onClickListClubMember}>멤버목록</Button>
      </Box>
    </div>
  );
};

ListMyClubThumnail.propTypes = {
  club: PropTypes.shape({
    clubState: PropTypes.number.isRequired,
    state: PropTypes.number.isRequired,
    clubNo: PropTypes.number.isRequired,
  }).isRequired,
};

export default ListMyClubThumnail;
