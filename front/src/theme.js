import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: '#036635',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: red.A400,
    },
    info: {
      main: '#d3d3d3',
    },
  },
});

export default theme;
