import { FunctionComponent, ReactElement, Fragment } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Fab from "@material-ui/core/Fab";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Zoom from "@material-ui/core/Zoom";
import getTheme from "../Themes/MainTheme";

interface IProps {
    children: ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);

const ScrollTop: FunctionComponent<IProps> = ({ children }) => {
    const classes = useStyles(getTheme());

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const handleClick = () => {
        window.scroll({ top: 0, left: 0, behavior: "smooth" });
    };

    return (
        <Zoom in={trigger}>
            <div onClick={handleClick} role="presentation" className={classes.root}>
                {children}
            </div>
        </Zoom>
    );
};

const ScrollButton = () => {
    return (
        <Fragment>
            <ScrollTop>
                <Fab color="primary" size="large" aria-label="scroll back to top">
                    <KeyboardArrowUpIcon />
                </Fab>
            </ScrollTop>
        </Fragment>
    );
};

export default ScrollButton;
