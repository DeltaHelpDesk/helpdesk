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


// TODO: type definitons

const styles = (theme: Theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap"
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

interface FilledInputAdornmentsState {
    name: string,
    password: string,
    showPassword: boolean
}

type FilledInputAdornmentsProps<T> = WithStyles<T> & Record<"mode", boolean>

class FilledInputAdornments extends React.Component<FilledInputAdornmentsProps<typeof styles>, FilledInputAdornmentsState> {

    state = {
        name: "",
        password: "",
        showPassword: false
    };

    handleChange = (prop: any) => (event: ) => {
        this.setState({ [prop]: eventtarget.value });
    };

    handleClickShowPassword = () => {
        this.setState((state) => ({ showPassword: !state.showPassword }));
    };

    render() {
        const { classes } = this.props;


        return (
            <div className={classes.root}>
                <TextField
                    id="name"
                    className={classNames(classes.margin, classes.textField)}
                    variant="filled"
                    label="Zadej jméno"
                    onChange={this.handleChange("name")}
                />
                <TextField
                    id="filled-adornment-password"
                    className={classNames(classes.margin, classes.textField)}
                    variant="filled"
                    type={this.state.showPassword ? "text" : "password"}
                    label="Heslo"
                    value={this.state.password}
                    onChange={this.handleChange("password")}
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
                <Button
                    variant="contained"
                    className={classNames(classes.button, classes.margin)}
                >
                    Přihlásit
        </Button>
            </div>
        );
    }
}


export default withStyles(styles)(FilledInputAdornments);
