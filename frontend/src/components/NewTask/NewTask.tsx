import { withStyles, Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Input from '@material-ui/core/Input';

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


interface INewTask {
    subject: string,
    issue: string,
    assigne: string,
}

class FilledInputAdornments extends React.Component<INewTask>{
    constructor(props: INewTask) {
        super(props)
        this.state = {
            subject: " ",
            issue: " ",
            assigne: " ",
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        this.setState({
            [property]: value
        })
    };
    handleSelectedEvent(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState({
            assigne: e.target.value
        })
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
                        value={this.props.subject}
                        onChange={(e) => this.handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                    />
                    <TextField
                        id="filled-adornment-issue"
                        variant="filled"
                        name="issue"
                        label="Issue"
className={classes.items}
                        type="text"
                        value={this.props.issue}
                        onChange={(e) => this.handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
                    />
                    <Select
                        onChange={(e) => this.handleSelectedEvent(e as React.ChangeEvent<HTMLSelectElement>)}
                        input={<Input name="assingne" id="assingne-label" value={this.props.assigne} />}
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
