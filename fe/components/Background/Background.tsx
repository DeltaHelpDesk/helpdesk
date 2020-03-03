import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/styles";
import { useMediaQuery } from "@material-ui/core";
import getTheme from "../Themes/MainTheme";

const Background: FunctionComponent = (props) => {
    const useStyles = makeStyles(() => ({
        background: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
            zIndex: -5,
        },

        backgroundResponsive: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            zIndex: -5,
        },
    }),
    );

    const classes = useStyles(props);

    const theme = getTheme();
    const sm = useMediaQuery(theme.breakpoints.up("md"));

    return <>
        <img src="/static/helpdesk_bg_trans.png" className={sm ? classes.background : classes.backgroundResponsive} />
    </>;
};
export default Background;
