import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import * as React from "react";
import { Mutation, Query } from "react-apollo";
import { ADD_TASK, ADMINS } from "./NewTaskQueries";
import { GET_TASKS } from "../TaskList/TaskListQueries";
import Loading from "./../Loading/Loading";
import Grid from "@material-ui/core/Grid";
import Router from "next/router";
import { withAuthSync } from "../../src/auth/authWrapper";

interface INewTaskState {
    task: {
        subject: string;
        issue: string;
        assigne: string;
    };
}

interface IAdmin {
    id: string;
    fullName: string;
    email: string;
    role: string;
}

// tslint:disable-next-line:no-empty-interface
interface INewTaskProps {

} // TODO: handle in better fashion

class NewTask extends React.Component<INewTaskProps, INewTaskState> {
    constructor(props: INewTaskProps) {
        super(props);
        this.state = {
            task: {
                subject: "",
                issue: "",
                assigne: "",
            },
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        this.setState((previousState) => ({
            task: {
                ...previousState.task,
                [property]: value,
            },
        }));
    }
    handleSelectedEvent(e: React.ChangeEvent<HTMLSelectElement>) {
        this.setState((previousState) => ({
            task: {
                ...previousState.task,
                assigne: e.target.value,
            },
        }));
    }
    handleSubmit(e: React.FormEvent, callback: (variables: object) => void) {
        e.preventDefault();
        callback({
            variables: {
                subject: this.state.task.subject,
                issue: this.state.task.issue,
                assigneeId: this.state.task.assigne,
            },
        });
    }

    handleSuccessfulCreation() {
        Router.push("/");
    }

    render() {
        return (
            <Query query={ADMINS}>
                {({ loading, error, data }: any) => {
                    if (loading) {
                        return <Loading />;
                    }
                    if (error) {
                        return <>{error}</>;
                    }
                    const admins = data.admins as IAdmin[];
                    return (
                        <div>
                            <Grid container={true}>
                                <Grid item={true} xs={12} md={6} >

                                    <Mutation mutation={ADD_TASK}
                                        onCompleted={() => this.handleSuccessfulCreation()}
                                        refetchQueries={() => [{ query: GET_TASKS }]}>
                                        {(addTask: any) => (

                                            <form

                                                onSubmit={(e: React.FormEvent) => this.handleSubmit(e, addTask)}
                                            >
                                                <h2>Přidat požadavek</h2>
                                                <TextField
                                                    id="filled-adornment-subject"
                                                    variant="filled"
                                                    name="subject"

                                                    label="Subject"
                                                    type="text"
                                                    value={this.state.task.subject}
                                                    required={true}
                                                    onChange={(e) => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                                                />
                                                <TextField
                                                    id="filled-adornment-issue"
                                                    variant="filled"
                                                    name="issue"
                                                    label="Issue"

                                                    type="text"
                                                    value={this.state.task.issue}
                                                    required={true}
                                                    onChange={(e) => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                                                />

                                                <Select
                                                    value={this.state.task.assigne}
                                                    onChange={(e) =>
                                                        this.handleSelectedEvent(e as React.ChangeEvent<HTMLSelectElement>)
                                                    }
                                                    name="assingne"

                                                >
                                                    <MenuItem value="" disabled={true} selected={true}>
                                                        <em>Select one</em>
                                                    </MenuItem>
                                                    {admins.map((admin) => {
                                                        return (
                                                            <MenuItem key={admin.id} value={admin.id}>
                                                                {admin.fullName}
                                                            </MenuItem>
                                                        );
                                                    })}
                                                </Select>
                                                <Button variant="contained" type="submit" color="primary" >
                                                    Přidat
                                                </Button>
                                            </form>
                                        )}
                                    </Mutation>
                                </Grid>
                            </Grid>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default withAuthSync(NewTask);
