import CommonTop from '@layouts/common/CommonTop';
import { Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { Box } from '@mui/system';
import React, { useCallback } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import useSearchMeetingFormStore from '@hooks/meeting/useSearchMeetingFormStore';

const SearchMeeting = () => {
  const navigate = useNavigate();

  const { searchKeyword, setField } = useSearchMeetingFormStore();

  const onClickSearch = useCallback(() => {
    navigate(`/meeting/meetinglist`);
    console.log(searchKeyword);
  }, [navigate, searchKeyword]);

  return (
    <div>
      <CommonTop />
      <Box sx={{ marginTop: '64px' }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item></Grid>
          <Grid item xs>
            <TextField
              fullWidth
              placeholder="강남 or 축구"
              InputProps={{
                disableUnderline: true,
                sx: { fontSize: 'default' },
              }}
              variant="standard"
              value={searchKeyword}
              onChange={(e) => setField('searchKeyword', e.target.value)}
            />
          </Grid>
          <Grid item>
            <Tooltip title="Reload">
              <IconButton onClick={onClickSearch}>
                <SearchIcon color="inherit" sx={{ display: 'block' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default SearchMeeting;