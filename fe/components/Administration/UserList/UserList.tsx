import { FunctionComponent, useContext } from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Fade } from "@material-ui/core";
import { ReactAuthContext, checkUserRole, UserRole } from "../../../src/graphql/auth";
import { Query, useQuery } from "react-apollo";
import { GET_USER } from "./UserListQueries";
import UserComponent from "./User";
import { IUser } from "../../../src/graphql/types";
import Loading from "../../Loading/Loading";
import { withAuthSync } from "../../../src/auth/authWrapper";
import { getUsers } from "../../../src/graphql/types/getUsers";
import { getUsersQuery } from "../../../src/graphql/queries";

const UserList: FunctionComponent = () => {
    const { user: logged } = useContext(ReactAuthContext);

    const isAdmin = !!logged && checkUserRole(logged.role, UserRole.ADMIN);

    const { loading, error, data } = useQuery<getUsers>(getUsersQuery);

    if (loading) {
        return <>
            {
                Array.from(new Array(10)).map((user, index) =>
                    <UserComponent key={index} user={null} isAdmin={isAdmin} />)
            }
        </>;
    }

    if (error) {
        return <>
            Error! {error.message}
        </>;
    }

    const { users } = data;
    return <>

        {
            users.map((user) =>
                <UserComponent key={user.id} user={user} isAdmin={isAdmin} />)
        }

    </>;
};

export default withAuthSync(UserList);
