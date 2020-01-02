import { FunctionComponent, useContext } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Fade } from "@material-ui/core";
import { ReactAuthContext, checkUserRole } from "../../../src/graphql/auth";
import UserList from "./UserList";
import { UserRole } from "../../../src/graphql/graphql-global-types";

const UserListContainer: FunctionComponent = () => {

    const { user: logged } = useContext(ReactAuthContext);

    const isAdmin = !!logged && checkUserRole(logged.role, UserRole.ADMIN);

    return <>
        <Fade in={true}>
            <Paper style={{ padding: "1rem" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Jméno</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Registrace</TableCell>
                            <TableCell>Aktualizace</TableCell>
                            {isAdmin && <TableCell>Akce</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <UserList />
                    </TableBody>
                </Table>
            </Paper>
        </Fade>
    </>;
};

export default UserListContainer;
