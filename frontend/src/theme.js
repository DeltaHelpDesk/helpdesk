import { createMuiTheme } from '@material-ui/core/styles';
import { pink, indigo } from '@material-ui/core/colors';
export default createMuiTheme({
  palette: {
    primary: pink,
    secondary: indigo // Indigo is probably a good match with pink
  }
});