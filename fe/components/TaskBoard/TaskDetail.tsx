import * as React from "react";
import { Typography, Box, TextField, Grid, Divider, Fade, makeStyles, Theme, createStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Chip } from "@material-ui/core";
import { getTasks_tasks } from "../../src/graphql/types/getTasks";
import { useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentsContainer from "./CommentsContainer";
import AddCommentComponent from "./AddComment";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import getTheme from "../Themes/MainTheme";
import RoleIcon from "../RoleIcon/RoleIcon";
import DateHelper from "../../utils/dateHelper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

interface IProps {
    task?: getTasks_tasks;
}

const TaskDetail: React.FunctionComponent<IProps> = ({ task }) => {

    const classes = useStyles(getTheme());
    const dateHelper = new DateHelper();

    if (!task) {
        return <>
            <Box height={"10rem"}>
                <Grid container justify="center" alignItems="center" alignContent="center" direction="column">
                    <Grid item>
                        <VisibilityIcon style={{ fontSize: 70 }} />
                    </Grid>
                    <Grid item>
                        <Typography variant="h6">
                            Vyberte task pro zobrazení detailu
                        </Typography>
                    </Grid>
                </Grid>
            </Box>

        </>;
    }

    const { subject, state, issue, id, author, created_at, assignee } = task;
    const { role, fullName } = author;

    return <>
        <Fade in={true}>
            <Grid container direction="column" spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h3">
                        {subject}
                    </Typography>
                    <Divider />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" spacing={2}>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="body1">
                                        Author
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip
                                        avatar={<RoleIcon role={role}
                                            showText={false}
                                            iconStyle={{ marginLeft: "5px" }} />}
                                        label={fullName}
                                        variant="outlined"
                                        size="medium"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="body1">
                                        Created
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip
                                        label={dateHelper.getFormattedDate(created_at, "fromNow")}
                                        variant="outlined"
                                        size="medium"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="body1">
                                        State
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip
                                        label={state}
                                        variant="outlined"
                                        size="medium"
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column">
                                <Grid item>
                                    <Typography variant="body1">
                                        Assignee
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    {assignee && <Chip
                                        avatar={<RoleIcon role={assignee.role}
                                            showText={false}
                                            iconStyle={{ marginLeft: "5px" }} />}
                                        label={assignee.fullName}
                                        variant="outlined"
                                        size="medium"
                                    />}
                                    {!assignee && <Chip
                                        label="None"
                                        variant="outlined"
                                        size="medium"
                                    />}
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-multiline-flexible"
                        label="Popis"
                        multiline
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                        value={issue}
                    />
                </Grid>
                <Grid item xs={12}>
                    <div >
                        <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography >Reakce | řešení</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{ width: "100%" }}>
                                    <CommentsContainer taskId={id} />
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {/* <ExpansionPanel>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2a-content"
                                id="panel2a-header">
                                <Typography>Akce</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{ width: "100%" }}>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel> */}
                    </div>
                </Grid>
            </Grid>
        </Fade>
    </>;
};

export default TaskDetail;
