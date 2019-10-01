import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { Query } from "react-apollo";
import { withTranslation, WithTranslation } from 'react-i18next';
import "../../graphql/auth";
import { checkUserRole, IAuthContextValue, ReactAuthContext, UserRole } from '../../graphql/auth';
import Loading from "./../Loading/Loading";
import Task from "./Task";
import { GET_TASKS } from "./TaskListQueries";
import { ITask } from 'src/graphql/types';

/*
export interface ITask {
  id: string;
  subject: string;
  issue: string;
  state: string;
  assignee: IAssignee;
  author: IAuthor;
  created_at: Date
}
export interface IAssignee {
  fullName: string;
}
export interface IAuthor {
  fullName: string;
  id: number;
} 
*/


class TaskList extends React.Component<WithTranslation> {
    static contextType = ReactAuthContext;
    context: IAuthContextValue;
    render() {
        const { t } = this.props;
        const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN))
        return (
            <Query query={GET_TASKS}>
                {({ loading, error, data }) => {
                    if (loading) {
                        return <Loading />;
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

export default withTranslation()(TaskList);
