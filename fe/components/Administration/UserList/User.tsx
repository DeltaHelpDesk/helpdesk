import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button } from '@material-ui/core';
import { Mutation } from 'react-apollo';
import { DELETE_USER, GET_USER } from './UserListQueries';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { GET_TASKS } from '../../TaskList/TaskListQueries';
import { IUser } from "../../../src/graphql/types";
import DateFormatComponent from "../../Dates/DateFormatter";


interface IUserComponentProps {
    user: IUser,
    isAdmin: boolean
}

const UserComponent: React.FunctionComponent<IUserComponentProps> = ({ user, isAdmin }) => {



    const { email, fullName, role, created_at, updated_at } = user;

    const DeleteButton: React.FunctionComponent = () => {
        return (
            <Mutation mutation={DELETE_USER} refetchQueries={() => [{ query: GET_USER }, { query: GET_TASKS }]}>
                {(removeUser: any) => (
                    <Button variant="contained" color="secondary" onClick={() => {
                        removeUser({
                            variables: {
                                email
                            }
                        });
                    }}>
                        <DeleteIcon />
                    </Button>
                )}
            </Mutation>
        );
    };


    return (
        <TableRow>
            <TableCell>
                {fullName}
            </TableCell>
            <TableCell>
                {email}
            </TableCell>
            <TableCell>
                {role}
            </TableCell>
            <TableCell>
                <DateFormatComponent date={created_at} relative={false} />
            </TableCell>
            <TableCell>
                <DateFormatComponent date={updated_at} relative={true} />
            </TableCell>
            {isAdmin && <TableCell>
                <Button variant="contained" color="primary">
                    <EditIcon />
                </Button>
                <DeleteButton />
            </TableCell>}
        </TableRow>
    );
}

export default UserComponent;
