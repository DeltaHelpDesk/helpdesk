import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import * as React from "react";
import { Query } from "react-apollo";
import { checkUserRole, IAuthContextValue, ReactAuthContext, UserRole } from '../../src/graphql/auth';
import Loading from "./../Loading/Loading";
import Task from "./Task";
import { GET_TASKS } from "./TaskListQueries";
import { ITask } from '../../src/graphql/types';

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


class TaskList extends React.Component<{}> {
    static contextType = ReactAuthContext;
    static context: IAuthContextValue;
    render() {
        const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN))
        return (
            <Query query={GET_TASKS}>
                {({ loading, error, data }: any) => {
                    if (loading) {  
                        return <Loading />;
                    }
                    if (error) {
                        return <>Error! {error.message}</>;
                    }
                    const { tasks } = data;
                    const tableBody = tasks.map((task: ITask) => <Task key={task.id} task={task} isAdmin={isAdmin} />);
                    return (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Autor</TableCell>
                                    <TableCell>Předmět</TableCell>
                                    { 
                                        // TODO: Vymyslet lepší název pro řešitele 
                                    }
                                    <TableCell>Řešitel</TableCell>
                                    <TableCell>Stav</TableCell>
                                    {isAdmin && <TableCell>Možnosti</TableCell>}
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

export default TaskList;
