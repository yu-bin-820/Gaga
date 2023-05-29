import { Avatar, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router';
import PropTypes from 'prop-types';


const MeetingMember = ({ member }) => {
    const { userNo, nickName, profileImg, userIntro} = member;

    const navigate = useNavigate();

    const onClickProfileImg = useCallback(
      (e) => {
        navigate(`/community/profile/userno/${e.currentTarget.dataset.value}`);
      },
      [navigate]
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
          <Stack direction={'row'} spacing={10} alignItems={'center'}
           onClick={onClickProfileImg} data-value={userNo}>
            <div>
              <Avatar
                alt={nickName}
                src={`/static/images/avatar/2.jpg`}
                sx={{ width: 40, height: 40 }}
              />
            </div>
            <Stack direction="column" spacing={0} alignItems="left">
              <Typography sx={{ fontSize: 15 }}>
                {nickName}
              </Typography>
              <Typography sx={{ fontSize: 10 }}>{userIntro}</Typography>
            </Stack>
          </Stack>
        </Box>
        </div>
    );
};


MeetingMember.propTypes = {
    member: PropTypes.shape({
    userNo: PropTypes.number.isRequired,
    nickName: PropTypes.string.isRequired,
    profileImg: PropTypes.string.isRequired,
    userIntro: PropTypes.string.isRequired,
    }).isRequired,
  };

export default MeetingMember;