import { FunctionComponent } from "react";
import { Typography, Grid, Button } from "@material-ui/core";
import { getTasks_tasks } from "../../src/graphql/types/getTasks";
import { State } from "../../src/graphql/graphql-global-types";
import { useMutation } from "react-apollo";
import { DeleteTask } from "../../src/graphql/types/deleteTask";
import { deleteTask, updateTaskState } from "../../src/graphql/mutations";
import RemoveTask from "./DeleteTask";
import { UpdateTaskState, UpdateTaskStateVariables } from "../../src/graphql/types/UpdateTaskState";
import { useSnackbar } from "notistack";

interface IProps {
    task: getTasks_tasks;
    reload?: () => void;
}

const TaskActions: FunctionComponent<IProps> = ({ task, reload }) => {
    const { enqueueSnackbar } = useSnackbar();

    let populateText = "";

    const { id, state, assignee, subject } = task;

    const [editState] = useMutation<UpdateTaskState>(updateTaskState);

    switch (state) {
        case State.UNRESOLVED:
            populateText = "Přesunout do Řeší se";
            break;
        case State.SOLVING:
            populateText = "Přesunout do Dokončeno";
            break;
        case State.SOLVED:
            populateText = "Na ticketu se již nepracuje";
            break;
    }

    const changeState = async () => {
        let newState: State;
        if (state == State.SOLVED) {
            return;
        }

        switch (state) {
            case State.UNRESOLVED:
                newState = State.SOLVING;
                break;
            case State.SOLVING:
                newState = State.SOLVING;
                break;
        }

        const variables: UpdateTaskStateVariables = {
            taskId: id,
            state: newState,
        };

        const res = await editState({ variables });

        const { errors, data } = res;

        if (errors) {
            console.log(errors);
            enqueueSnackbar(errors[0].message, { variant: "error" });
        }

        if (!!data.changeTaskState.id) {
            enqueueSnackbar("Ticket updated");
            if (reload) {
                reload();
            }
        }

        if (reload) {
            reload();
        }
    };

    return <>
        <Grid container direction="column" spacing={2}>
            <Grid item>
                <Typography variant="h6">
                    Změnit stav
                </Typography>
                <Typography variant="caption">
                    (Změnit stav můžete také přetažením karty mezi sloupci)
                </Typography>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    disabled={state === State.SOLVED}
                    onClick={changeState}>
                    {populateText}
                </Button>
            </Grid>

            <Grid item>
                <RemoveTask taskId={id} reload={reload} taskSubject={subject} />
            </Grid>
        </Grid>
    </>;
};

export default TaskActions;
