import { FunctionComponent, useState } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useSnackbar } from "notistack";

interface IProps {
    onEdited?: () => void;
}

const ChangePassword: FunctionComponent<IProps> = ({ onEdited = null }) => {

    const [openEdit, setOpenEdit] = useState<boolean>(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };
    const handleOpenEdit = () => {
        setOpenEdit(true);
    };
    const handleChanges = async () => {

        // const { errors, data } = res;

        // if (errors) {
        //     console.log(errors);
        //     enqueueSnackbar(errors[0].message, { variant: "error" });
        // }

        // if (!!data.adminEditUser.id) {
        //     enqueueSnackbar("Změny byly uloženy");
        //     if (onEdited) {
        //         onEdited();
        //     }
        // }

        handleCloseEdit();
    };
    return <>
        <Button aria-label="edit" onClick={handleOpenEdit}>Změnit heslo</Button>
        <Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Změna hesla</DialogTitle>
            <DialogContent>
                <div >
                    <Grid container direction="column" spacing={2} >
                        <Grid item>
                            {/* <TextField
                                margin="dense"
                                id="name"
                                label="Jméno"
                                type="text"
                                fullWidth
                                defaultValue={fullName}
                                value={uFullName}
                                onChange={(event) => { setUFullName(event.target.value); }}
                            /> */}
                        </Grid>
                        <Grid item>
                            {/* <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                type="email"
                                defaultValue={email}
                                fullWidth
                                value={uEmail}
                                onChange={(event) => { setUEmail(event.target.value); }}
                            /> */}
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseEdit} color="primary">
                    Zrušit
                    </Button>
                <Button onClick={handleChanges} color="primary" autoFocus={true} >
                    Uložit
                </Button>
            </DialogActions>
        </Dialog>
    </>;
};

export default ChangePassword;
