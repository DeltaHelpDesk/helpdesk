import * as React from "react";
import { Typography, Box, TextField, Grid, Divider, Fade } from "@material-ui/core";
import { getTasks_tasks } from "../../src/graphql/types/getTasks";
import { useEffect } from "react";
import VisibilityIcon from "@material-ui/icons/Visibility";

interface IProps {
    task?: getTasks_tasks;
}

const TaskDetail: React.FunctionComponent<IProps> = ({ task }) => {

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

    const { subject, state, issue } = task;

    return <>
        <Fade in={true}>
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
        </Fade>
    </>;
};

export default TaskDetail;
