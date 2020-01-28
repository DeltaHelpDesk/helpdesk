import { FunctionComponent, useState, useContext } from "react";
import { Typography, Box, TextField, Grid, Divider, Fade, makeStyles, Theme, createStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Chip } from "@material-ui/core";
import { getTasks_tasks } from "../../src/graphql/types/getTasks";
import VisibilityIcon from "@material-ui/icons/Visibility";
import CommentsContainer from "./CommentsContainer";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import getTheme from "../Themes/MainTheme";
import RoleIcon from "../RoleIcon/RoleIcon";
import DateHelper from "../../utils/dateHelper";
import TaskActions from "./TaskActions";
import { ReactAuthContext, userIsAdmin } from "../../src/graphql/auth";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
        panel: {
            backgroundColor: "#1f1f1f",
        },
    }),
);

interface IProps {
    task?: getTasks_tasks;
}

const TaskDetail: FunctionComponent<IProps> = ({ task }) => {
    const [expanded, setExpanded] = useState<string | false>(false);
    const { user } = useContext(ReactAuthContext);

    const { t } = useTranslation();

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

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
                            {t(locKeys.task.selectTask)}
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
                    <Grid container direction="row" spacing={2} justify="space-around">
                        <Grid item>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item >
                                    <Typography variant="body1">
                                        {t(locKeys.task.author)}
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
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        {t(locKeys.task.createdAt)}
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
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        {t(locKeys.task.state)}
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
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        {t(locKeys.task.asignee)}
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
                        <Grid item>
                            <Divider orientation="vertical" />
                        </Grid>
                        <Grid item >
                            <Grid container direction="column" justify="center" alignItems="center">
                                <Grid item>
                                    <Typography variant="body1">
                                        #
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Chip

                                        label={id}
                                        variant="outlined"
                                        size="medium"
                                    />

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="standard-multiline-flexible"
                        label={t(locKeys.common.description)}
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
                        <ExpansionPanel
                            className={classes.panel}
                            expanded={expanded === "panel1"}
                            onChange={handleChange("panel1")}>
                            <ExpansionPanelSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header">
                                <Typography>{t(locKeys.common.comments)}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div style={{ width: "100%" }}>
                                    <CommentsContainer taskId={id} />
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                        {(userIsAdmin(user)) ?
                            <ExpansionPanel
                                className={classes.panel}
                                expanded={expanded === "panel2"}
                                onChange={handleChange("panel2")}>
                                <ExpansionPanelSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel2a-content"
                                    id="panel2a-header">
                                    <Typography>Akce</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div style={{ width: "100%" }}>
                                        <TaskActions taskId={id} />
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                            : <></>
                        }
                    </div>
                </Grid>
            </Grid>
        </Fade>
    </>;
};

export default TaskDetail;
