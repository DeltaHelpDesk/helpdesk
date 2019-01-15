import * as React from "react";
import Task from './Task';
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import { GET_TASKS } from './TaskListQueries';


export interface ITask {
  id: string;
  issue: string;
  state: string;
  assignee: IAssignee;
  author: IAuthor;
}
export interface IAssignee{
  fullName: string;
}
export interface IAuthor{
  fullName: string;
}

const styles = {
   
};

function TaskList() {
  return (
    <Query query={GET_TASKS}>
      {({ loading, error, data }) => {
        if (loading) {return "Loading..."};
        if (error) { return `Error! ${error.message}`};
        const { tasks } = data;
        const tableBody = tasks.map((task: ITask) => 
          <Task key={task.id} task={task} />
        )
        return(
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Author
                  </TableCell>
                  <TableCell>
                    Issue
                  </TableCell>
                  <TableCell>
                    Assignee
                  </TableCell>
                  <TableCell>
                    State
                  </TableCell>
                  <TableCell>
                    Delete
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableBody}
              </TableBody>
            </Table>
      );
      }}
    </Query>
  );
}

export default withStyles(styles)(TaskList);
