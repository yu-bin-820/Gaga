import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import MeetingMember from './MeetingMember';
import PropTypes from 'prop-types';

const MemberListTapview = ({confirmedMemberList, pendingMemberList}) => {
    const [value, setValue] = React.useState('확정멤버');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return (
        <Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label='lab API tabs example'>
              <Tab label='확정멤버' value='확정멤버' sx={{ minWidth: '50%' }} />
              <Tab label='신청멤버' value='신청멤버' sx={{ minWidth: '50%' }} />
            </TabList>
          </Box>
          <Box
            sx={{
              overflowY: 'auto',
              maxHeight: 'calc(100vh - 100px)',
            }}
          >
            <TabPanel value='확정멤버' sx={{ padding: '0' }}>
            {confirmedMemberList?.map((confirmedMember, i) => (
                <MeetingMember key={i} member={confirmedMember} />
                ))}
            </TabPanel>
  
            <TabPanel value='신청멤버' sx={{ padding: '0' }}>
            {pendingMemberList?.map((pendingMember, i) => (
                <MeetingMember key={i} member={pendingMember} />
                ))}
            </TabPanel>
          </Box>
        </TabContext>
      </Box>
    );
  }
  MemberListTapview.propTypes = {
    confirmedMemberList: PropTypes.object,
    pendingMemberList: PropTypes.object,
    };

export default MemberListTapview;