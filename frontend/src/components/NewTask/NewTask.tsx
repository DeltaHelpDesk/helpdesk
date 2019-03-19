import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import * as React from "react";
import { Mutation, Query } from "react-apollo";
import { ADD_TASK, ADMINS } from "./NewTaskQueries";
import { withRouter, RouteComponentProps } from "react-router";
import { GET_TASKS } from '../TaskList/TaskListQueries';
import Loading from "./../Loading/Loading";

const styles = (theme: Theme) => ({
  root: {
    display: "inline-grid"
  },
  marginCenter: {
    margin: "0 auto",
    width: "max-content",
    display: "flex"
  },
  items: {
    marginTop: "10px"
  }
});

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

type NewTaskProps = WithStyles<string> & RouteComponentProps; // TODO: handle in better fashion

class NewTask extends React.Component<NewTaskProps, INewTaskState> {
  constructor(props: NewTaskProps) {
    super(props);
    this.state = {
      task: {
        subject: "",
        issue: "",
        assigne: ""
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
  }
  handleSelectedEvent(e: React.ChangeEvent<HTMLSelectElement>) {
    this.setState(previousState => ({
      task: {
        ...previousState.task,
        assigne: e.target.value
      }
    }));
  }
handleSubmit(e: any, callback: (variables: object) => void) {
    e.preventDefault();
       callback({
        variables: {
          subject: this.state.task.subject,
          issue: this.state.task.issue,
          assigneeId: this.state.task.assigne
        }
      });
  }

  handleSuccessfulCreation() {
    this.props.history.push("/tasklist");
  }

  render() {
    const { classes } = this.props;
    return (
      <Query query={ADMINS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading/>;
          }
          if (error) {
            return `${error}`;
          }
          const admins = data.admins as IAdmin[];
          return (
            <div className={classes.marginCenter}>
              <Mutation mutation={ADD_TASK} onCompleted={() => this.handleSuccessfulCreation()} refetchQueries={() => [{query: GET_TASKS}]}>
                {addTask => (
                  <form
                    className={classes.root}
                    onSubmit={(e: any) => this.handleSubmit(e, addTask)}
                  >
                    <TextField
                      id="filled-adornment-subject"
                      variant="filled"
                      name="subject"
                      className={classes.items}
                      label="Subject"
                      type="text"
                      value={this.state.task.subject}
                      required={true}
                      onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <TextField
                      id="filled-adornment-issue"
                      variant="filled"
                      name="issue"
                      label="Issue"
                      className={classes.items}
                      type="text"
                      value={this.state.task.issue}
                      required={true}
                      onChange={e => this.handleInputChange(e as React.FormEvent<HTMLInputElement>)}
                    />

                    <Select
                      value={this.state.task.assigne}
                      onChange={e =>
                        this.handleSelectedEvent(e as React.ChangeEvent<HTMLSelectElement>)
                      }
                      name="assingne"
                      className={classes.items}
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {admins.map(admin => {
                        return (
                          <MenuItem key={admin.id} value={admin.id}>
                            {admin.fullName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <Button variant="contained" type="submit" className={classes.items}>
                      Přidat
                    </Button>
                  </form>
                )}
              </Mutation>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(NewTask));
