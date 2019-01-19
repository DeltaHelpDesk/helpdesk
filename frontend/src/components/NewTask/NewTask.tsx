import { withStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { WithStyles } from "@material-ui/core";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import * as React from "react";


const styles = (theme: Theme) => ({
    root: {
        display: "inline-grid",
        alignItems: "center",
    },
    marginCenter:{
        margin: "auto",
        width: "max-content",
    },
    items:{
        marginTop: "5px",
    }

});



interface IFilledInputAdornmentsState {
    task: INewTask
}

interface INewTask {
    subject: string,
    issue: string,
    assigne: string,
}

type FilledInputAdornmentsProps<T> = WithStyles<string> & Record<"mode", boolean>

class FilledInputAdornments extends React.Component<FilledInputAdornmentsProps<typeof styles>, IFilledInputAdornmentsState> {
    NewTask = {
        task: {
            subject: "",
            issue: "",
            assigne: ""
        },
    };

    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        this.NewTask.task[property] = value;
    };


    handleChange = (event: any)=> {
        this.NewTask.task[2] = event.target.value;
      };

    handleSubmit = () => {
        console.log(this.NewTask.task)
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.marginCenter}>
                <form className={classes.root}>
                    <TextField
                        id="filled-adornment-subject"
                        variant="filled"
                        name="subject"
                        className={classes.items}
                        label="Subject"
                        type="text"
                        value={this.NewTask.task.subject}
                        onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <TextField
                        id="filled-adornment-issue"
                        variant="filled"
                        name="issue"
                        label="Issue"
                        className={classes.items}
                        type="text"
                        value={this.NewTask.task.issue}
                        onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Select
                        id="filled-adornment-issue"
                        name="assigne"
                        className={classes.items}
                        variant="filled"
                        onChange={e => this.handleChange(e)}
                    >
                        
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        className={classes.items}
                        onClick={this.handleSubmit}
                    >
                        Přihlásit
                    </Button>
                </form>
            </div>
        );
    }
}


export default withStyles(styles)(FilledInputAdornments);
