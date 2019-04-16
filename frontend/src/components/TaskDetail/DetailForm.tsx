import * as React from 'react';
import { Theme, createStyles, WithStyles, withStyles, TextField, Select, MenuItem, Button } from '@material-ui/core';
import { useState } from 'react';
import { Mutation } from 'react-apollo';
import { GET_TASKS } from '../TaskList/TaskListQueries';
import { CHANGE_TASK_STATE } from './TaskDetailQueries';

const styles = (theme: Theme) => createStyles({

})


interface IStylesExampleProps extends WithStyles<typeof styles> {
    name: string
}

enum States {
    UNRESOLVED = 'UNRESOLVED',
    SOLVING = 'SOLVING',
    SOLVED = 'SOLVED',
    RETURNED = 'RETURNED',
}

const DetailForm: React.FC<IStylesExampleProps> = props => {
    const [comment, setComment] = useState<string>()
    const [state, setState] = useState<string>()


    const handleCommentChange = (e: React.FormEvent<HTMLInputElement>) => {
        setComment(e.currentTarget.value)
    }
    const handleSelectedEvent = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setState(e.target.value)
    }
    const handleSubmit = (e: any, callback: (variables: object) => void) => {
        e.preventDefault();
        callback({
            variables: {
                comment: comment,
                state: state,
            }
        });
    }

    return (
        <Mutation mutation={CHANGE_TASK_STATE}>
            {changeTaskState => (
                <form
                    onSubmit={(e: any) => handleSubmit(e, changeTaskState)}
                >
                    <TextField
                        id="filled-adornment-subject"
                        variant="filled"
                        name="comment"
                        label="Comment"
                        type="text"
                        value={comment}
                        required={true}
                        onChange={e => handleCommentChange(e as React.FormEvent<HTMLInputElement>)}
                    />
                    <Select
                        value={state}
                        onChange={e =>
                            handleSelectedEvent(e as React.ChangeEvent<HTMLSelectElement>)
                        }
                        name="assingne"
                    >
                        {Object.keys(States).map(state => {
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


export default withStyles(styles)(DetailForm);