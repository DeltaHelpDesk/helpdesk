import { IUser } from "./UserList";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { DELETE_USER, GET_USER } from './UserListQueries';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GET_TASKS } from 'src/components/TaskList/TaskListQueries';
const styles = {
}

// Prepared for Task component
const User: React.SFC<{ user: IUser, isAdmin: boolean }> = props => {
  const isAdmin: boolean = props.isAdmin;
  const user: IUser = props.user;


  const email = user.email;
  const DeleteButton = () => {
    return (
      <Mutation mutation={DELETE_USER}  refetchQueries={() => [{query: GET_USER}, {query: GET_TASKS}]}>
        {(removeUser: any) => (
          <Button variant="contained" color="secondary" onClick={() => {
            removeUser({
              variables: {
                email
              }
            });
          }}>
          <DeleteIcon />
          </Button>
        )}
      </Mutation>
    );
  };


  return (
    <TableRow>
      <TableCell>
        {user.fullName}
      </TableCell>
      <TableCell>
        {user.email}
      </TableCell>
      <TableCell>
        {user.role}
      </TableCell>
      <TableCell>
        {user.created_at}
      </TableCell>
      <TableCell>
        {user.updated_at}
      </TableCell>
      { isAdmin && <TableCell>
          <Button variant="contained" color="primary">
            <EditIcon />
          </Button>
          <DeleteButton />
      </TableCell> }
    </TableRow>
  );
}

export default withStyles(styles)(User);
