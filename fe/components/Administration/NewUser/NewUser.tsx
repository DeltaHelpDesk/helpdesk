import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
/* import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem"; */

import * as React from "react";
import { Mutation } from "react-apollo";
import { ADD_USER } from "./NewUserQueries";
import { withRouter, RouteComponentProps } from "react-router";
import Grid from '@material-ui/core/Grid';
import { GET_USER } from '../UserList/UserListQueries';



interface INewUserState {
    user: {
        fullName: string;
        email: string;
        password: string;
    };
}

type NewUserProps = RouteComponentProps; // TODO: handle in better fashion

class NewUser extends React.Component<NewUserProps, INewUserState> {
    constructor(props: NewUserProps) {
        super(props);
        this.state = {
            user: {
                fullName: "",
                email: "",
                password: ""
            }
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e: React.FormEvent<HTMLInputElement>) {
        const property = e.currentTarget.name;
        const value = e.currentTarget.value;

        this.setState(previousState => ({
            user: {
                ...previousState.user,
                [property]: value
            }
        }));
    }

    handleSubmit(e: React.FormEvent, callback: (variables: object) => void) {
        e.preventDefault();
        callback({
            variables: {
                fullName: this.state.user.fullName,
                email: this.state.user.email,
                password: this.state.user.password
            }
        });
    }

    handleSuccessfulCreation() {
        this.props.history.push("/admin/userlist");
    }

    render() {
        return (
            <div >
                <Grid container={true}>
                    <Grid item={true} xs={12} md={6} >
                        <Mutation mutation={ADD_USER} onCompleted={() => this.handleSuccessfulCreation()} refetchQueries={() => [{ query: GET_USER }]}>
                            {(addUser: any) => (
                                <form

                                    onSubmit={(e: React.FormEvent) => this.handleSubmit(e, addUser)}
                                >
                                    <h2>Přidat uživatele</h2>
                                    <TextField
                                        id="filled-adornment-subject"
                                        variant="filled"
                                        name="fullName"

                                        label="Full Name"
                                        type="text"
                                        value={this.state.user.fullName}
                                        required={true}
                                        onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                                    />
                                    <TextField
                                        id="filled-adornment-issue"
                                        variant="filled"
                                        name="email"
                                        label="Email"

                                        type="text"
                                        value={this.state.user.email}
                                        required={true}
                                        onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                                    />
                                    <TextField
                                        id="filled-adornment-subject"
                                        variant="filled"
                                        name="password"

                                        label="Password"
                                        type="password"
                                        value={this.state.user.password}
                                        required={true}
                                        onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                                    />
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
    }
}

export default withRouter(NewUser);
