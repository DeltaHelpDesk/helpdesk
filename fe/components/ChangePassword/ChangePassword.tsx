import { FunctionComponent, useState, useRef } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useSnackbar } from "notistack";
import LastPassword from "./LastPassword";
import NewPassword from "./NewPassword";
import NewPasswordAgain from "./NewPasswordAgain";
import PasswordField from "../PasswordField/PasswordField";

interface IProps {
    onEdited?: () => void;
}

const ChangePassword: FunctionComponent<IProps> = ({ onEdited = null }) => {

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const [newPassword, setNewPassword] = useState<string>("");
    const [newPasswordConfirmed, setNewPasswordConfirmed] = useState<string>("");
    const pwdError = useRef<boolean>(false);
    const [newPwdError, setNewPwdError] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();



    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };

    const isPasswordError = (): boolean => {
        if (newPassword === "" || newPasswordConfirmed === "") {
            return true;
        }

        return newPassword !== newPasswordConfirmed;
    };

    const handleChanges = async () => {

        if (isPasswordError()) {
            return;
        }

        handleCloseEdit();
    };

    return <>
        <Button aria-label="edit" onClick={handleOpenEdit}>Změnit heslo</Button>
        <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Změna hesla</DialogTitle>
            <DialogContent>
                <div >
                    <Grid container direction="column">
                        <Grid >
                            {/* {<LastPassword showPassword={false} user={null} />} */}
                            <PasswordField
                                label="Stávající heslo"
                                id="password" />
                        </Grid>
                        <Grid item>
                            <PasswordField
                                label="Nové heslo"
                                onChange={(pwd) => {
                                    setNewPassword(pwd);
                                }}
                                isError={pwdError.current}
                                id="new-password" />
                        </Grid>
                        <Grid item>
                            <PasswordField
                                label="Potvrzení hesla"
                                onChange={(pwd) => {
                                    setNewPasswordConfirmed(pwd);
                                    pwdError.current = isPasswordError();
                                }}
                                isError={pwdError.current}
                                id="new-password-confirmation" />

                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                    Zrušit
                    </Button>
                <Button onClick={handleChanges} color="primary" autoFocus={true} disabled={isPasswordError()} >
                    Uložit
                </Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default ChangePassword;
