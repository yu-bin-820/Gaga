import { Drawer, IconButton, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

const DefaultFilterDrawer = ({
  defaultFilterDrawerOpen,
  setDefaultFilterDrawerOpen,
}) => {
  const toggleDefaultFilterDrawer = useCallback(
    (state) => {
      setDefaultFilterDrawerOpen(state);
    },
    [setDefaultFilterDrawerOpen]
  );

  const onClickCloseDefaultFilterDrawer = useCallback(() => {
    setDefaultFilterDrawerOpen(false);
  }, [setDefaultFilterDrawerOpen]);
  return (
    <Drawer
      anchor="right"
      open={defaultFilterDrawerOpen}
      onClose={toggleDefaultFilterDrawer(false)}
      onOpen={toggleDefaultFilterDrawer(true)}
    >
      <Box sx={{ minWidth: '100vw' }}>
        <Stack>
          <Stack
            direction={'row'}
            alignItems={'center'}
            sx={{ height: '55px' }}
          >
            <IconButton onClick={onClickCloseDefaultFilterDrawer}>
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
                필터 설정
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
    </Drawer>
  );
};

DefaultFilterDrawer.propTypes = {
  defaultFilterDrawerOpen: PropTypes.bool,
  setDefaultFilterDrawerOpen: PropTypes.func,
};

export default DefaultFilterDrawer;
