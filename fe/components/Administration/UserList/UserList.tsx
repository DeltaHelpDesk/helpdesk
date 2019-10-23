import * as React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody } from "@material-ui/core";
import { ReactAuthContext, IAuthContextValue, checkUserRole, UserRole } from '../../../src/graphql/auth';
import { Query } from 'react-apollo';
import { GET_USER } from './UserListQueries';
import UserComponent from './User';
import { IUser } from "../../../src/graphql/types";
import Loading from "../../Loading/Loading";



class UserList extends React.Component<{}> {
    static contextType = ReactAuthContext;
    static context: IAuthContextValue;

    render() {
        const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN));

        return (
            <Query query={GET_USER}>
                {({ loading, error, data }: any) => {
                    if (loading) {
                        return <>
                            <Loading isLinear={true} />
                        </>;
                    }
                    if (error) {
                        return <>Error! ${error.message}</>;
                    }
                    const users: IUser[] = data.users;

                    return (
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Jméno</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Role</TableCell>
                                    <TableCell>Registrace</TableCell>
                                    <TableCell>Aktualizace</TableCell>
                                    {isAdmin && <TableCell>Možnosti</TableCell>}
                                </TableRow>
                            </TableHead>
                            <TableBody>{users.map((user) => <UserComponent key={user.id} user={user} isAdmin={isAdmin} />)}</TableBody>
                        </Table>
                    );
                }}
            </Query>
        );
    }
}

export default UserList;
