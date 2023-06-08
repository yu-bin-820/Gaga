import { AppBar, Button, Divider, Grid, IconButton, List, ListItem, SwipeableDrawer, Toolbar} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/system';
import DeleteMeetingDialog from '@components/meeting/DeleteMeetingDialog';
import useUpdateMeetingFormStore from '@stores/meeting/useUpdateMeetingFormStore';

const GetMeetingTop = () => {
    const { meetingno } = useParams();

    const { reset } = useUpdateMeetingFormStore();

  const navigate = useNavigate();


  const [leaderMenuOpen, setLeaderMenuOpen] = useState(false);

  const onClickLeaderMenu = useCallback(() => {
    // navigate('/settings');
    setLeaderMenuOpen(true);
  }, []);

const toggleLeaderMenuOpen = useCallback(
    (state) => () => {
        setLeaderMenuOpen(state);
    },
    []
  );

const onClickUpdate = useCallback(()=>{
  reset();
  navigate(`/meeting/updatemeeting/${ meetingno }`);
},[navigate, reset, meetingno]);

const [deleteMeetingDialogOpen, setDeleteMeetingDialogOpen] =
useState(false);


const onClickDeleteSelect = useCallback(() => {
  setDeleteMeetingDialogOpen(true);
}, []);

  return (
    <>
    <AppBar position="fixed" color="secondary" elevation={0} sx={{ height: '50px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}> 
          <IconButton
            onClick={() => {
              navigate(-1);
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>

          <IconButton>
            <MoreHorizIcon onClick={onClickLeaderMenu}/>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>

    <SwipeableDrawer
        anchor="bottom"
        open={leaderMenuOpen}
        onClose={toggleLeaderMenuOpen(false)}
        onOpen={toggleLeaderMenuOpen(true)}
      >
        <Box sx={{ minWidth: '300px' }}>
          <List>
            <ListItem sx={{ display: 'flex', justifyContent: 'center'}}>
              <Button 
              onClick={onClickUpdate}
              sx={{minWidth: '100vw'}}>수정하기</Button>
            </ListItem>
            <Divider sx={{minWidth: '100vw'}} />
            <ListItem sx={{ display: 'flex', justifyContent: 'center'}}>
              <Button 
              onClick={onClickDeleteSelect}
              sx={{minWidth: '100vw'}}>삭제하기</Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>

      <DeleteMeetingDialog
        open={deleteMeetingDialogOpen}
        setOpen={setDeleteMeetingDialogOpen}
      />

    </>
    
  );
};

export default GetMeetingTop;