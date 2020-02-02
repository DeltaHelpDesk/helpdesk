import { FunctionComponent, useContext } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Paper, Fade } from "@material-ui/core";
import { ReactAuthContext, checkUserRole } from "../../../src/graphql/auth";
import UserList from "./UserList";
import { UserRole } from "../../../src/graphql/graphql-global-types";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import getTheme from "../../Themes/MainTheme";
import locKeys from "../../../src/Locales/LocalizationKeys";
import { useTranslation } from "react-i18next";

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

    const { t } = useTranslation();

    return <>
        <Fade in={true}>
            <Paper className={classes.userListContainer}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell> {t(locKeys.login.name)} </TableCell>
                            <TableCell> {t(locKeys.login.email)} </TableCell>
                            <TableCell> {t(locKeys.common.role)} </TableCell>
                            <TableCell> {t(locKeys.common.registration)} </TableCell>
                            <TableCell> {t(locKeys.common.update)} </TableCell>
                            {isAdmin && <TableCell> {t(locKeys.common.actions)} </TableCell>}
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
