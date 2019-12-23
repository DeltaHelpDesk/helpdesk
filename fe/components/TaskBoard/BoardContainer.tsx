import * as React from "react";
import { Grid, Paper } from "@material-ui/core";
import TaskBoard from "./TaskBoard";
import TaskDetail from "./TaskDetail";
import { useState } from "react";
import { getTasks_tasks } from "../../src/graphql/types/getTasks";

const BoardContainer: React.FunctionComponent<{}> = () => {

    const [task, setTask] = useState<getTasks_tasks>(null);

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
        <Grid container direction="row" spacing={2}>
            <Grid item xs={6}>
                <Paper style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
                    <Grid container justify="center">
                        <Grid item>
                            <TaskBoard showDetail={handleClickTask} />
                        </Grid>
                    </Grid>

                </Paper>
            </Grid>
            <Grid item xs={6}>
                <Paper style={{ padding: "2rem" }} id="task-detail-box">
                    <TaskDetail task={task} />
                </Paper>
            </Grid>
        </Grid>
    </>;
};

export default BoardContainer;
