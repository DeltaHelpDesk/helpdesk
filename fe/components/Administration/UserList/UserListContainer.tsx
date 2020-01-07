import { FunctionComponent, useContext } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Fade } from "@material-ui/core";
import { ReactAuthContext, checkUserRole } from "../../../src/graphql/auth";
import UserList from "./UserList";
import { UserRole } from "../../../src/graphql/graphql-global-types";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import getTheme from "../../Themes/MainTheme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        userListContainer: {
            padding: "1rem",
        },
    }));

const UserListContainer: FunctionComponent = () => {

    const classes = useStyles(getTheme());

    const { user: logged } = useContext(ReactAuthContext);

    const isAdmin = !!logged && checkUserRole(logged.role, UserRole.ADMIN);

    return <>
        <Fade in={true}>
            <Paper className={classes.userListContainer}>
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
