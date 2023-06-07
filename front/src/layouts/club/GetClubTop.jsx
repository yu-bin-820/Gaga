import {
  AppBar,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  SwipeableDrawer,
  Toolbar,
  Typography,
} from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import React, { useCallback, useState } from 'react';
import Container from '@mui/material/Container';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

import { useNavigate, useParams } from 'react-router';
import { Box } from '@mui/system';
import DeleteClubDialog from '@components/club/DeleteClubDialog';

const GetClubTop = () => {
  const { clubNo } = useParams();

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

  const onClickUpdate = useCallback((MouseEvent) => {
    navigate(`/club/updateclub/${clubNo}`);
  }, []);

  const [deleteClubDialogOpen, setDeleteClubDialogOpen] = useState(false);

  const onClickDeleteSelect = useCallback(() => {
    setDeleteClubDialogOpen(true);
  }, []);

  return (
    <>
      <AppBar
        position='fixed'
        color='secondary'
        elevation={0}
        sx={{ height: '50px' }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            <IconButton
              onClick={() => {
                navigate(-1);
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton>
              <MoreHorizIcon onClick={onClickLeaderMenu} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      <SwipeableDrawer
        anchor='bottom'
        open={leaderMenuOpen}
        onClose={toggleLeaderMenuOpen(false)}
        onOpen={toggleLeaderMenuOpen(true)}
      >
        <Box sx={{ minWidth: '300px' }}>
          <List>
            <ListItem>
              <Button variant='contained' onClick={onClickUpdate}>
                수정하기
              </Button>
            </ListItem>
            <Divider />
            <ListItem>
              <Button variant='contained' onClick={onClickDeleteSelect}>
                삭제하기
              </Button>
            </ListItem>
          </List>
        </Box>
      </SwipeableDrawer>

      <DeleteClubDialog
        open={deleteClubDialogOpen}
        setOpen={setDeleteClubDialogOpen}
      />
    </>
  );
};

export default GetClubTop;
