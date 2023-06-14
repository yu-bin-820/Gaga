import React, { useCallback, useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { Search } from '@mui/icons-material';
import { Stack } from '@mui/system';
import { Badge, Divider, Drawer, SwipeableDrawer } from '@mui/material';
import ListAlarmDialog from '@components/communication/ListAlarmDialog';
import useCommonStore from '@stores/common/useCommonStore';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import DefaultFilterStepper from '@components/common/DefaultFilterStepper';

const MainTop = () => {
  const [anchorAlarmEl, setAnchorAlarmEl] = useState();
  const [alarmData, setAlarmData] = useState([]);
  const { groupType } = useCommonStore();
  const { data: myData, mutate: mutateMe } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const { data: unreadsData, mutate: mutateUnreads } = useSWR(
    `${
      import.meta.env.VITE_EXPRESS_HOST
    }/rest/chat/group/message/unreads/userno/${myData?.userNo}`,
    fetcher
  );
  const [defaultFilterDrawerOpen, setDefaultFilterDrawerOpen] = useState(false);

  const isAuthenticated = myData?.userNo && myData?.profileImg;
  // console.log(unreadsData);
  const toggleDefaultFilterDrawer = useCallback(
    (state) => () => {
      setDefaultFilterDrawerOpen(state);
    },
    []
  );

  const onClickAlram = useCallback(
    (e) => {
      axios
        .get(
          `${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/alarm/receiverno/${
            myData?.userNo
          }`,
          { withCredentials: true }
        )
        .then((response) => {
          setAlarmData(response.data);
          mutateUnreads();
        })
        .catch((error) => {
          console.log(error);
        });

      setAnchorAlarmEl(e.currentTarget);
    },
    [myData, mutateUnreads]
  );

  const navigate = useNavigate();

  const onClickSearch = React.useCallback(
    (MouseEvent) => {
      if (groupType == 'meeting') {
        navigate(`/meeting/searchmeeting`);
      } else {
        navigate(`/club/searchclub`);
      }
    },
    [navigate, groupType]
  );

  const onClickCloseDefaultFilterDrawer = useCallback(() => {
    setDefaultFilterDrawerOpen(false);
  }, [setDefaultFilterDrawerOpen]);

  const onClickDefaultFilter = useCallback(() => {
    setDefaultFilterDrawerOpen(true);
  }, [setDefaultFilterDrawerOpen]);

  return (
    <>
      <AppBar
        position="fixed"
        color="secondary"
        elevation={0}
        sx={{ height: '50px' }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
              <div
                onClick={() => {
                  navigate('/');
                }}
              >
                <Typography
                  variant="h5"
                  noWrap
                  sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'flex' },
                    flexGrow: 1,
                    fontWeight: 700,
                    color: '#036635',
                    textDecoration: 'none',
                  }}
                >
                  GAGA
                </Typography>
              </div>
            </Box>
            {isAuthenticated && (
              <Stack direction={'row'}>
                <IconButton onClick={onClickAlram}>
                  <Badge
                    badgeContent={unreadsData?.countAlramUnreads}
                    color="error"
                    variant="dot"
                  >
                    <NotificationsNoneIcon />
                  </Badge>
                </IconButton>

                <IconButton onClick={onClickDefaultFilter}>
                  <TuneIcon />
                </IconButton>

                <IconButton onClick={onClickSearch}>
                  <Search />
                </IconButton>
              </Stack>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      {/*-----------------toggleDefaultFilterDrawer----------------- 모달 -------------------------------------*/}
      <ListAlarmDialog
        anchorEl={anchorAlarmEl}
        setAnchorEl={setAnchorAlarmEl}
        alarmData={alarmData}
      />

      <Drawer
        anchor="right"
        open={defaultFilterDrawerOpen}
        onClose={toggleDefaultFilterDrawer(false)}
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
            <Divider />
            <DefaultFilterStepper
              setDefaultFilterDrawerOpen={setDefaultFilterDrawerOpen}
            />
          </Stack>
        </Box>
      </Drawer>
    </>
  );
};

export default MainTop;
