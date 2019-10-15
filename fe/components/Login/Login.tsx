import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Icon from '@mdi/react';
import Grid from "@material-ui/core/Grid";
import { mdiLogin } from '@mdi/js'
import * as React from "react";
// import MicrosoftButtonLogin from './MicrosoftButtonLogin';
import { ReactAuthContext } from '../../src/graphql/auth';
import { useState } from "react";




interface IFilledInputAdornmentsState {
    showPassword: boolean,
    user: IUser
}

interface IUser {
    name: string,
    password: string,
}

// type FilledInputAdornmentsProps<T> = WithStyles<string> & Record<"mode", boolean>

const LoginPage: React.FunctionComponent<IFilledInputAdornmentsState> = ({ showPassword, user }) => {
    const contextType = ReactAuthContext;

    const [showPwd, setShowPwd] = useState<boolean>(showPassword);

    const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        // this.setState(previousState => ({
        //     user: {
        //         ...previousState.user,
        //         [property]: value
        //     }
        // }));
    };


    const handleClickShowPassword = () => {
        setShowPwd(!showPwd);
    };

    const handleFormSubmit = async () => {
        const { loginByEmail } = this.context;
        try {
            await loginByEmail(user.name, user.password);
            //this.props.history.push('/admin');
        } catch (e) {
            if (e && e.graphQLErrors && e.graphQLErrors[0]) {
                alert(e.graphQLErrors[0].message); // TODO: material ui dialog
            } else {
                console.error("handle login error", e);
            }
        }
    }

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
        if (e.key === 'Enter') {
            this.handleFormSubmit();
        }
    };

    return (
        <div >
            <Grid container={true} direction="row" justify="center" alignItems="center">
                <form >
                    <Grid item={true}>
                        <h2 >Login form</h2>
                        <TextField
                            id="name"
                            variant="filled"
                            name="name"
                            label="Zadej jméno"
                            type="text"
                            onChange={e => handleInputChange(e as React.FormEvent<HTMLInputElement>)} />
                    </Grid>
                    <Grid item={true}>
                        <TextField
                            id="filled-adornment-password"
                            variant="filled"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            label="Heslo"
                            onChange={e => handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                            onKeyPress={handleKeywordKeyPress}
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
                                )
                            }}
                        />
                    </Grid>
                    <Grid item={true}>
                        <div >
                            <Button
                                variant="contained"
                                size="large"
                                color="primary"
                                onClick={handleFormSubmit}>
                                <Icon path={mdiLogin}
                                    size={1}
                                    color="white"
                                />
                                Přihlásit
                        </Button>
                        </div>
                    </Grid>
                    <Grid item={true}>
                        <div >
                            {/* <MicrosoftButtonLogin onClick={handleOfficeLogin} /> */}
                        </div>
                    </Grid>
                </form>
            </Grid>
        </div>
    );
};

export default LoginPage;
