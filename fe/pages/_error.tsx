import { Component } from "react";
import Link from "next/link";
import { Button, Paper, Grid, Typography } from "@material-ui/core";
import HeadComponent from "../components/Layouts/HeadComponent";
import Kaomoji from "../components/Errors/Kaomoji";

interface IProps {
    statusCode?: string;
}

class Error extends Component<IProps> {
    static getInitialProps({ res, err }) {
        const statusCode = res ? res.statusCode : err ? err.statusCode : null;
        return { statusCode };
    }

    render() {
        return <>
            <HeadComponent>
                <Paper style={{ padding: "2rem", height: "100vh", maxHeight: "100vh", maxWidth: "100vw" }} square>
                    <Grid container direction="column" justify="center" alignContent="center" spacing={8} alignItems="center" style={{ height: "100%" }}>
                        <Grid item>
                            <Typography variant="h3" component="div">
                                <Kaomoji />
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="div">
                                {
                                    /*
                                    TODO: Lokalizace
                                    this.props.statusCode
                                        ? localisation.formatString(localisation.error.errorCodeOccured,
                                            this.props.statusCode.toString())
                                        : localisation.error.errorOnClient*/
                                    this.props.statusCode
                                        ? "Error" + this.props.statusCode.toString()
                                        : "Error on client"
                                }
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Link href="/">
                                <Button variant="contained" color="primary" >Go home</Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </HeadComponent>

        </>;
    }
}

export default Error;
