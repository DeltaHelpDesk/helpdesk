import * as React from "react";
import { Card, Grid, Avatar, Chip, Divider, Typography } from "@material-ui/core";
import { GetTaskComments_task_comments } from "../../src/graphql/types/GetTaskComments";
import Skeleton from "@material-ui/lab/Skeleton";
import { GetFirstLetters } from "../../utils/TextHelper";
import RoleIcon from "../RoleIcon/RoleIcon";
import DateHelper from "../../utils/dateHelper";

interface IProps {
    comment?: GetTaskComments_task_comments;
}

const TaskComment: React.FunctionComponent<IProps> = ({ comment = null }) => {

    const dateHelper = new DateHelper();

    if (!comment) {
        return <>
            <Card>
                <Skeleton variant="text" />
            </Card>
        </>;
    }

    const { author, created_at, updated_at, message } = comment;
    const { fullName, role } = author;

    return <>
        <Card style={{ padding: "1rem" }}>
            <Grid container direction="row" spacing={4} alignItems="center">
                <Grid item>
                    <Grid container direction="row" spacing={1}>
                        <Grid item>
                            <Grid container direction="column" alignContent="center"
                                justify="center" alignItems="center" spacing={1}>
                                <Grid item>
                                    <Chip
                                        avatar={<RoleIcon role={role} showText={false} iconStyle={{ marginLeft: "5px" }} />}
                                        label={fullName}
                                        variant="outlined"
                                        size="medium"
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography variant="caption">
                                        {dateHelper.getFormattedDate(updated_at, "fromNow")}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Divider orientation="vertical" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="body2">
                        {message}
                    </Typography>
                </Grid>
            </Grid>
        </Card>
        <Divider style={{ margin: "1rem" }} />
    </>;


};

export default TaskComment;
