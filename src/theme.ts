import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    fontSize: 16,
  },
  palette: {
    primary: {
      main: "#000000",
      light: "#4B4B4B",
      dark: "#707070",
    },
    secondary: {
      main: "#a2957f",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1640,
    },
  },
});

export default theme;
