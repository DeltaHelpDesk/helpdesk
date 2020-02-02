import { useState, FunctionComponent } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button, Typography, Divider } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { getUsers_users } from "../../../src/graphql/types/getUsers";
import { useMutation } from "react-apollo";
import { EditUserAdmin, EditUserAdminVariables } from "../../../src/graphql/types/EditUserAdmin";
import { editUserAdmin } from "../../../src/graphql/mutations";
import { removeUserVariables } from "../../../src/graphql/types/removeUser";
import { useSnackbar } from "notistack";
import RoleSelect from "../../RoleSelect/RoleSelect";
import { UserRole } from "../../../src/graphql/graphql-global-types";
import locKeys from "../../../src/Locales/LocalizationKeys";
import { useTranslation } from "react-i18next";

interface IProps {
    user: getUsers_users;
    onEdited?: () => void;
}

const EditUser: FunctionComponent<IProps> = ({ user, onEdited = null }) => {
    const { email, fullName, role, created_at, updated_at, id } = user;

    const [uEmail, setUEmail] = useState<string>(email);
    const [uFullName, setUFullName] = useState<string>(fullName);
    const [uRole, setURole] = useState<UserRole>(role);

    const [openEdit, setOpenEdit] = useState<boolean>(false);

    const [editU] = useMutation<EditUserAdmin>(editUserAdmin);

    const { enqueueSnackbar } = useSnackbar();

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleChanges = async () => {

        const variables: EditUserAdminVariables = {
            email: uEmail,
            userId: id,
            fullName: uFullName,
            role: uRole,
        };

        const res = await editU({ variables });

        const { errors, data } = res;

        if (errors) {
            console.log(errors);
            enqueueSnackbar(errors[0].message, { variant: "error" });
        }

        if (!!data.adminEditUser.id) {
            enqueueSnackbar("Změny byly uloženy");
            if (onEdited) {
                onEdited();
            }
        }

        handleCloseEdit();
    };

    const { t } = useTranslation();

    return <>
        <IconButton aria-label="edit" onClick={handleOpenEdit}>
            <EditOutlinedIcon />
        </IconButton>
        <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title"> {t(locKeys.users.editUser)} </DialogTitle>
            <DialogContent>
                <div >
                    <Grid container direction="column" spacing={2} >
                        <Grid item>
                            <TextField
                                margin="dense"
                                id="name"
                                label="Jméno"
                                type="text"
                                fullWidth
                                defaultValue={fullName}
                                value={uFullName}
                                onChange={(event) => { setUFullName(event.target.value); }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                type="email"
                                defaultValue={email}
                                fullWidth
                                value={uEmail}
                                onChange={(event) => { setUEmail(event.target.value); }}
                            />
                        </Grid>
                        <Grid item>
                            <RoleSelect
                                currentRole={role}
                                onSelected={(uR) => { setURole(uR); }}
                            />
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                    {t(locKeys.task.cancel)}
                    </Button>
                <Button onClick={handleChanges} color="primary" autoFocus={true} >
                    {t(locKeys.task.save)}
                </Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default EditUser;
