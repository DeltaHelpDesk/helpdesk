import { withStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

import * as React from "react";


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


function NewTaskForm(props:any){
    const { classes } = props;

        return (
                <form className={classes.root}>
                    <TextField
                    id="name"
                    label="Název"
                    className={classes.textField}
                    variant="filled"
                    value="helo"/>

                </form>
        );
}


export default withStyles(styles)(NewTaskForm);
