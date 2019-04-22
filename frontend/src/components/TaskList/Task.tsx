import { ITask } from "./TaskList";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button, Icon } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { DELETE_TASK, GET_TASKS } from './TaskListQueries';
import DeleteIcon from '@material-ui/icons/Delete';
import background from 'src/utils/TaskState';
import { NavLink } from 'react-router-dom';
const styles = {

}

// Prepared for Task component
const Task: React.SFC<{ task: ITask, isAdmin: boolean}> = props => {
  const isAdmin: boolean = props.isAdmin;
  const task: ITask = props.task;


  const taskId = task.id;
  const DeleteButton = () => {
    return (
      <Mutation mutation={DELETE_TASK}  refetchQueries={() => [{query: GET_TASKS}]}>
        {deleteTask => (
          <Button variant="contained" color="secondary" onClick={() => {
            deleteTask({
              variables: {
                taskId
              }
            });
          }}>
          <DeleteIcon />
          </Button>
        )}
      </Mutation>
    );
  };
  const DetailButton = () => {
    const path = "/task/" + task.id;
    return (
    <NavLink to={path}>
        <Button variant="contained" color="primary">
            <Icon>edit_icon</Icon>
        </Button>
    </NavLink>
    )};
    
const LetterButton = () => {
    const path = "/task/" + task.id;
    return (
    <NavLink to={path}>
        <Button variant="contained" color="primary">
            <Icon>mail-outline</Icon>
        </Button>
    </NavLink>
    )};

  return (
    <TableRow className={background[task.state]}>
      <TableCell>
        {task.author.fullName}
      </TableCell>
      <TableCell>
        {task.subject}
      </TableCell>
      <TableCell>
        {task.assignee ? task.assignee.fullName : "Nepřiřazen"}
      </TableCell>
      <TableCell>
        {task.state}
      </TableCell>
      
      { (isAdmin) ?
        <TableCell>
            <DeleteButton />
            <DetailButton />
        </TableCell>
        :
        <TableCell>
            <LetterButton />
        </TableCell>
        } 
    </TableRow>
  );
}

export default withStyles(styles)(Task);
