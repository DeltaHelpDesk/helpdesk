import * as classNames from "classnames";
import { withStyles, Theme } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Button from "@material-ui/core/Button";
import { WithStyles } from "@material-ui/core";

import * as React from "react";
import MicrosoftButtonLogin from './MicrosoftButtonLogin';
import { RouteComponentProps } from 'react-router-dom';
import { ReactAuthContext } from 'src/graphql/auth';


// TODO: type definitons

const styles = (theme: Theme) => ({
  root: {
    display: "flex",
    // flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing.unit
  },
  textField: {
    flexBasis: 200
  },
  button: {
    flexBasis: 150
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

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <form>
          <TextField
            id="name"
            className={classNames(classes.margin, classes.textField)}
            variant="filled"
            name="name"
            label="Zadej jméno"
            type="text"
            onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
          />
          <TextField
            id="filled-adornment-password"
            className={classNames(classes.margin, classes.textField)}
            variant="filled"
            name="password"
            type={this.state.showPassword ? "text" : "password"}
            label="Heslo"
            onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
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
          <MicrosoftButtonLogin onClick={this.handleOfficeLogin} />
          <Button
            variant="contained"
            className={classNames(classes.button, classes.margin)}
            onClick={this.handleFormSubmit}
          >
            Přihlásit
          </Button>
        </form>
      </div>
    );
  }
}

FilledInputAdornments.contextType = ReactAuthContext;

export default withStyles(styles)(FilledInputAdornments);
