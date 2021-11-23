import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  typography: {
    fontSize: 16,
  },
  palette: {
    type: "dark",
    primary: {
      main: "#000000",
      light: "#4B4B4B",
      dark: "#707070",
    },
    secondary: {
      main: "#ff346c",
      light: "#ff9cfe",
      dark: "#9c48c3",
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
