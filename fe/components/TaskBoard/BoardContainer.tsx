import { FunctionComponent } from "react";
import { Grid, Paper, useMediaQuery, makeStyles, createStyles, Theme } from "@material-ui/core";
import TaskBoard from "./TaskBoard";
import TaskDetail from "./TaskDetail";
import { useState } from "react";
import { getTasks_tasks } from "../../src/graphql/types/getTasks";
import getTheme from "../Themes/MainTheme";

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

    const theme = getTheme();
    const classes = useStyles(getTheme());

    const smallDisplay = useMediaQuery(theme.breakpoints.down("md"));

    const detail = smallDisplay ? 12 : 5;
    const tasks = smallDisplay ? 12 : 7;

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

    return <>
        <Grid container direction={smallDisplay ? "column-reverse" : "row"} spacing={2}>
            <Grid item xs={tasks}>
                <Paper className={classes.cards}>
                    <Grid container justify="center">
                        <Grid item style={{ width: "100%"}}>
                            <TaskBoard showDetail={handleClickTask} taskId={taskId} />
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>
            <Grid item xs={detail}>
                <Paper className={classes.detail} id="task-detail-box">
                    <TaskDetail task={task} />
                </Paper>
            </Grid>
        </Grid>
    </>;
};

export default BoardContainer;
