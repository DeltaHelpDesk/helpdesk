import { FunctionComponent } from "react";
import localisation from "../src/Locales/Localisations";
import HeadComponent from "../components/Layouts/HeadComponent";
import { Typography, Grid, Divider, Paper } from "@material-ui/core";
import Layout from "../components/Layouts/Layout";
import LanguageSelect from "../components/LanguageSelect/LanguageSelect";
import DarkModeSelect from "../components/DarkModeSelect/DarkModeSelect";

const SettingsPage: FunctionComponent = () => {

    return <>
        <HeadComponent>
            <Layout title="Settings">
                <Paper style={{ padding: "2rem" }}>
                    <Grid container direction="column" spacing={8}>
                        <Grid item>
                            <Typography variant="h3">
                                {localisation.common.settings}
                            </Typography>
                        </Grid>
                        <Divider />
                        <Grid item>
                            <LanguageSelect />
                        </Grid>
                        <Grid item>
                            <DarkModeSelect />
                        </Grid>
                    </Grid>
                </Paper>
            </Layout>
        </HeadComponent>
    </>;
};

export default SettingsPage;
