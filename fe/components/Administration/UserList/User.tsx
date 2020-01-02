import { FunctionComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button, Box, Fade } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { DELETE_USER, GET_USER } from "./UserListQueries";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { GET_TASKS } from "../../TaskList/TaskListQueries";
import DateFormatComponent from "../../Dates/DateFormatter";
import Skeleton from "@material-ui/lab/Skeleton";
import { getUsers_users } from "../../../src/graphql/types/getUsers";
import RoleIcon from "../../RoleIcon/RoleIcon";

interface IUserComponentProps {
    user?: getUsers_users;
    isAdmin: boolean;
}

const UserComponent: FunctionComponent<IUserComponentProps> = ({ user = null, isAdmin }) => {

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

    const DeleteButton: FunctionComponent = () => {
        return (
            <Mutation mutation={DELETE_USER} refetchQueries={() => [{ query: GET_USER }, { query: GET_TASKS }]}>
                {(removeUser: any) => (
                    <Button variant="contained" color="secondary" onClick={() => {
                        removeUser({
                            variables: {
                                email,
                            },
                        });
                    }}>
                        <DeleteIcon />
                    </Button>
                )}
            </Mutation>
        );
    };

    return (
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
                    <Button variant="contained" color="primary">
                        <EditIcon />
                    </Button>
                    <DeleteButton />
                </TableCell>}
            </TableRow>
        </Fade>
    );
};

export default UserComponent;
