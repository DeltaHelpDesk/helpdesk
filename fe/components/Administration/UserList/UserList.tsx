import { FunctionComponent, useContext } from "react";
import { ReactAuthContext, userIsInRole } from "../../../src/graphql/auth";
import { useQuery } from "react-apollo";
import UserComponent from "./User";
import { getUsers } from "../../../src/graphql/types/getUsers";
import { getUsersQuery } from "../../../src/graphql/queries";
import { UserRole } from "../../../src/graphql/graphql-global-types";

const UserList: FunctionComponent = () => {
    const { user: logged } = useContext(ReactAuthContext);

    const allowDelete = userIsInRole(logged, UserRole.SUPERADMIN);

    const { loading, error, data, refetch } = useQuery<getUsers>(getUsersQuery);

    const reload = () => {
        refetch();
    };

    if (loading) {
        return <>
            {
                Array.from(new Array(10)).map((user, index) =>
                    <UserComponent key={index} user={null} allowDelete={allowDelete} />)
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
                <UserComponent key={user.id} user={user} allowDelete={allowDelete} refresh={reload} />)
        }
    </>;
};

export default UserList;
