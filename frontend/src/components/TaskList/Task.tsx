import {ITask} from "./TaskList";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell } from '@material-ui/core';

const styles = {
};

// Prepared for Task component
function Task(props: {task:ITask}) {
  // const { classes } = props;
  const task: ITask = props.task;
  return (
      <TableRow>
        <TableCell>
          {task.author}
        </TableCell>
        <TableCell>
          {task.issue}
        </TableCell>
        <TableCell>
          {task.assignee}
        </TableCell>
        <TableCell>
          {task.state}
        </TableCell>
      </TableRow>
  );
}

export default withStyles(styles)(Task);
