import fetcher from '@utils/fetcher';
import { useCallback, useEffect, useState } from 'react';
import useSWR from 'swr';
import { useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import MeetingThumbnail from './MeetingThumnail';
import { Box, Stack } from '@mui/system';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import UpdateMeetingReviewDrawer from './UpdateMeetingReviewDrawer';
import AddMeetingReviewDrawer from './AddMeetingReviewDrawer';
import useCommunityStore from '@stores/communication/useCommunityStore';
import useChatMapStore from '@stores/communication/useChatMapStore';

const ListMySuccessMeeting = ({ meeting }) => {
  const [meetingReviewList, setMeetingReviewList] = useState();
  const [meetingNo, setMeetingNo] = useState(0);
  const [reviewNo, setReviewNo] = useState(0);
  const [settingsUpdateReviewOpen, setSettingsUpdateReviewOpen] =
    useState(false);
  const [settingsAddReviewOpen, setSettingsAddReviewOpen] = useState(false);

  const {
    setField: setCommunityField,
    prevChatRoomEntryNo,
    prevGetGroupChatPath,
    prevChatType,
    prevChatRoomLeader,
  } = useCommunityStore();
  const { setField: setChatField } = useChatMapStore();

  const location = useLocation();

  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_SPRING_HOST}/rest/meeting/review/${
          meeting?.meetingNo
        }`
      )
      .then((response) => {
        console.log(response.data);
        setMeetingReviewList(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [meeting?.meetingNo]);

  const isMeetingReview = !!(
    meetingReviewList &&
    meetingReviewList.length &&
    meetingReviewList.some(
      (meetingReview) => meetingReview.meetingReviewerNo === myData?.userNo
    )
  );

  const isMeetingChatRoot = meeting.state === 2 && meeting.meetingState === 2;

  const navigate = useNavigate();

  const onClickAddMeetingReview = useCallback(() => {
    setMeetingNo(meeting?.meetingNo);
    setSettingsAddReviewOpen(true);
  }, [setSettingsAddReviewOpen, meeting?.meetingNo]);

  const toggleSettingsAddReview = useCallback(
    (state) => () => {
      setSettingsAddReviewOpen(state);
    },
    []
  );

  const onClickUpdateMeetingReview = useCallback(() => {
    const matchingMeetingReview = meetingReviewList.find(
      (meetingReview) => meetingReview.meetingReviewerNo === myData?.userNo
    );
    setReviewNo(matchingMeetingReview.meetingReviewNo);
    setSettingsUpdateReviewOpen(true);
  }, [meetingReviewList, myData?.userNo]);

  const toggleSettingsUpdateReview = useCallback(
    (state) => () => {
      setSettingsUpdateReviewOpen(state);
    },
    []
  );

  const onClickChatRoom = useCallback(() => {
    setChatField('shouldScroll', true);
    setChatField('infiniteScroll', false);
    const isArray = Array.isArray(prevChatRoomEntryNo);
    const isPrevPathArray = Array.isArray(prevGetGroupChatPath);

    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    setCommunityField('chatRoomEntryNo', meeting?.meetingNo);
    setCommunityField('chatType', 2);
    setCommunityField('chatRoomLeader', meeting?.meetingLeaderNo);

    setCommunityField(
      'prevChatRoomEntryNo',
      isArray
        ? [...prevChatRoomEntryNo, meeting?.meetingNo]
        : [meeting?.meetingNo]
    );
    setCommunityField('prevChatType', isArray ? [...prevChatType, 2] : [2]);
    setCommunityField(
      'prevChatRoomLeader',
      isArray
        ? [...prevChatRoomLeader, meeting?.meetingLeaderNo]
        : [meeting?.meetingLeaderNo]
    );

    setCommunityField(
      'prevGetGroupChatPath',
      isPrevPathArray
        ? [...prevGetGroupChatPath, location.pathname]
        : [location.pathname]
    );

    console.log(prevChatRoomEntryNo, prevChatRoomLeader, prevChatType);
    console.log('----------------------------------------------------');
    console.log('isArray', isArray);
    console.log('isPrevPathArray', isPrevPathArray);
    console.log('prevChatRoomEntryNo', prevChatRoomEntryNo);
    console.log('prevChatType', prevChatType);
    console.log('prevChatRoomLeader', prevChatRoomLeader);

    navigate(`/chat/group/message/list`);
  }, [
    meeting,
    setChatField,
    setCommunityField,
    location,
    navigate,
    prevChatRoomEntryNo,
    prevChatType,
    prevChatRoomLeader,
    prevGetGroupChatPath,
  ]);

  console.log(isMeetingReview);

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
        <Stack spacing={0.8}>
          <MeetingThumbnail meeting={meeting} />
          <Stack direction={'row'} justifyContent="center" spacing={1.5}>
            {!isMeetingReview && (
              <Button
                variant="outlined"
                sx={{ width: '180px' }}
                onClick={onClickAddMeetingReview}
              >
                후기작성
              </Button>
            )}
            {isMeetingReview && (
              <Button
                variant="outlined"
                sx={{ width: '180px' }}
                onClick={onClickUpdateMeetingReview}
              >
                후기수정
              </Button>
            )}
            {isMeetingChatRoot && (
              <Button
                variant="outlined"
                sx={{ width: '180px' }}
                onClick={onClickChatRoom}
              >
                채팅방 입장
              </Button>
            )}
          </Stack>
        </Stack>

        <AddMeetingReviewDrawer
          settingsAddReviewOpen={settingsAddReviewOpen}
          setSettingsAddReviewOpen={setSettingsAddReviewOpen}
          toggleSettingsAddReview={toggleSettingsAddReview}
          meetingNo={meetingNo}
        />
        <UpdateMeetingReviewDrawer
          settingsUpdateReviewOpen={settingsUpdateReviewOpen}
          setSettingsUpdateReviewOpen={setSettingsUpdateReviewOpen}
          toggleSettingsUpdateReview={toggleSettingsUpdateReview}
          reviewno={reviewNo}
        />
      </Box>
    </div>
  );
};

ListMySuccessMeeting.propTypes = {
  meeting: PropTypes.object.isRequired,
};

export default ListMySuccessMeeting;
