import React, { useRef, useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import useSWRInfinite from 'swr/infinite';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ImageIcon from '@mui/icons-material/Image';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import fetcher from '@utils/fetcher';

import useSWR from 'swr';

export default function LeftDrawer() {
  const { chattype, channel } = useParams();
  const { data: myData } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );
  const [myChannel, setMyChannel] = useState(myData?.userId);
  useEffect(() => {
    if (myData?.role === 'admin') {
      setMyChannel(channel);
    }
  }, [myData, channel]);
  const {
    mutate: chatMutate,
    // setSize,
  } = useSWRInfinite(
    () =>
      `${
        import.meta.env.VITE_SPRING_SVR_URL
      }:8909/api/chattypes/${chattype}/channels/${myChannel}/chats`,
    fetcher
  );
  const [showDrawer, setShowDrawer] = React.useState({ left: false });
  const selectFile = useRef(null);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setShowDrawer({ ...showDrawer, [anchor]: open });
  };

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const data = new FormData();

      if (event.dataTransfer?.items) {
        // Use DataTransferItemList interface to access the file(s)
        for (let i = 0; i < event.dataTransfer.items.length; i++) {
          // If dropped items aren't files, reject them
          if (event.dataTransfer.items[i].kind === 'file') {
            const file = event.dataTransfer.items[i].getAsFile();
            console.log('... file[' + i + '].name = ' + file.name);
            data.append('image', file);
          }
        }
      } else {
        // Use DataTransfer interface to access the file(s)
        for (let i = 0; i < event.dataTransfer?.files.length; i++) {
          console.log(
            '... file[' + i + '].name = ' + event.dataTransfer.files[i].name
          );
          data.append('image', event.dataTransfer.files[i]);
        }
      }

      axios
        .post(
          `${
            import.meta.env.VITE_SPRING_SVR_URL
          }:8909/api/chattypes/${chattype}/channels/${myChannel}/images`,
          data,
          { withCredentials: true }
        )
        .then(() => {
          chatMutate();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [myData, chatMutate, channel, chattype]
  );

  const list = (anchor) => (
    <form method="post" onSubmit={handleSubmit}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, true)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          <ListItem disablePadding>
            <input
              type="file"
              style={{ display: 'none' }}
              ref={selectFile} //input에 접근 하기위해 useRef사용
            />

            <ListItemButton onClick={handleSubmit}>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary={'전송'} />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary={'Image'} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LocationOnIcon />
              </ListItemIcon>
              <ListItemText primary={'Location'} />
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary={'전송'} />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </form>
  );

  return (
    <div>
      <React.Fragment>
        <Button
          variant="contained"
          sx={{ backgroundColor: 'gray' }}
          onClick={toggleDrawer('left', true)}
        >
          <AddIcon sx={{ fontSize: '42px' }} />
        </Button>

        <Drawer
          anchor={'left'}
          open={showDrawer['left']}
          onClose={toggleDrawer('left', false)}
        >
          {list('left')}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
