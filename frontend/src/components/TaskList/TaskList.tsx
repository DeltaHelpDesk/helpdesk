import * as React from "react";
import Task from "./Task";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { GET_TASKS } from "./TaskListQueries";
import "../../graphql/auth";
import { ReactAuthContext, checkUserRole, UserRole, IAuthContextValue } from '../../graphql/auth';
import Loading from "./../Loading/Loading";

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
  id: number;
}

const styles = {};
class TaskList extends React.Component {
    static contextType = ReactAuthContext;
    context : IAuthContextValue;
    render() {
    const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN))
    return (
      <Query query={GET_TASKS}>
        {({ loading, error, data }) => {
          if (loading) {
            return <Loading/>;
          }
          if (error) {
            return `Error! ${error.message}`;
          }
          const { tasks } = data;
          const tableBody = tasks.map((task: ITask) => <Task key={task.id} task={task} isAdmin={isAdmin} />);
          return (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Author</TableCell>
                  <TableCell>Subject</TableCell>
                  <TableCell>Assignee</TableCell>
                  <TableCell>State</TableCell>
                  {isAdmin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>{tableBody}</TableBody>
            </Table>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(TaskList);
