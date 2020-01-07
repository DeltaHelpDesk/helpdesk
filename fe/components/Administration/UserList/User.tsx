import { FunctionComponent, useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button, Box, Fade, Modal, IconButton, Grid } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { DELETE_USER, GET_USER } from "./UserListQueries";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { GET_TASKS } from "../../TaskList/TaskListQueries";
import DateFormatComponent from "../../Dates/DateFormatter";
import Skeleton from "@material-ui/lab/Skeleton";
import { getUsers_users } from "../../../src/graphql/types/getUsers";
import RoleIcon from "../../RoleIcon/RoleIcon";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditUser from "./EditUser";
import RemoveUser from "./DeleteUser";

interface IUserComponentProps {
    user?: getUsers_users;
    isAdmin: boolean;
    refresh?: () => void;
}

const UserComponent: FunctionComponent<IUserComponentProps> = ({ user = null, isAdmin, refresh = null }) => {

    const reload = () => {
        if (refresh) {
            refresh();
        }
    };

    if (!user) {
        return <>
            <Fade in={true}>
                <TableRow>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    <TableCell>
                        <Skeleton />
                    </TableCell>
                    {isAdmin && <TableCell>
                        <Box width="5rem" />
                    </TableCell>}
                </TableRow>
            </Fade>
        </>;
    }

    const { email, fullName, role, created_at, updated_at, id } = user;

    return <>
        <Fade in={true}>
            <TableRow>
                <TableCell>
                    {id}
                </TableCell>
                <TableCell>
                    {fullName}
                </TableCell>
                <TableCell>
                    {email}
                </TableCell>
                <TableCell>
                    <RoleIcon role={role} />
                </TableCell>
                <TableCell>
                    <DateFormatComponent date={created_at} relative={false} />
                </TableCell>
                <TableCell>
                    <DateFormatComponent date={updated_at} relative={false} />
                </TableCell>
                {isAdmin && <TableCell>
                    <EditUser user={user} onEdited={reload} />
                    <RemoveUser user={user} onRemoved={reload} />
                </TableCell>}
            </TableRow>
        </Fade>

    </>;
};

export default UserComponent;
