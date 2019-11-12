import { FunctionComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import { Theme, makeStyles } from "@material-ui/core";
import Link from "next/link";
import customRoutes from "../../src/Routes";
import Background from "../Background/Background";

// tslint:disable-next-line:no-empty-interface
interface IAdministrationItemsProps {
}

const AdministrationItems: FunctionComponent<IAdministrationItemsProps> = (props) => {
    const useStyles = makeStyles((currentTheme) => ({
        root: {

        },
        subheader: {
            textAlign: "center",
        },

        buttonHomepage: {
            "margin": "10px 25px",
            "color": currentTheme.palette.secondary.contrastText,
            "backgroundColor": currentTheme.palette.secondary.main,
            "padding": "10px 35px",
            "borderRadius": "0px",
            "fontWeight": "bold",
            "textTransform": "uppercase",
            "&:hover": {
                backgroundColor: currentTheme.palette.secondary.light,
            },
        },

        itemsCenter: {
            textAlign: "center",
        },
        info: {
            color: currentTheme.palette.text.primary,
            [currentTheme.breakpoints.down("sm")]: {
                fontSize: "18px",
            },
            textAlign: "center",
            fontSize: "20px",
        },
        center: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
        },
        background: {
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: "100%",
            zIndex: -5,
            [currentTheme.breakpoints.down("sm")]: {
                height: "100%",
                width: "auto",
            },
            backgroundColor: currentTheme.palette.background.default,
        },
        title: {
            fontWeight: "bold",
            color: currentTheme.palette.text.primary + "!important",
        },
    }),
    );

    const classes = useStyles(props);

    return <>
        <Grid item={true}>
            <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                <p className="h4-responsive">Nastavení</p>
            </Card>
        </Grid>
        <Grid item={true}>
            <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                <p className="h4-responsive">Seznam požadavků</p>
            </Card>
        </Grid>
        <Grid item={true}>
            <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                <p className="h4-responsive">Hardware</p>
            </Card>
        </Grid>
        <Grid item={true}>
            <Link href={customRoutes.userList}>
                <Card className={"d-flex justify-content-center align-items-center admin-card"}>
                    <p className="h4-responsive">Seznam uživatelů</p>
                </Card>
            </Link>
        </Grid>
        <Background />
    </>;
};

export default AdministrationItems;
