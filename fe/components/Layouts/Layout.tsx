import { FunctionComponent } from "react";
import Head from "next/head";
import MainAppBar from "../MainAppBar/MainAppBar";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import getTheme from "../Themes/MainTheme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
        },
        toolbar: theme.mixins.toolbar,
        content: {
            flexGrow: 1,
            // backgroundColor: theme.palette.background.default,
            padding: theme.spacing(3),
        },
        search: {
            "position": "relative",
            "borderRadius": theme.shape.borderRadius,
            "backgroundColor": fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25),
            },
            "marginRight": theme.spacing(2),
            "marginLeft": 0,
            "width": "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(3),
                width: "auto",
            },
        },
        searchIcon: {
            width: theme.spacing(7),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("md")]: {
                width: 200,
            },
        },
        sectionDesktop: {
            display: "none",
            [theme.breakpoints.up("md")]: {
                display: "flex",
            },
        },
        grow: {
            flexGrow: 1,
        },
    }),
);

interface IProps {
    title?: string;
}

const Layout: FunctionComponent<IProps> = ({ children, title = "Helpdesk" }) => {
    const classes = useStyles(getTheme());

    return <div>
        <Head>
            <title>{title} - Helpdesk</title>
        </Head>
        <header>
            <MainAppBar />
        </header>
        <main className={classes.content}>
            <div className={classes.toolbar} />
            {children}

        </main>
    </div>;
};

export default Layout;
