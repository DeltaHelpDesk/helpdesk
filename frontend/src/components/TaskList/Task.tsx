import {ITask} from "./TaskList";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { DELETE_TASK } from './TaskListQueries';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = {

};

// Prepared for Task component
function Task(props: {task:ITask}) {
  const task: ITask = props.task;

  const taskId = task.id;
  const DeleteButton = () => {
    return (
      <Mutation mutation={DELETE_TASK}>
        {(deleteTask) => (
        <Button variant="contained" color="secondary" onClick={() => {
          deleteTask({
            variables: {
              taskId
            }
          });
        }}>
          Delete
          <DeleteIcon/>
        </Button>           
        )}
      </Mutation>
    );
  };


  return (
      <TableRow>
        <TableCell>
          {task.author.fullName}
        </TableCell>
        <TableCell>
          {task.issue}
        </TableCell>
        <TableCell>
          {task.assignee.fullName}
        </TableCell>
        <TableCell>
          {task.state}
        </TableCell>
        <TableCell>
          <DeleteButton />
        </TableCell>
        
      </TableRow>
  );
}

export default withStyles(styles)(Task);
