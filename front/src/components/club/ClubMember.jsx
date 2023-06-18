import { Avatar, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import PropTypes from 'prop-types';
import useCommunityStore from '@stores/communication/useCommunityStore';

const ClubMember = ({ member }) => {
  const { userNo, nickName, profileImg, userIntro } = member;

  const location = useLocation();
  const navigate = useNavigate();

  const { setField, prevProfilePath } = useCommunityStore();

  const onClickProfileImg = useCallback(
    (e) => {
      const isArray = Array.isArray(prevProfilePath);
      console.log('getMeetingMeetingMemberClickIsArray', isArray);
      console.log(
        'getMeetingMeetingMemberClickPrevProfilePath',
        prevProfilePath
      );

      setField(
        'prevProfilePath',
        isArray ? [...prevProfilePath, location.pathname] : [location.pathname]
      );
      console.log(
        'getMeetingMeetingMemberClick...PrevProfilePathAdd',
        prevProfilePath
      );
      navigate(`/community/profile/userno/${e.currentTarget.dataset.value}`);
    },
    [navigate, setField, location, prevProfilePath]
  );

  return (
    <div>
      <Box
        sx={{
          margin: '10px',
          justifyContent: 'left',
          display: 'flex',
        }}
      >
        <Stack
          direction={'row'}
          spacing={10}
          alignItems={'center'}
          onClick={onClickProfileImg}
          data-value={userNo}
        >
          <div>
            <Avatar
              alt={nickName}
              src={`${
                import.meta.env.VITE_CDN_HOST
              }/upload_images/user/${profileImg}`}
              sx={{ width: 40, height: 40 }}
            />
          </div>
          <Stack direction="column" spacing={0} alignItems="left">
            <Typography sx={{ fontSize: 15 }}>{nickName}</Typography>
            <Typography sx={{ fontSize: 10 }}>{userIntro}</Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

ClubMember.propTypes = {
  member: PropTypes.shape({
    userNo: PropTypes.number.isRequired,
    nickName: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    userIntro: PropTypes.string.isRequired,
  }).isRequired,
};

export default ClubMember;
