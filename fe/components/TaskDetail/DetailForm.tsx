import * as React from 'react';
import { TextField, Select, MenuItem, Button } from '@material-ui/core';
import { useState } from 'react';
import { TASK_DETAIL } from './TaskDetailQueries';
import { CHANGE_TASK_STATE } from './TaskDetailQueries';
import { Mutation } from "react-apollo";
import { State } from '../../src/graphql/types';

interface IProps {
    taskId: string,
    taskState: string
}



const DetailForm: React.FC<IProps> = props => {
    const [taskComment, setComment] = useState<string>()
    const [taskState, setState] = useState<string>(props.taskState)


    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComment(e.currentTarget.value)
    }
    const handleSelectedEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value)
    }
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>, callback: (variables: object) => void) => {
        e.preventDefault();
        callback({
            variables: {
                comment: taskComment,
                state: taskState,
                taskId: props.taskId
            }
        });
    }

    return (
        <Mutation mutation={CHANGE_TASK_STATE} refetchQueries={() => [{ query: TASK_DETAIL, variables: { id: props.taskId } }]}>
            {(changeTaskState: any) => (
                <form
                    onSubmit={(e) => handleSubmit(e, changeTaskState)}
                >
                    <TextField
                        id="filled-adornment-subject"
                        variant="filled"
                        name="comment"
                        label="Comment"
                        type="text"
                        value={taskComment || ""}
                        required={false}
                        onChange={e => handleCommentChange(e as React.ChangeEvent<HTMLInputElement>)}
                    />
                    <Select
                        value={taskState}
                        onChange={e =>
                            handleSelectedEvent(e as React.ChangeEvent<HTMLSelectElement>)
                        }
                        name="assingne"
                    >
                        {Object.keys(State).map(state => {
                            return (
                                <MenuItem key={state} value={state}>
                                    {state}
                                </MenuItem>
                            );
                        })}
                    </Select>
                    <Button variant="contained" type="submit">
                        Upravit
                    </Button>
                </form>
            )}
        </Mutation>
    )
}


export default DetailForm;