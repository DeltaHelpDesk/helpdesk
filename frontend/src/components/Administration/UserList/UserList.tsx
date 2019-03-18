import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { ReactAuthContext, IAuthContextValue, checkUserRole, UserRole } from 'src/graphql/auth';
import { Query } from 'react-apollo';
import { GET_USER } from './UserListQueries';
import User from './User';

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    created_at: string;
    updated_at: string;
    role: string;
}

const styles = {};

class UserList extends React.Component {
    static contextType = ReactAuthContext;
    context : IAuthContextValue;

    render() {
        const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN))
        return (
            <Query query={GET_USER}>
              {({ loading, error, data }) => {
                if (loading) {
                  return "Loading...";
                }
                if (error) {
                  return `Error! ${error.message}`;
                }
                const { users } = data;
                console.log(users);
                const tableBody = users.map((user: IUser) => <User key={user.id} user={user} isAdmin={isAdmin} />);
                return (
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell>Created At</TableCell>
                        <TableCell>Updated At</TableCell>
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

export default withStyles(styles)(UserList);
