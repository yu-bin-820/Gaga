import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import 'react-chat-elements/dist/main.css';
import { ChatItem } from 'react-chat-elements';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import { useNavigate } from 'react-router';
import useCommunityStore from '@stores/communication/useCommunityStore';

export default function ChatList() {
  const navigate = useNavigate();

  const { chatRoomEntryNo, chatType, setField } = useCommunityStore();

  const { data: myData, mutate: mutateMe } = useSWR(
    `http://${import.meta.env.VITE_SPRING_HOST}/rest/user/login`,
    fetcher
  );

  const { data: groupsData, mutate: mutateGroups } = useSWR(
    `http://${import.meta.env.VITE_EXPRESS_HOST}/rest/chat/group/list/userno/${
      myData?.userNo
    }`,
    fetcher
  );

  const { data: directListData, mutate: mutateDirectMessages } = useSWR(
    `http://${
      import.meta.env.VITE_EXPRESS_HOST
    }/rest/chat/direct/list/senderno/${myData?.userNo}`,
    fetcher
  );

  console.log(
    `http://${
      import.meta.env.VITE_EXPRESS_HOST
    }/rest/chat/direct/list/senderno/${myData?.userNo}`,
    directListData
  );

  const [value, setValue] = React.useState('group');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onClickGroupChatOne = React.useCallback(
    (e) => {
      const selectedData = JSON.parse(e.currentTarget.dataset.value);
      console.log(selectedData.chatRoomEntryNo);

      setField('chatRoomEntryNo', selectedData.chatRoomEntryNo);
      setField('chatType', selectedData.chatType);

      if (selectedData.chatType === 'club') {
        navigate(`/chat/club/message/list`);
      } else if (selectedData.chatType === 'meeting') {
        navigate(`/chat/meeting/message/list`);
      } else if (selectedData.chatType === 'direct') {
        navigate(`/chat/direct/message/list`);
      }
    },
    [setField, navigate]
  );
  return (
    <Box
      sx={{
        position: 'fixed',
        marginTop: '50px',
        width: '100%',
        typography: 'body1',
      }}
    >
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Group" value="group" sx={{ minWidth: '50%' }} />
            <Tab label="DM" value="direct" sx={{ minWidth: '50%' }} />
          </TabList>
        </Box>
        <Box
          sx={{
            padding: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            overflowY: 'auto',
            maxHeight: 'calc(100vh - 200px)',
            marginBottom: '64px',
          }}
        >
          <TabPanel value="group" sx={{ margin: 0, paddingLeft: 0.5 }}>
            {groupsData?.groups.map((group, i) => (
              <Box
                key={i}
                sx={{
                  marginBottom: '10px',
                  padding: '5px',
                  minWidth: '100%',
                }}
                data-value={JSON.stringify(
                  group.meeting_no
                    ? { chatRoomEntryNo: group.meeting_no, chatType: 'meeting' }
                    : { chatRoomEntryNo: group.club_no, chatType: 'club' }
                )}
                onClick={onClickGroupChatOne}
              >
                <ChatItem
                  avatar={'https://facebook.github.io/react/img/logo.svg'}
                  alt={'Reactjs'}
                  title={
                    group.meeting_name ? group.meeting_name : group.club_name
                  }
                  subtitle={group.last_message}
                  date={new Date(group.last_message_time)}
                  unread={0}
                />
              </Box>
            ))}
          </TabPanel>

          <TabPanel value="direct">
            {directListData?.map((receiver, i) => (
              <Box
                key={i}
                sx={{
                  marginBottom: '10px',
                  padding: '5px',
                  minWidth: '100%',
                }}
              >
                <ChatItem
                  avatar={'https://facebook.github.io/react/img/logo.svg'}
                  alt={'Reactjs'}
                  title={receiver.Receiver.nick_name}
                  subtitle={receiver.content}
                  date={new Date(receiver.created_at)}
                  unread={0}
                />
              </Box>
            ))}
          </TabPanel>
        </Box>
      </TabContext>
    </Box>
  );
}
