import { createTheme } from '@mui/material/styles';
import { deepOrange, deepPurple } from '@mui/material/colors';

const darkTheme = createTheme({
  components: {
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
        fullWidth: true,
      },
    },
  },
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: deepOrange[500],
    },
    mode: 'dark',
  },
});

export default darkTheme;
