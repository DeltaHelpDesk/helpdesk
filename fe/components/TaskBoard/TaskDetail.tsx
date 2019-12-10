import * as React from "react";
import { Typography, Box, TextField, Grid, Divider } from "@material-ui/core";
import { getTasks_tasks } from "../../src/graphql/types/getTasks";

interface IProps {
    task?: getTasks_tasks;
}

const TaskDetail: React.FunctionComponent<IProps> = ({ task }) => {

    if (!task) {
        return <>
            <Typography variant="h3">
                Task neni
            </Typography>
            <Box height={"10rem"}></Box>

        </>;
    }

    const { subject, state, issue } = task;

    return <>
        <Grid container direction="column" spacing={4}>
            <Grid item xs={12}>
                <Typography variant="h3">
                    Detail {subject}
                </Typography>
                <Divider />
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
        </Grid>
    </>;
};

export default TaskDetail;
