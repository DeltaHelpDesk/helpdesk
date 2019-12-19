import * as React from "react";
import { Card } from "@material-ui/core";
import { GetTaskComments_task_comments } from "../../src/graphql/types/GetTaskComments";
import Skeleton from "@material-ui/lab/Skeleton";

interface IProps {
    comment?: GetTaskComments_task_comments;
}

const TaskComment: React.FunctionComponent<IProps> = ({ comment = null }) => {

    if (!comment) {
        return <>
            <Card>
                <Skeleton variant="text" />
            </Card>
        </>;
    }

    const { author, created_at, updated_at, message } = comment;

    return <>
        <Card style={{ padding: "1rem" }}>
            Aaa
        </Card>
    </>;


};

export default TaskComment;
