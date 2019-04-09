import { createMuiTheme } from '@material-ui/core/styles';



const rawTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#40A351",
    },
    type: "light" // Indigo is probably a good match with pink
  },

});

const customTheme = createMuiTheme({
  ...rawTheme,
  overrides: {
    MuiPaper:
    {
      root:
      {
        backgroundColor: rawTheme.palette.primary.main,
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