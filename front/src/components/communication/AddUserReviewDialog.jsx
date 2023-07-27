import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import PropTypes from 'prop-types';
import {
  Avatar,
  Divider,
  IconButton,
  ImageList,
  ImageListItem,
  List,
  ListItem,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import { useCallback, useEffect, useState } from 'react';
import { Box, Stack } from '@mui/system';
import axios from 'axios';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';

import MoodIcon from '@mui/icons-material/Mood';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { styled } from '@mui/system';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
  '& .MuiToggleButtonGroup-grouped': {
    margin: theme.spacing(0.5),
    border: 0,
    '&.Mui-disabled': {
      border: 0,
    },
    '&:not(:first-of-type)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-of-type': {
      borderRadius: theme.shape.borderRadius,
    },
  },
  display: 'flex',
  flexWrap: 'wrap',
}));

export default function AddUserReviewDialog({
  open,
  setOpen,
  reviewerNo,
  reviewedNo,
  isUpdate,
  mutateUser,
  onCloseDuplicateUserReviewDialog,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  const { data: userReviewData, mutate: mutateUserReview } = useSWR(
    `${
      import.meta.env.VITE_SPRING_HOST
    }/rest/community/userreview/reviewerno/${reviewerNo}/reviewedno/${reviewedNo}`,
    fetcher
  );
  const [view, setView] = useState(
    userReviewData?.userScore?.toString() || 'list'
  );
  const [userScore, setUserScore] = useState(3);

  const handleChange = (event, nextView) => {
    setView(nextView);

    setUserScore(event.currentTarget.value);
    console.log('userScore', userScore);
    console.log('nextView', nextView);
  };

  const submitUserReview = useCallback(() => {
    const data = {
      reviewerNo: reviewerNo,
      reviewedNo: reviewedNo,
      userScore: userScore,
    };

    console.log(isUpdate);

    isUpdate
      ? axios
          .patch(
            `${
              import.meta.env.VITE_SPRING_HOST
            }/rest/community/userreview`,
            data,
            { withCredentials: true }
          )
          .then(() => {
            setOpen(false);
            onCloseDuplicateUserReviewDialog();
            mutateUserReview();
            mutateUser();
          })
          .catch((error) => {
            console.dir(error);
          })
      : axios
          .post(
            `${
              import.meta.env.VITE_SPRING_HOST
            }/rest/community/userreview`,
            data,
            { withCredentials: true }
          )
          .then(() => {
            setOpen(false);
            mutateUserReview();
            mutateUser();
          })
          .catch((error) => {
            console.dir(error);
          });
  }, [
    reviewerNo,
    reviewedNo,
    setOpen,
    userScore,
    mutateUserReview,
    isUpdate,
    mutateUser,
    onCloseDuplicateUserReviewDialog,
  ]);

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'center' }}>
          회원 평가
        </DialogTitle>
        <DialogContent>
          <StyledToggleButtonGroup
            orientation="vertical"
            value={view}
            exclusive
            onChange={handleChange}
          >
            <ToggleButton
              value="5"
              aria-label="5"
              sx={{ justifyContent: 'flex-start' }}
            >
              <Stack direction={'row'} spacing={2}>
                <MoodIcon />
                <Typography>최고예요</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              value="4"
              aria-label="4"
              sx={{ justifyContent: 'flex-start' }}
            >
              <Stack direction={'row'} spacing={2}>
                <SentimentSatisfiedIcon />
                <Typography>좋아요</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              value="3"
              aria-label="3"
              sx={{ justifyContent: 'flex-start' }}
            >
              <Stack direction={'row'} spacing={2}>
                <SentimentNeutralIcon />
                <Typography>보통이에요</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              value="2"
              aria-label="2"
              sx={{ justifyContent: 'flex-start' }}
            >
              <Stack direction={'row'} spacing={2}>
                <SentimentDissatisfiedIcon />
                <Typography>별로예요</Typography>
              </Stack>
            </ToggleButton>

            <ToggleButton
              value="1"
              aria-label="1"
              sx={{ justifyContent: 'flex-start' }}
            >
              <Stack direction={'row'} spacing={2}>
                <SentimentVeryDissatisfiedIcon />
                <Typography>최악이에요</Typography>
              </Stack>
            </ToggleButton>
          </StyledToggleButtonGroup>
        </DialogContent>
        <Stack
          direction={'row'}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '15px',
          }}
        >
          <Button onClick={handleClose}>취소</Button>
          <Button onClick={submitUserReview}>평가하기</Button>
        </Stack>
      </Dialog>
    </div>
  );
}
AddUserReviewDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  reviewerNo: PropTypes.number,
  reviewedNo: PropTypes.string,

  isUpdate: PropTypes.bool,
  mutateUser: PropTypes.func,
  onCloseDuplicateUserReviewDialog: PropTypes.func,
};
