import { createMuiTheme } from '@material-ui/core/styles';



const rawTheme =  createMuiTheme ({
  palette: {
    primary: {
        main: "#40A351",
    },
    type: "light" // Indigo is probably a good match with pink
  },
});

const customTheme = {
...rawTheme,
overrides:
{
  MuiPaper:
  {
      root: 
      {
          backgroundColor: rawTheme.palette.primary.main,
      }
  },
},
}


export default customTheme;