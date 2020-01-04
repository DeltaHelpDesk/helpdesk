import { FunctionComponent } from "react";
import { Grid, Button, Paper, Typography, TextField, Divider, Backdrop, CircularProgress, makeStyles, createStyles, Theme } from "@material-ui/core";
import AdminSelect from "../AdminSelect/AdminSelect";
import { getAdmins_admins } from "../../src/graphql/types/getAdmins";
import { useState } from "react";
import { GetHelperText, IsTextfieldError } from "../../utils/TextHelper";
import { useMutation } from "react-apollo";
import { addTask, addTaskVariables } from "../../src/graphql/types/addTask";
import { addTaskMutation } from "../../src/graphql/mutations";
import Router from "next/router";
import getTheme from "../Themes/MainTheme";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            borderRadius: "0px",
        },
        title: {
            fontWeight: "bold",
            textTransform: "uppercase",
            paddingTop: ".5rem",
        },
        mainCard: {
            padding: "2rem",
        },
        mainContentWidth: {
            width: "25rem",
        },
    }));

const NewTaskContainer: FunctionComponent = () => {

    const classes = useStyles(getTheme());

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [selectedAdmin, setSelectedAdmin] = useState<getAdmins_admins>(null);

    const [open, setOpen] = useState<boolean>(false);

    const [sendTicket] = useMutation<addTask>(addTaskMutation);

    const minTitle = 5;
    const maxTitle = 20;

    const minDesc = 5;
    const maxDesc = 120;

    const handleTitleChange = (text: string) => {
        setTitle(text);
    };

    const handleDescChange = (text: string) => {
        setDescription(text);
    };

    const adminSelected = (admin: getAdmins_admins) => {
        setSelectedAdmin(admin);
    };

    const submit = async (): Promise<void> => {
        const titleValid = !IsTextfieldError(title.length, maxTitle, minTitle);
        const descValid = !IsTextfieldError(description.length, maxDesc, minDesc);

        if (!titleValid || !descValid || !selectedAdmin) {
            return null;
        }

        setOpen(true);

        const { id } = selectedAdmin;

        const vars: addTaskVariables = {
            subject: title,
            issue: description,
            assigneeId: id,
        };
        const result = await sendTicket({ variables: vars });

        Router.push("/");
    };

    return <>
        <Backdrop
            open={open}
            style={{ zIndex: 6000 }}
        >
            <CircularProgress color="primary" size={100} />
        </Backdrop>
        <Grid container justify="center" alignItems="center" alignContent="center" style={{ paddingTop: "1.5rem" }}>
            <Grid item xs={12} md={6} >
                <Paper className={classes.mainCard}>
                    <Typography variant="h4" className={classes.title}>
                        Přidat nový ticket
                    </Typography>
                    <Divider />
                    <Grid container spacing={4} direction="column" style={{ marginTop: "1rem " }} >
                        <Grid item>
                            <TextField
                                onChange={(event) => { handleTitleChange(event.currentTarget.value); }}
                                value={title}
                                required
                                fullWidth
                                id="ticket-title"
                                label="Předmět"
                                error={IsTextfieldError(title.length, maxTitle, minTitle)}
                                helperText={GetHelperText(
                                    title.length,
                                    maxTitle,
                                    "Text přesahuje maximální počet povolených znaků",
                                    minTitle,
                                    "Text je příliš krátký")}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                onChange={(event) => { handleDescChange(event.currentTarget.value); }}
                                value={description}
                                id="ticket-description"
                                label="Popis problému"
                                required
                                fullWidth
                                multiline
                                rows="5"
                                variant="outlined"
                                placeholder={`Při přihlášení mi bakaláři napíšou "chyba XYZ", ...`}
                                helperText={GetHelperText(
                                    description.length,
                                    maxDesc,
                                    "Text přesahuje maximální počet povolených znaků",
                                    minDesc,
                                    "Text je příliš krátký")}
                                error={IsTextfieldError(description.length, maxDesc, minDesc)}
                            />
                        </Grid>
                        <Grid item>
                            <AdminSelect
                                title="Řešitel? Řešenec? Řešící?"
                                helperText="Vyberte osobu, která by se měla tímto požadavkem zabývat"
                                onSelected={adminSelected} />
                        </Grid>
                        <Grid item>
                            <Divider style={{ margin: "1rem" }} />
                            <Button
                                variant="contained"
                                fullWidth color="primary"
                                className={classes.button}
                                onClick={() => { submit(); }}>
                                Přidat ticket
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    </>;
};

export default NewTaskContainer;
