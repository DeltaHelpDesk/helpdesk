import React, { useState } from "react";
import { useSnackbar } from "notistack";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@material-ui/core";
import { useMutation } from "react-apollo";
import { DeleteTask, DeleteTaskVariables } from "../../src/graphql/types/deleteTask";
import { deleteTask } from "../../src/graphql/mutations";
import DeleteForeverOutlinedIcon from "@material-ui/icons/DeleteForeverOutlined";

interface IProps {
    reload?: () => void;
    taskId: string;
    taskSubject: string;
}

const RemoveTask: React.FunctionComponent<IProps> = ({ taskId, reload, taskSubject }) => {
    const [open, setOpen] = useState<boolean>(false);

    const { enqueueSnackbar } = useSnackbar();

    const [removeTask] = useMutation<DeleteTask>(deleteTask);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleChanges = async () => {

        const variables: DeleteTaskVariables = {
            taskId,
        };

        const res = await removeTask({ variables });

        const { errors, data } = res;

        if (errors) {
            console.log(errors);
            enqueueSnackbar(errors[0].message, { variant: "error" });
        }

        if (data.deleteTask) {
            enqueueSnackbar("Task removed");
            if (reload) {
                reload();
            }
        }

        handleClose();
    };

    return <>
        <Button variant="contained" onClick={handleOpen} fullWidth color="secondary">
            <DeleteForeverOutlinedIcon /> Smazat
        </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title">Smazat ticket?</DialogTitle>
            <DialogContent>
                Opravdu si přejete ticket <strong>{taskSubject}</strong> odebrat?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Zrušit
                </Button>
                <Button onClick={handleChanges} color="primary" autoFocus={true} >
                    Potvrdit
                </Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default RemoveTask;
