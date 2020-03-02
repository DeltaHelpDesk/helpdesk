import { FunctionComponent, useState } from "react";
import { IconButton, Dialog, DialogTitle, DialogContent, Grid, TextField, DialogActions, Button } from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { useSnackbar } from "notistack";
import LastPassword from "./LastPassword";

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
                    <Grid container direction="column">
                        <Grid >
                            {<LastPassword showPassword={false} user={null} />}
                        </Grid>
                        <Grid item>
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
