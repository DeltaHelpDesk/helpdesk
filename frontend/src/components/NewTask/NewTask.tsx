import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

import * as React from "react";


const styles = (theme: Theme) => ({
    root: {
        display: "inline-grid"
    },
    marginCenter:{
        margin: "0 auto",
        width: "max-content",
        display: "flex"
    },
    items:{
        marginTop: "10px",
    }

});


interface INewTaskState {
    task: {
        subject: string,
        issue: string,
        assigne: string,
    }
}

type NewTaskProps<T> = WithStyles<string> // TODO: handle in better fashion



class FilledInputAdornments extends React.Component<NewTaskProps<typeof styles>, INewTaskState>{
    constructor(props: NewTaskProps<typeof styles>) {
        super(props)
        this.state = {
            task: {
                subject: " ",
                issue: " ",
                assigne: " ",
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        this.setState(previousState => ({
            task: {
                ...previousState.task,
                [property]: value
            }
        }));
    };
    handleSelectedEvent(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState(previousState => ({
            task: {
                ...previousState.task,
                assigne: e.target.value
            }
        }));
    };
    handleSubmit() {
        console.log(this.state)
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
                        value={this.state.task.subject}
                        onChange={(e) => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <TextField
                        id="filled-adornment-issue"
                        variant="filled"
                        name="issue"
                        label="Issue"
className={classes.items}
                        type="text"
                        value={this.state.task.issue}
                        onChange={(e) => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Select
                        onChange={(e) => this.handleSelectedEvent(e as React.ChangeEvent<HTMLSelectElement>)}
                        input={<Input name="assingne" id="assingne-label" value={this.state.task.assigne} />}
                        name="assingne"
className={classes.items}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                    <Button
                        variant="contained"
                        onClick={this.handleSubmit}
className={classes.items}
                    >
                        Přidat
                    </Button>
                </form>
            </div>
        );
    }
}


export default withStyles(styles)(FilledInputAdornments);
