import {
  Drawer,
  IconButton,
  SwipeableDrawer,
  TextField,
  Typography,
} from '@mui/material';
import { Box, Stack } from '@mui/system';
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ChatMap from './ChatMap';
import useChatMapStore from '@stores/communication/useChatMapStore';
import DirectChatMap from './DirectChatMap';

const DirectLocationDrawer = ({
  toggleLocationDrawer,
  postPath,
  mutateDirectMessages,
  senderNo,
  receiverNo,
}) => {
  const { locationDrawerOpen, setField } = useChatMapStore();
  const onClickCloseLocationDrawer = useCallback(() => {
    setField('locationDrawerOpen', false);
  }, [setField]);

  return (
    <Drawer
      anchor="right"
      open={locationDrawerOpen}
      onClose={toggleLocationDrawer(false)}
      onOpen={toggleLocationDrawer(true)}
    >
      <Box sx={{ minWidth: '100vw' }}>
        <Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ height: '55px' }}
          >
            <IconButton onClick={onClickCloseLocationDrawer}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <Box
              sx={{
                minWidth: 'calc(100vw - 90px)',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  fontSize: 20,
                  fontWeight: 700,
                }}
              >
                지도
              </Typography>
            </Box>
          </Stack>

          {/* <Box sx={{ marginLeft: '10px', marginRight: '10px' }}>
            <TextField
              variant="standard"
              sx={{ width: '100%', height: '10px' }}
              placeholder="장소명으로 검색 (ex. 강남역)"
              autoFocus
            ></TextField>
          </Box> */}
          <Box>
            <DirectChatMap
              postPath={postPath}
              senderNo={senderNo}
              receiverNo={receiverNo}
              mutateDirectMessages={mutateDirectMessages}
            />
          </Box>
        </Stack>
      </Box>
    </Drawer>
  );
};

DirectLocationDrawer.propTypes = {
  setLocationDrawerOpen: PropTypes.func,
  toggleLocationDrawer: PropTypes.func,
  postPath: PropTypes.string,
  senderNo: PropTypes.number,
  receiverNo: PropTypes.number,
  mutateDirectMessages: PropTypes.func,
};

export default DirectLocationDrawer;
