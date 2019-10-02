import { createMuiTheme } from '@material-ui/core/styles';



const rawTheme = createMuiTheme({
  palette: {
    primary: {
        main: "#4c4c4c",
        light: "#ffffff",
        dark: "#000000",
    },
    secondary: {
        main: "#40a351",
    },
    type: "dark"
  },

});

const customTheme = createMuiTheme({
  ...rawTheme,
  overrides: {
    MuiPaper:
    {
      root:
      {
        // backgroundColor: rawTheme.palette.primary.main,
        borderRadius: "0px !important",
      }
    },
  },
  typography: {
    useNextVariants: true,
    h1: {
      [rawTheme.breakpoints.down('sm')]: {
        fontSize: "45px"
      },

      textAlign: "center",
      textTransform: "uppercase",
      fontSize: "80px",
      padding: "5px",

    },
    h2: {
      [rawTheme.breakpoints.down('sm')]: {
        fontSize: "25px"
      },
      textAlign: "center",
      fontSize: "50px",
      padding: "20px",
    }
  },
})


export default customTheme;