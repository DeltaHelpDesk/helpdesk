import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { ReactAuthContext, IAuthContextValue, checkUserRole, UserRole } from 'src/graphql/auth';
import { Query } from 'react-apollo';
import { GET_USER } from './UserListQueries';
import User from './User';
import { withTranslation, WithTranslation } from 'react-i18next';

export interface IUser {
    id: string;
    fullName: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    role: string;
}

const styles = {};

class UserList extends React.Component<WithTranslation> {
    static contextType = ReactAuthContext;
    context : IAuthContextValue;

    render() {
        const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN));
        const { t } = this.props;
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
                        <TableCell>{t('name')}</TableCell>
                        <TableCell>{t('email')}</TableCell>
                        <TableCell>{t('role')}</TableCell>
                        <TableCell>{t('createdAt')}</TableCell>
                        <TableCell>{t('updatedAt')}</TableCell>
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

export default withStyles(styles)(withTranslation()(UserList));