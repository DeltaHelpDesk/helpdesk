import { createMuiTheme, Theme } from "@material-ui/core";
import CookieHelper from "../../utils/cookieHelper";

const cookieHelper = new CookieHelper();

const getTheme = (): Theme => {

    const theme = cookieHelper.getThemeName();
    // console.log(dark);

    const mainTheme = createMuiTheme({
        palette: {
            type: theme === "dark" ? "dark" : "light",
            primary: {
                main: "#40a351",
            },
        },
    });

    return mainTheme;

};

export default getTheme;
