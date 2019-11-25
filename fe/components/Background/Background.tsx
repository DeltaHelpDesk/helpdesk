import { FunctionComponent } from "react";
import { makeStyles } from "@material-ui/styles";

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
    }),
    );

    const classes = useStyles(props);

    return <>
        <img src="/static/helpdesk_bg_trans.png" className={classes.background} />
    </>;
};
export default Background;
