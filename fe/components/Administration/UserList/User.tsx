import { FunctionComponent } from "react";
import { TableRow, TableCell, Box, Fade } from "@material-ui/core";
import DateFormatComponent from "../../Dates/DateFormatter";
import Skeleton from "@material-ui/lab/Skeleton";
import { getUsers_users } from "../../../src/graphql/types/getUsers";
import RoleIcon from "../../RoleIcon/RoleIcon";
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
