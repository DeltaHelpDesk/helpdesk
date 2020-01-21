import { FunctionComponent } from "react";
import HeadComponent from "../components/Layouts/HeadComponent";
import { Typography, Grid, Divider, Paper } from "@material-ui/core";
import Layout from "../components/Layouts/Layout";
import LanguageSelect from "../components/LanguageSelect/LanguageSelect";
import DarkModeSelect from "../components/DarkModeSelect/DarkModeSelect";
import { withAuthSync } from "../src/auth/authWrapper";
import { useTranslation } from "react-i18next";
import locKeys from "../src/Locales/LocalizationKeys";

const SettingsPage: FunctionComponent = () => {
    const { t } = useTranslation();

    return <>
        <HeadComponent>
            <Layout title="Settings">
                <Paper style={{ padding: "2rem" }}>
                    <Grid container direction="column" spacing={8}>
                        <Grid item>
                            <Typography variant="h3">
                                {t(locKeys.common.settings)}
                            </Typography>
                        </Grid>
                        <Divider />
                        <Grid item>
                            <LanguageSelect />
                        </Grid>
                        <Grid item>
                            <DarkModeSelect />
                        </Grid>
                        <Grid item>
                            <ChangePassword />
                        </Grid>
                    </Grid>
                </Paper>
            </Layout>
        </HeadComponent>
    </>;
};

export default withAuthSync(SettingsPage);
