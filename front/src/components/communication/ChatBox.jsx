import { FormEvent, useCallback, FC, ChangeEvent, KeyboardEvent } from 'react';
import { Button, Stack } from '@mui/material';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import LeftDrawer from './LeftDrawer';
import PropTypes from 'prop-types';

const ChatBox = ({
  chat,
  onSubmitForm,
  setChat,
  onChangeChat,
  onClickChat,
  onKeydownChat,
}) => {
  // const textareaRef: React.RefObject<HTMLDivElement> =
  //   useRef<HTMLDivElement>(null);
  // useEffect(() => {
  //   if (textareaRef.current) {
  //     autosize(textareaRef.current);
  //   }
  // }, []);

  return (
    <Stack spacing={0} direction="row">
      {/* <LeftDrawer /> */}
      <TextField
        id="outlined-multiline-flexible"
        multiline
        autoFocus
        maxRows={4}
        fullWidth
        variant="filled"
        value={chat}
        onChange={onChangeChat}
        onKeyDown={onKeydownChat}

        //ref={textareaRef}
      />

      <Button variant="contained" onClick={onClickChat}>
        <SendIcon fontSize="large" />
      </Button>
    </Stack>
  );
};

ChatBox.propTypes = {
  chat: PropTypes.string,
  onSubmitForm: PropTypes.func,
  setChat: PropTypes.func,
  onChangeChat: PropTypes.func,
  onClickChat: PropTypes.func,
  onKeydownChat: PropTypes.func,
};

export default ChatBox;
