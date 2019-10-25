import { useState, useContext, useEffect } from "react";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Icon from "@mdi/react";
import Grid from "@material-ui/core/Grid";
import { mdiLogin } from "@mdi/js";
import Router from "next/router";
// import MicrosoftButtonLogin from './MicrosoftButtonLogin';
import { ReactAuthContext } from "../../src/graphql/auth";
import Loading from "../Loading/Loading";
import customRoutes from "../../src/Routes";
import localisation from "../../src/Locales/Localisations";
import { withToastManager, useToasts } from "react-toast-notifications";

interface ILoginProps {
    showPassword: boolean;
    user: IUser;
}

interface IUser {
    name: string;
    password: string;
}

// type FilledInputAdornmentsProps<T> = WithStyles<string> & Record<"mode", boolean>

const LoginPage: React.FunctionComponent<ILoginProps> = ({ showPassword, user: loginVars }) => {

    const { loginByEmail, isLoggedIn } = useContext(ReactAuthContext);
    const { addToast } = useToasts();

    const [filled, setUser] = useState<IUser>(loginVars);
    const [showPwd, setShowPwd] = useState<boolean>(showPassword);
    const [loading, setLoading] = useState<boolean>(false);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
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
            addToast("Musíte vyplnit údaje", {
                appearance: "error",
                autoDismiss: true,
            });
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
                addToast(e.graphQLErrors[0].message, {
                    appearance: "error",
                    autoDismiss: true,
                    pauseOnHover: true,
                });
                // TODO: material ui dialog
                console.log(e.graphQLErrors[0].message);
            } else {
                console.error("handle login error", e);
            }
        }
        setLoading(false);
    };

    /*const handleOfficeLogin = async () => {
         const { doLoginOffice } = this.context;
         try {
             await doLoginOffice();
             this.props.history.push('/admin');
         } catch (e) {
             if (e && e.graphQLErrors && e.graphQLErrors[0]) {
                 alert(e.graphQLErrors[0].message); // TODO: material ui dialog
             } else {
                 console.error("handle login error", e);
             }
         }
     }*/

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

    return (
        <div >
            <Grid container={true} direction="column" justify="center" alignItems="center">
                {
                    (loading)
                        ?
                        <Loading />
                        :
                        <form>
                            <Grid item={true}>
                                <div style={{ width: "25rem" }}>
                                    <h2 className={"h1-responsive pb-5"}>{localisation.login.title}</h2>
                                </div>
                                <TextField
                                    id="name"
                                    variant="filled"
                                    name="name"
                                    label={localisation.login.email}
                                    type="text"
                                    value={filled && filled.name || ""}
                                    style={{ width: "25rem" }}
                                    className={" pb-5"}
                                    onChange={(e) => handleInputChange(e as React.FormEvent<HTMLInputElement>)} />
                            </Grid>
                            <Grid item={true}>
                                <TextField
                                    id="filled-adornment-password"
                                    variant="filled"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    label={localisation.login.password}
                                    value={filled && filled.password || ""}
                                    onChange={(e) => handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                                    onKeyPress={handleKeywordKeyPress}
                                    style={{ width: "25rem" }}
                                    className={" pb-5"}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment variant="filled" position="end">
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item={true}>
                                <div >
                                    <Button
                                        variant="contained"
                                        size="large"
                                        color="primary"
                                        style={{ width: "25rem" }}
                                        onClick={handleFormSubmit}>
                                        <Icon path={mdiLogin}
                                            size={1}
                                            color="white"
                                        />
                                        {localisation.login.login}
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item={true}>
                                <div >
                                    {/* <MicrosoftButtonLogin onClick={handleOfficeLogin} /> */}
                                </div>
                            </Grid>
                        </form>
                }
            </Grid>
        </div>
    );
};

export default withToastManager(LoginPage);
