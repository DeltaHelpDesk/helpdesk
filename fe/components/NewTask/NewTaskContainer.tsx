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
import { useSnackbar } from "notistack";
import customRoutes from "../../src/Routes";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

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
    const { enqueueSnackbar } = useSnackbar();

    const [sendTicket] = useMutation<addTask>(addTaskMutation);

    const { t } = useTranslation();

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
        const titleValid = !IsTextfieldError(title.trim().length, maxTitle, minTitle);
        const descValid = !IsTextfieldError(description.trim().length, maxDesc, minDesc);

        if (!titleValid || !descValid || !selectedAdmin) {
            return null;
        }

        setOpen(true);

        const { id: authorId } = selectedAdmin;

        const vars: addTaskVariables = {
            subject: title,
            issue: description,
            assigneeId: authorId,
        };
        const { data: { addTask: { id: taskId } }, errors } = await sendTicket({ variables: vars });

        if (errors) {
            console.log(errors);
            enqueueSnackbar(errors[0].message, { variant: "error" });
            return;
        }

        enqueueSnackbar(`${t(locKeys.task.success)}`, { variant: "success" });
        window.location.replace(customRoutes.administration + "?taskId=" + taskId);
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
                        {t(locKeys.task.addNewTicket)}
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
                                label={t(locKeys.common.subject)}
                                error={IsTextfieldError(title.length, maxTitle, minTitle)}
                                helperText={GetHelperText(
                                    title.length,
                                    maxTitle,
                                    `${t(locKeys.error.msgTooLong)}`,
                                    minTitle,
                                    `${t(locKeys.error.msgTooShort)}`)}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                                onChange={(event) => { handleDescChange(event.currentTarget.value); }}
                                value={description}
                                id="ticket-description"
                                label={t(locKeys.common.issueDescription)}
                                required
                                fullWidth
                                multiline
                                rows="5"
                                variant="outlined"
                                placeholder={t(locKeys.common.issuePlaceholder)}
                                helperText={GetHelperText(
                                    description.length,
                                    maxDesc,
                                    `${t(locKeys.error.msgTooLong)}`,
                                    minDesc,
                                    `${t(locKeys.error.msgTooShort)}`)}
                                error={IsTextfieldError(description.length, maxDesc, minDesc)}
                            />
                        </Grid>
                        <Grid item>
                            <AdminSelect
                                title={t(locKeys.common.asigneeTitle)}
                                helperText={t(locKeys.common.selectAsignee)}
                                onSelected={adminSelected} />
                        </Grid>
                        <Grid item>
                            <Divider style={{ margin: "1rem" }} />
                            <Button
                                variant="contained"
                                fullWidth color="primary"
                                className={classes.button}
                                onClick={() => { submit(); }}>
                                {t(locKeys.task.addTicket)}
                            </Button>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

    </>;
};

export default NewTaskContainer;
