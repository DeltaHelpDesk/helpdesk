import * as classNames from "classnames";
import { withStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import Icon from '@mdi/react';
import Grid from "@material-ui/core/Grid";
import { mdiLogin } from '@mdi/js'
import { WithStyles, createStyles } from "@material-ui/core";
import helpdesk_bg from "../helpdesk_bg_trans.png";

import * as React from "react";
import MicrosoftButtonLogin from './MicrosoftButtonLogin';
import { RouteComponentProps } from 'react-router-dom';
import { ReactAuthContext } from 'src/graphql/auth';


// TODO: type definitons

const styles = (theme: Theme) => createStyles({
    root: {
        display: "flex",
        // flexWrap: "wrap"
    },
    margin: {
        margin: theme.spacing.unit
    },
    textField: {
        flexBasis: 222
    },
    button: {
        flexBasis: 150,
        margin: "10px 25px",
        color: theme.palette.secondary.contrastText,
        backgroundColor: theme.palette.secondary.main,
        padding: "10px 35px",
        borderRadius: "0px",
        fontWeight: "bold",
        textTransform: "uppercase",
        '&:hover': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
    leftIcon: {
        marginRight: theme.spacing.unit
    },
    paddingField: {
        paddingLeft: "0px",
    },
    buttonCenter: {
        textAlign: "center" as "center",
        // TODO: handle this propely
    },
    formStyle: {
        backgroundColor: theme.palette.background.default + "80",
        padding: "40px 60px",
        marginTop: "100px",
    },
    loginHeading: {
        textAlign: "center" as "center",
        textTransform: "uppercase" as "uppercase",
        margin: "5px 0px 15px",
        color: theme.palette.primary.contrastText,
    },
    buttonMarginTop: {
        marginTop: "25px",
    },
    background: {
        position: 'fixed',
        top: "50%",
        left: "50%",
        transform: 'translate(-50%,-50%)',
        width: "100%",
        zIndex: -5,
        [theme.breakpoints.down('sm')]: {
            height: "100%",
            width: "auto",
        },
        backgroundColor: theme.palette.background.default,
    }
});

interface IFilledInputAdornmentsState {
  showPassword: boolean,
  user: IUser
}

interface IUser {
  name: string,
  password: string,
}

type FilledInputAdornmentsProps<T> = WithStyles<string> & Record<"mode", boolean>

class FilledInputAdornments extends React.Component<FilledInputAdornmentsProps<typeof styles> & RouteComponentProps<any>, IFilledInputAdornmentsState> {
  static contextType = ReactAuthContext;
  state = {
    user: {
      name: "",
      password: "",
    },
    showPassword: false
  };


  handleInputChange(e: React.FormEvent<HTMLInputElement>) {
    const property = e.currentTarget.name;
    const value = e.currentTarget.value;

    this.setState(previousState => ({
      user: {
        ...previousState.user,
        [property]: value
      }
    }));
  };


  handleClickShowPassword = () => {
    this.setState((state) => ({ showPassword: !state.showPassword }));
  };

  handleFormSubmit = async () => {
    const { user } = this.state;
    const { loginByEmail } = this.context;
    try {
      await loginByEmail(user.name, user.password);
      this.props.history.push('/admin');
    } catch(e) {
      if(e && e.graphQLErrors && e.graphQLErrors[0]) {
        alert(e.graphQLErrors[0].message); // TODO: material ui dialog
      } else {
        console.error("handle login error", e);
      }
    }
  }

  handleOfficeLogin = async () => {
    const { doLoginOffice } = this.context;
    try {
      await doLoginOffice();
      this.props.history.push('/admin');
    } catch(e) {
      if(e && e.graphQLErrors && e.graphQLErrors[0]) {
        alert(e.graphQLErrors[0].message); // TODO: material ui dialog
      } else {
        console.error("handle login error", e);
      }
    }
  }

  handleKeywordKeyPress = (e: any) =>{
    if( e.key === 'Enter' ){
        this.handleFormSubmit();
    }
  };

  render() {
    const { classes } = this.props;


        return (

            <div className={classes.root}>
                <Grid container={true} direction="row" justify="center" alignItems="center">
                    <form className={classNames(classes.textField, classes.formStyle)}>
                        <Grid item={true}>
                            <h2 className={classNames(classes.loginHeading)}>Login form</h2>
                            <TextField
                                id="name"
                                className={classNames(classes.margin, classes.textField, classes.paddingField)}
                                variant="filled"
                                name="name"
                                label="Zadej jméno"
                                type="text"
                                onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)} />
                        </Grid>
                        <Grid item={true}>
                            <TextField
                                id="filled-adornment-password"
                                className={classNames(classes.margin, classes.textField)}
                                variant="filled"
                                name="password"
                                type={this.state.showPassword ? "text" : "password"}
                                label="Heslo"
                                onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                                onKeyPress={this.handleKeywordKeyPress}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment variant="filled" position="end">
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                            >
                                                {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Grid>
                        <Grid item={true}>
                            <div className={classes.buttonCenter}>
                                <Button
                                    variant="contained"
                                    size="large"
                                    color="secondary"
                                    className={classNames(classes.button, classes.margin, classes.buttonMarginTop)}
                                    onClick={this.handleFormSubmit}>
                                    <Icon path={mdiLogin} className={classNames(classes.leftIcon, classes.iconSmall)}
                                        size={1}
                                        color="white"
                                    />
                                    Přihlásit
                            </Button>
                            </div>
                        </Grid>
                        <Grid item={true}>
                            <div className={classes.buttonCenter}>
                                <MicrosoftButtonLogin
                                    onClick={this.handleOfficeLogin}
                                />
                            </div>
                        </Grid>
                    </form>
                    <img className={classes.background} src={helpdesk_bg} />
                </Grid>
            </div>

        );
    }
}

FilledInputAdornments.contextType = ReactAuthContext;

export default withStyles(styles)(FilledInputAdornments);
