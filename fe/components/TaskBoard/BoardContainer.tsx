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
        <Paper style={{ padding: "2rem" }}>
            <Grid container direction="row" spacing={2}>
                <Grid item xs={6}>
                    <div className="no-select">
                        <TaskBoard showDetail={handleClickTask} />
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <Paper style={{ padding: "2rem" }} id="task-detail-box">
                        <TaskDetail task={task} />
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    </>;
};

export default BoardContainer;
