import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import useSWR from 'swr';
import fetcher from '@utils/fetcher';
import axios from 'axios';

const TitleListDialog = ({ open, setOpen, myData, mutateMe }) => {
  const [mainTitle, setMainTitle] = useState(myData?.mainTitleNo);
  const { data: titleListData, mutate: mutateTitleList } = useSWR(
    `${import.meta.env.VITE_SPRING_HOST}/rest/community/title/list/userno/${
      myData?.userNo
    }`,
    fetcher
  );

  const handleChange = (event) => {
    setMainTitle(Number(event.target.value) || '');
  };
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const submitUpdateMainTitle = useCallback(() => {
    myData.mainTitleNo = mainTitle;
    axios
      .patch(
        `${import.meta.env.VITE_SPRING_HOST}/rest/community/profile`,
        myData,
        { withCredentials: true }
      )
      .then(() => {
        mutateMe();
        setOpen(false);
      })
      .catch((error) => {
        console.dir(error);
      });
  }, [myData, mutateMe, mainTitle, setOpen]);
  console.log(titleListData);
  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>대표 타이틀 선택</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel htmlFor="demo-dialog-native">Title</InputLabel>
              <Select
                native
                value={mainTitle}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                {titleListData?.length === 0 && <option>타이틀 없음</option>}
                {titleListData?.map((title, i) => (
                  <option
                    key={i}
                    value={title.titleNo}
                    // selected={myData.mainTitleNo == title.titleNo}
                  >
                    {title.titleName}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={submitUpdateMainTitle}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

TitleListDialog.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  myData: PropTypes.object,
  mutateMe: PropTypes.func,
};

export default TitleListDialog;
