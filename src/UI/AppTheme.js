import { createMuiTheme } from "@material-ui/core/styles";
import { green, grey, red } from "@material-ui/core/colors";

const darkRed = "#ff3422"
const gold = "#835A00"
const lightBlue = "#051e3e"
const darkBlue = "#628078"
const appleGrey = "#999999"
const darkBlack = "#000000"
const white = "#ffffff"

export default createMuiTheme({
  palette: {
    common: {
      darkRed: `${darkRed}`,
      darkGold: `${gold}`,
      darkBlue: `${darkBlue}`,
      appleGrey: `${appleGrey}`,
      darkBlack : `${darkBlack}`,
      white : `${white}`
    },
    primary: {
      main: `${darkRed}`,
      light: "#ff6f4e",
      dark: "#c30000"
    },
    secondary: {
      main: `${gold}`,
      light: "#b78735",
      dark: "#533100",
    },
    warning:{
      main:"#ffc071",
      dark: "#c99043",
    },
    error:{
      xLight: red[50],
      main: red[500],
      dark: red[700]
    },
    success: {
      xLight: green[50],
      main: green[500],
      dark: green[700],
    },
    darkBlue:{
      main: `${darkBlue}`
    },
    appleGrey: `${appleGrey}`,
  },
  typography: {

    fontFamily: "'Muli', 'sans-serif'",
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    fontFamilySecondary: "'Philosopher', 'sans-serif'",
    genericFont:{
      fontFamily: 'Muli',
      color: "white",
    },

    tab:{
      fontFamily: 'Muli',
      textTransform: "none",
      fontWeight: 700,
      fontStyle: "italic",
      color: "white",
      fontSize: ".8rem",
      marginLeft: "5px"
    },

    footerlink:{
      fontFamily: 'Muli',
      textTransform: "none",
      fontWeight: 700,
      fontStyle: "italic",
      color: "white",
      fontSize: "1rem",
      minwidth: 10,
      marginLeft: "25px"
    },
    h1:{
      fontFamily: "'Philosopher', 'sans-serif'",
      fontSize: "4rem",
      fontWeight: 700,
    },
    h2:{
      fontFamily: "'Philosopher', 'sans-serif'",
      fontSize: "2rem",
      fontWeight: 700,
    },
    h5:{
      fontFamily: 'Muli',
      fontSize: "1rem",
      fontWeight: 700,
      color: `${red}`,
      lineHeight: "1.5rem"
    },
    h6:{
      fontFamily: 'Muli',
      fontSize: ".75rem",
      fontWeight: 700,
      color: `${red}`,
      lineHeight: 1
    },
    subtitle1:{
      fontSize: ".8rem",
      fontFamily: "'Philosopher', 'sans-serif'",
      lineHeight: "1rem",
      fontWeight: 300,
      color: `${lightBlue}`,
    }

  },
});
