import * as React from "react";
import Task from "./Task";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { GET_TASKS } from "./TaskListQueries";
import "../../graphql/auth";
import { ReactAuthContext, checkUserRole, UserRole, IAuthContextValue } from '../../graphql/auth';
import { TASK_DETAIL } from './TaskDetailQueries';

export interface ITask {
  id: string;
  subject: string;
  issue: string;
  state: string;
  assignee: IAssignee;
  author: IAuthor;
}
export interface IAssignee {
  fullName: string;
}
export interface IAuthor {
  fullName: string;
}

const styles = {};
class TaskList extends React.Component {
    static contextType = ReactAuthContext;
    context : IAuthContextValue;
    render() {
    const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN))
    const isOwner = this.context.user.id == "";
    const { id } = this.props.match;
    return (
      <Query query={TASK_DETAIL} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return `Error! ${error.message}`;
          }
          const { tasks } = data;
          // const tableBody = tasks.map((task: ITask) => <Task key={task.id} task={task} isAdmin={isAdmin} />);
          return (
            <div></div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(TaskList);
