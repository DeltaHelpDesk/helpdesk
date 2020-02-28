import { useState, useContext, useEffect, FunctionComponent, FormEvent } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Icon from "@mdi/react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { mdiLogin, mdiGoogle, mdiFacebook } from "@mdi/js";
import Router from "next/router";
import MicrosoftButtonLogin from "./MicrosoftButtonLogin";
import { ReactAuthContext } from "../../src/graphql/auth";
import Loading from "../Loading/Loading";
import customRoutes from "../../src/Routes";
import { Typography, Tooltip, createStyles } from "@material-ui/core";
import SocialButton from "./SocialButton";
import Background from "../Background/Background";
import { Theme, makeStyles } from "@material-ui/core";
import { AuthType } from "../../src/graphql/graphql-global-types";
import getTheme from "../Themes/MainTheme";
import TipBar from "./TipBar";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";
import { useSnackbar } from "notistack";

interface ILoginProps {
    showPassword: boolean;
    user: IUser;
}

interface IUser {
    name: string;
    password: string;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            borderRadius: "0px",
        },
        socialButton: {
            margin: "0px 1%",
            width: "97%",
        },
        fbButton: {
            "backgroundColor": "#4267b2",
            "&:hover": {
                backgroundColor: "#314d85",
            },
        },
        gglButton: {
            "backgroundColor": "#dd4b39",
            "&:hover": {
                backgroundColor: "#b12e1e",
            },
        },
        msButton: {
            "backgroundColor": "#3ebede",
            "&:hover": {
                backgroundColor: "#007f9f",
            },
        },
        title: {
            fontWeight: "bold",
            textTransform: "uppercase",
        },
        loginCard: {
            padding: "2rem",
            position: "fixed",
            top: "55%",
            left: "50%",
            transform: "translate(-50%,-50%)",
        },
        mainContentWidth: {
            width: "25rem",
        },
        socialButtonsContainer: {
            width: "100%", paddingTop: "0px",
        },
        heading: {
            fontWeight: "bold",
            textTransform: "uppercase",
        },
    }));

