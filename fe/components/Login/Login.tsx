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
import localisation from "../../src/Locales/Localisations";
import { Typography, Tooltip } from "@material-ui/core";
import SocialButton from "./SocialButton";
import { AuthType } from "../../src/graphql/types";
import Background from "../Background/Background";
import { Theme, makeStyles } from "@material-ui/core";

interface ILoginProps {
    showPassword: boolean;
    user: IUser;
}

interface IUser {
    name: string;
    password: string;
}

// type FilledInputAdornmentsProps<T> = WithStyles<string> & Record<"mode", boolean>

const LoginPage: FunctionComponent<ILoginProps> = ({ showPassword, user: loginVars }) => {
    const useStyles = makeStyles(() => ({
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
        }
        ,
    }),
    );

    const { loginByEmail, isLoggedIn, loginExternal, doLoginByMicrosoft } = useContext(ReactAuthContext);

    const [filled, setUser] = useState<IUser>(loginVars);
    const [showPwd, setShowPwd] = useState<boolean>(showPassword);
    const [loading, setLoading] = useState<boolean>(false);

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
            // TODO: Info - Neplatné jméno nebo heslo
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
                // TODO: material ui dialog
                console.log(e.graphQLErrors[0].message);
            } else {
                console.error("handle login error", e);
            }
        }
        setLoading(false);
    };

    const googleLoginSuccess = async (user: any) => {
        const email: string = user._profile.email;
        const name: string = user._profile.name;
        const provider: AuthType = AuthType.Google;
        const token: string = user._profile.id;

        await externalLogin(email, name, provider, token);
    };

    const facebookLoginSuccess = async (user: any) => {
        const email: string = user._profile.email;
        const name: string = user._profile.name;
        const provider: AuthType = AuthType.Facebook;
        const token: string = user._profile.id;

        await externalLogin(email, name, provider, token);
    };

    const onExternalLoginFail = async (error: any) => {
        console.log(error);
    };

    const externalLogin = async (email: string, name: string, provider: AuthType, token: string) => {
        if (!email || !name || !provider || !token) {
            // TODO: Dialog
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
                // TODO: material ui dialog
                console.log(e.graphQLErrors[0].message);
            } else {
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
                alert(e.graphQLErrors[0].message); // TODO: material ui dialog
            } else {
                console.error("handle login error", e);
            }
        }
    };

    const handleKeywordKeyPress = (e: any) => {
        if (e.key === "Enter") {
            handleFormSubmit();
        }
    };

    useEffect(() => {
        if (isLoggedIn) {
            Router.push("/");
        }
    }, []);

    if (loading) {
        return <>
            <Loading />
        </>;
    }

    const classes = useStyles({});

    return <>
        <Grid container direction="row" justify="center">
            <Grid item>
                <Paper style={{ padding: "2rem", position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} >
                    <Grid container={true} direction="column" justify="center" alignItems="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h4" component="div">
                                {localisation.login.title}
                            </Typography>
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="name"
                                variant="filled"
                                name="name"
                                label={localisation.login.email}
                                type="text"
                                autoComplete="email"
                                value={filled && filled.name || ""}
                                style={{ width: "25rem" }}
                                className={" pb-5"}
                                onChange={(e) => handleInputChange(e as FormEvent<HTMLInputElement>)} />
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="filled-adornment-password"
                                variant="filled"
                                name="password"
                                type={showPwd ? "text" : "password"}
                                autoComplete="current-password"
                                label={localisation.login.password}
                                value={filled && filled.password || ""}
                                onChange={(e) => handleInputChange(e as FormEvent<HTMLInputElement>)}
                                onKeyPress={handleKeywordKeyPress}
                                style={{ width: "25rem" }}
                                className={" pb-5"}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment variant="filled" position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={() => { setShowPwd(!showPwd); }}
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
                                style={{ width: "25rem" }}
                                className={classes.button}
                                onClick={handleFormSubmit}>
                                <Icon path={mdiLogin}
                                    size={1}
                                    color="white"
                                />
                                {localisation.login.login}
                            </Button>
                        </Grid>
                        <Grid item sm={12} style={{ width: "100%", paddingTop: "0px" }}>
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
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        <Background />
    </>;
};

export default LoginPage;
