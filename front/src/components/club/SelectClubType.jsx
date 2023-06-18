import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  List,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import fetcher from '@utils/fetcher';
import React, { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddClubByMeeting from './AddClubByMeeting';
import AddClubByClub from './AddClubByClub';
import PropTypes from 'prop-types';
import useClubFormStore from '@hooks/club/useClubFormStore';

const SelectClubType = ({ setNextButtonDisable }) => {
  const [expanded, setExpanded] = useState(null);
  const { parentMeetingNo, parentClubNo, setField, onChangeField } =
    useClubFormStore();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : null);
    setField('parentMeetingNo', 0);
    setField('parentClubNo', 0);
  };

  useEffect(() => {
    if (
      expanded === 'club' ||
      (expanded === 'parentClub' && parentClubNo) ||
      (expanded === 'parentMeeting' && parentMeetingNo)
    ) {
      setNextButtonDisable(false);
    } else {
      setNextButtonDisable(true);
    }
  }, [setNextButtonDisable, expanded, parentClubNo, parentMeetingNo]);

  const [clubList, setClubList] = useState();

  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const handleParentMeetingNoClick = useCallback(
    (meetingNo) => {
      setField('parentMeetingNo', meetingNo);
    },
    [setField]
  );

  const handleParentClubNoClick = useCallback(
    (clubNo) => {
      setField('parentClubNo', clubNo);
    },
    [setField]
  );

  return (
    <Box sx={{ margin: '10px' }}>
      <h4>어떤 클럽을 만들까요?</h4>
      <Box sx={{ margin: '10px' }}>
        <h5 style={{ color: 'gray' }}>
          {"'클럽'은 나와 취향에 맞는 사람들과의 공간을 만들어요."}
          <br />
          {"직접 만나 취향에 맞는 활동을 하고 싶으시면 '모임'으로 열어주세요!"}
        </h5>
      </Box>
      <Accordion
        expanded={expanded === 'club'}
        onChange={handleChange('club')}
        sx={{ backgroundColor: expanded === 'club' ? '#f3f8f7' : '#ffffff' }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Stack>
            <Typography sx={{ width: '33%', flexShrink: 0 }}>
              {'클럽'}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {'누구나 자유롭게 참여할 수 있는 클럽을 열어요.'}
            </Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails></AccordionDetails>
      </Accordion>
      <AddClubByMeeting
        expanded={expanded}
        userNo={myData?.userNo}
        handleChange={handleChange}
        onParentMeetingNoClick={handleParentMeetingNoClick}
      />

      <AddClubByClub
        expanded={expanded}
        userNo={myData?.userNo}
        handleChange={handleChange}
        onParentClubNoClick={handleParentClubNoClick}
      />
      <Box>
        {clubList?.map((club, i) => (
          <Box key={i}>
            <h5>{club.clubName}</h5>
            <h5>{club.state}</h5>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

SelectClubType.propTypes = {
  setNextButtonDisable: PropTypes.bool,
};

export default SelectClubType;
