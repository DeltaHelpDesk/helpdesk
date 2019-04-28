import * as React from "react";
import Task from "./Task";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { GET_TASKS } from "./TaskListQueries";
import "../../graphql/auth";
import { ReactAuthContext, checkUserRole, UserRole, IAuthContextValue } from '../../graphql/auth';
import Loading from "./../Loading/Loading";
import { withTranslation, WithTranslation } from 'react-i18next';

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
class TaskList extends React.Component<WithTranslation> {
    static contextType = ReactAuthContext;
    context : IAuthContextValue;
    render() {
    const { t } = this.props;
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
                  <TableCell>{t('author')}</TableCell>
                  <TableCell>{t('subject')}</TableCell>
                  <TableCell>{t('assignee')}</TableCell>
                  <TableCell>{t('state')}</TableCell>
                  {isAdmin && <TableCell>{t('actions')}</TableCell>}
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

export default withStyles(styles)(withTranslation()(TaskList));
