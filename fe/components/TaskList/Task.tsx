import { FunctionComponent } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableRow, TableCell, Button, Icon } from "@material-ui/core";
import { Mutation } from "react-apollo";
import { DELETE_TASK, GET_TASKS } from "./TaskListQueries";
import DeleteIcon from "@material-ui/icons/Delete";
import { NavLink } from "react-router-dom";
import { ITask } from "../../src/graphql/types";
const styles = {

};

interface ITaskProps {
    task: ITask;
    isAdmin: boolean;
}

// Prepared for Task component
const Task: FunctionComponent<ITaskProps> = ({ task, isAdmin }) => {

    const taskId = task.id;
    const DeleteButton = () => {
        return (
            <Mutation mutation={DELETE_TASK} refetchQueries={() => [{ query: GET_TASKS }]}>
                {(deleteTask: any) => (
                    <Button variant="contained" color="secondary" onClick={() => {
                        deleteTask({
                            variables: {
                                taskId,
                            },
                        });
                    }}>
                        <DeleteIcon />
                    </Button>
                )}
            </Mutation>
        );
    };
    const DetailButton = () => {
        const path = "/task/" + task.id;
        return (
            <NavLink to={path}>
                <Button variant="contained" color="primary">
                    <Icon>edit_icon</Icon>
                </Button>
            </NavLink>
        );
    };

    const LetterButton = () => {
        const path = "/task/" + task.id;
        return (
            <NavLink to={path}>
                <Button variant="contained" color="primary">
                    <Icon>mail-outline</Icon>
                </Button>
            </NavLink>
        );
    };

    return (
        <TableRow >
            <TableCell>
                {task.author.fullName}
            </TableCell>
            <TableCell>
                {task.subject}
            </TableCell>
            <TableCell>
                {task.assignee ? task.assignee.fullName : "Nepřiřazeno"}
            </TableCell>
            <TableCell>
                {task.state}
            </TableCell>

            {(isAdmin) ?
                <TableCell>
                    <DeleteButton />
                    <DetailButton />
                </TableCell>
                :
                <TableCell>
                    <LetterButton />
                </TableCell>
            }
        </TableRow>
    );
};

export default Task;
