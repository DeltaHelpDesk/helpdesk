import { useState, FunctionComponent } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@material-ui/core";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import { getUsers_users } from "../../../src/graphql/types/getUsers";
import { useMutation } from "react-apollo";
import { removeUser, removeUserVariables } from "../../../src/graphql/types/removeUser";
import { removeUserMutation } from "../../../src/graphql/mutations";
import { useSnackbar } from "notistack";
import { useTranslation } from "react-i18next";
import locKeys from "../../../src/Locales/LocalizationKeys";

interface IProps {
    user: getUsers_users;
    onRemoved?: () => void;
}

const RemoveUser: FunctionComponent<IProps> = ({ user, onRemoved = null }) => {
    const [open, setOpen] = useState<boolean>(false);

    const [remUser] = useMutation<removeUser>(removeUserMutation);

    const { enqueueSnackbar } = useSnackbar();

    const { email, fullName } = user;

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };
    const handleChanges = async () => {

        const variables: removeUserVariables = {
            email,
        };

        const res = await remUser({ variables });

        const { errors, data } = res;

        if (errors) {
            console.log(errors);
            enqueueSnackbar(errors[0].message, { variant: "error" });
        }

        if (data.removeUser) {
            enqueueSnackbar("User removed");
            if (onRemoved) {
                onRemoved();
            }
        }

        handleClose();
    };

    const { t } = useTranslation();
    
    return <>
        <IconButton aria-label="delete" onClick={handleOpen}>
            <DeleteOutlineOutlinedIcon />
        </IconButton>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
            <DialogTitle id="form-dialog-title"> {t(locKeys.users.deleteUser)} </DialogTitle>
            <DialogContent>
                Opravdu si přejete smazat uživatele {fullName}?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    {t(locKeys.task.cancel)}
                    </Button>
                <Button onClick={handleChanges} color="primary" autoFocus={true} >
                    {t(locKeys.task.accept)}
                </Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default RemoveUser;
