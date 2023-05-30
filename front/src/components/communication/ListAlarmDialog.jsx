import { Divider, Typography } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Box } from '@mui/system';
import fetcher from '@utils/fetcher';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useNavigate } from 'react-router';
import useSWR from 'swr';

const ListAlarmDialog = ({ anchorEl, setAnchorEl, alarmData }) => {
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onClickAlramContent = useCallback(
    (e) => {
      if (e.currentTarget.dataset.value) {
        navigate(e.currentTarget.dataset.value);
      }
    },
    [navigate]
  );

  // console.log(alarmData);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <Box
        sx={{
          margin: '13px',
          minWidth: '300px',
          maxWidth: '300px',
          maxHeight: '500px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
          }}
        >
          <Typography color={'primary'} sx={{ fontWeight: '700' }}>
            알림 메시지
          </Typography>
        </Box>

        <Divider />
        {alarmData?.map((alarm, i) => (
          <div key={i} onClick={onClickAlramContent} data-value={alarm.path}>
            <Typography
              component="div"
              sx={{
                minWidth: '100%',
                maxWidth: '100%',
                marginTop: '15px',
                marginBottom: '15px',
                fontSize: 14,
                color: 'grey',
              }}
            >
              {alarm.content}
            </Typography>
            <Divider />
          </div>
        ))}
      </Box>
    </Menu>
  );
};

ListAlarmDialog.propTypes = {
  anchorEl: PropTypes.object,
  setAnchorEl: PropTypes.func,

  alarmData: PropTypes.array,
};
export default ListAlarmDialog;
