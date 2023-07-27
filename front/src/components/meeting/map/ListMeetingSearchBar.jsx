import { Grid, IconButton, TextField, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from "@mui/system";
import PropTypes from 'prop-types';

const ListMeetingSearchBar = ({ keyword, handleKeywordChange, handleSubmit, top }) => {
  return (
    <Stack 
      container spacing={2} 
      alignItems="center"
      direction="row"
      justifyContent="center"
      sx= {{           
        position: 'fixed',
        top: top,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        fontSize: 'default',
        backgroundColor: 'rgba(255,255,255,70%)',
        minWidth: '80vw'
      }}
    >
      <Grid item>
        <Tooltip title="Reload">
          <IconButton  onClick={handleSubmit}>
            <SearchIcon color="inherit" sx={{ display: 'block' }} />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid item xs>
        <TextField
          fullWidth
          name="keyword"
          value={keyword}
          InputProps={{
            disableUnderline: true,
            sx: { fontSize: 'default' },
          }}
          required
          onChange={handleKeywordChange}
          variant="standard"
        />
      </Grid>
    </Stack>
  );
};

ListMeetingSearchBar.propTypes = {
  keyword: PropTypes.string,
  handleKeywordChange: PropTypes.func,
  handleSubmit: PropTypes.func,
  top: PropTypes.string,
};

export default ListMeetingSearchBar;