const LoginPage: FunctionComponent<ILoginProps> = ({ showPassword, user: loginVars }) => {

    const { t } = useTranslation();

    const { loginByEmail, isLoggedIn, loginExternal, doLoginByMicrosoft } = useContext(ReactAuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            Router.push("/");
        }
    }, []);

    const [filled, setUser] = useState<IUser>(loginVars);
    const [showPwd, setShowPwd] = useState<boolean>(showPassword);
    const [loading, setLoading] = useState<boolean>(false);

    const classes = useStyles(getTheme());

    const { enqueueSnackbar } = useSnackbar();

    const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        setUser({
            ...filled,
            [property]: value,
        });
    };

    const handleClickShowPassword = () => {
        setShowPwd(!showPwd);
    };

    const handleFormSubmit = async () => {
        if (!filled || !filled.name || !filled.password) {
            // TODO: Localization
            enqueueSnackbar("Musíte zadat přihlašovací údaje", { variant: "error" });
            return;
        }
        setLoading(true);

        try {
            await loginByEmail(filled.name, filled.password);
            if (window) {
                window.location.href = customRoutes.administration;
            } else {
                Router.push(customRoutes.administration);
            }
            return;
        } catch (e) {
            if (e && e.graphQLErrors && e.graphQLErrors[0]) {
                enqueueSnackbar(e.graphQLErrors[0].message, { variant: "error" });
                console.log(e.graphQLErrors[0].message);
            } else {
                enqueueSnackbar(e, { variant: "error" });
                console.error("handle login error", e);
            }
        }
        setLoading(false);
    };

    const googleLoginSuccess = async (user: any) => {
        const email: string = user._profile.email;
        const name: string = user._profile.name;
        const provider: AuthType = AuthType.GOOGLE;
        const token: string = user._profile.id;
        const theme: string = user._profile.theme;

        await externalLogin(email, name, provider, token, theme);
    };

    const facebookLoginSuccess = async (user: any) => {
        const email: string = user._profile.email;
        const name: string = user._profile.name;
        const provider: AuthType = AuthType.FACEBOOK;
        const token: string = user._profile.id;
        const theme: string = user._profile.theme;

        await externalLogin(email, name, provider, token, theme);
    };

    const onExternalLoginFail = async (error: any) => {
        enqueueSnackbar(error, { variant: "error" });

        console.log(error);
    };

    const externalLogin = async (email: string, name: string, provider: AuthType, token: string, theme: string) => {
        if (!email || !name || !provider || !token) {
            // TODO: Localization
            enqueueSnackbar("Prázdné vstupní údaje od externího poskytovatele", { variant: "error" });
            console.log("Prázdné vstupní údaje");
            return;
        }
        setLoading(true);

        try {
            await loginExternal(email, name, provider, token);
            if (window) {
                window.location.href = customRoutes.administration;
            } else {
                Router.push(customRoutes.administration);
            }
            return;
        } catch (e) {
            if (e && e.graphQLErrors && e.graphQLErrors[0]) {
                enqueueSnackbar(e.graphQLErrors[0].message, { variant: "error" });
                console.log(e.graphQLErrors[0].message);
            } else {
                enqueueSnackbar(e, { variant: "error" });
                console.error("handle login error", e);
            }
        }
        setLoading(false);
    };

    const handleOfficeLogin = async () => {
        try {
            await doLoginByMicrosoft();
            if (window) {
                window.location.href = customRoutes.administration;
            } else {
                Router.push(customRoutes.administration);
            }
        } catch (e) {
            if (e && e.graphQLErrors && e.graphQLErrors[0]) {
                enqueueSnackbar(e.graphQLErrors[0].message, { variant: "error" });
                console.log(e.graphQLErrors[0].message);
            } else {
                enqueueSnackbar(e, { variant: "error" });
                console.error("handle login error", e);
            }
        }
    };

    const handleKeywordKeyPress = (e: any) => {
        if (e.key === "Enter") {
            handleFormSubmit();
        }
    };

    if (loading) {
        return <>
            <Loading />
        </>;
    }

    return <>
        <Grid container direction="row" justify="center">
            <Grid item>
                <Paper className={classes.loginCard} >
                    <Grid container={true} direction="column" justify="center" alignItems="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h4" component="div" className={classes.heading}>
                                {t(locKeys.login.title)}
                            </Typography>
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="name"
                                variant="filled"
                                name="name"
                                label={t(locKeys.login.email)}
                                type="text"
                                autoComplete="email"
                                value={filled && filled.name || ""}
                                className={classes.mainContentWidth}
                                onChange={(e) => handleInputChange(e as FormEvent<HTMLInputElement>)} />
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="filled-adornment-password"
                                variant="filled"
                                name="password"
                                type={showPwd ? "text" : "password"}
                                autoComplete="current-password"
                                label={t(locKeys.login.password)}
                                value={filled && filled.password || ""}
                                onChange={(e) => handleInputChange(e as FormEvent<HTMLInputElement>)}
                                onKeyPress={handleKeywordKeyPress}
                                className={classes.mainContentWidth}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment variant="filled" position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={handleClickShowPassword}
                                            >
                                                {showPwd ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Grid>
                        <Grid item={true}>
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                className={`${classes.button} ${classes.mainContentWidth}`}
                                onClick={handleFormSubmit}>
                                <Icon path={mdiLogin}
                                    size={1}
                                    color="white"
                                />
                                {t(locKeys.login.login)}
                            </Button>
                        </Grid>
                        <Grid item sm={12} className={classes.socialButtonsContainer}>
                            <Grid container={true} direction={"row"} alignItems={"stretch"}  >
                                <Grid item sm>
                                    <SocialButton appId="798682318207-k4cmrgbnabg5vf8o12cdj867nqe7tufo.apps.googleusercontent.com"
                                        provider="google"
                                        onLoginSuccess={googleLoginSuccess}
                                        onLoginFailure={onExternalLoginFail}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            // tslint:disable-next-line: max-line-length
                                            className={`${classes.gglButton} ${classes.socialButton} ${classes.button}`}>
                                            <Icon path={mdiGoogle}
                                                size={1}
                                                color="white"
                                            />
                                        </Button>
                                    </SocialButton>
                                </Grid>
                                <Grid item sm>
                                    <SocialButton appId="515939249183955"
                                        provider="facebook"
                                        onLoginSuccess={facebookLoginSuccess}
                                        onLoginFailure={onExternalLoginFail}
                                    >
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            className={`${classes.fbButton} ${classes.socialButton} ${classes.button}`}>
                                            <Icon path={mdiFacebook}
                                                size={1}
                                                color="white"
                                            />
                                        </Button>
                                    </SocialButton>
                                </Grid>
                                <Grid item sm>
                                    <MicrosoftButtonLogin className={`${classes.msButton} ${classes.socialButton} ${classes.button}`} onClick={handleOfficeLogin} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <TipBar />
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <Background />
    </>;
};

export default LoginPage;
