import { FunctionComponent, useContext } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Fade } from "@material-ui/core";
import { ReactAuthContext, checkUserRole, UserRole } from "../../../src/graphql/auth";
import UserList from "./UserList";

const UserListContainer: FunctionComponent = () => {

    const { user: logged } = useContext(ReactAuthContext);

    const isAdmin = !!logged && checkUserRole(logged.role, UserRole.ADMIN);

    return <>
        <Fade in={true}>
            <Paper style={{ padding: "1rem" }}>
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
                    <TableBody>
                        <UserList />
                    </TableBody>
                </Table>
            </Paper>
        </Fade>
    </>;
};

export default UserListContainer;
