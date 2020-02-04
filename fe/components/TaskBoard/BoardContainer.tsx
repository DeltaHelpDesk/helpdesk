import { FunctionComponent } from "react";
import { Grid, Paper, useMediaQuery, makeStyles, createStyles, Theme } from "@material-ui/core";
import TaskBoard from "./TaskBoard";
import TaskDetail from "./TaskDetail";
import { useState } from "react";
import { getTasks_tasks, getTasks } from "../../src/graphql/types/getTasks";
import getTheme from "../Themes/MainTheme";
import { useQuery } from "react-apollo";
import { getTasksQuery } from "../../src/graphql/queries";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        cards: {
            paddingTop: "2rem",
            paddingBottom: "2rem",
        },
        detail: {
            padding: "2rem",
        },
    }));

interface IProps {
    taskId?: string;
}

const BoardContainer: FunctionComponent<IProps> = ({ taskId }) => {

    const [task, setTask] = useState<getTasks_tasks>(null);

    const tasksQuery = useQuery<getTasks>(getTasksQuery);
    const { refetch } = tasksQuery;

    const theme = getTheme();
    const classes = useStyles(getTheme());

    const smallDisplay = useMediaQuery(theme.breakpoints.down("md"));

    const xs = smallDisplay ? 12 : 6;

    const handleScroll = () => {
        const anchor = (document).querySelector(
            "#task-detail-box",
        );

        if (anchor) {
            anchor.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    };

    const handleClickTask = (clicked: getTasks_tasks) => {
        setTask(clicked);
        handleScroll();
    };

    const reload = () => {
        refetch();
    };

    return <>
        <Grid container direction={smallDisplay ? "column-reverse" : "row"} spacing={2}>
            <Grid item xs={xs}>
                <Paper className={classes.cards}>
                    <Grid container justify="center">
                        <Grid item>
                            <TaskBoard showDetail={handleClickTask} taskId={taskId} dataQuery={tasksQuery} />
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>
            <Grid item xs={xs}>
                <Paper className={classes.detail} id="task-detail-box">
                    <TaskDetail task={task} reload={reload} />
                </Paper>
            </Grid>
        </Grid>
    </>;
};

export default BoardContainer;
