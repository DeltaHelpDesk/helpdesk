import * as React from "react";
import { useQuery } from "react-apollo";
import { GetTaskDetail, GetTaskDetailVariables } from "../../src/graphql/types/GetTaskDetail";
import { getTaskDetail, getTaskComments } from "../../src/graphql/queries";
import { GetTaskComments } from "../../src/graphql/types/GetTaskComments";
import TaskComment from "./TaskComment";
import { Grid, Divider } from "@material-ui/core";
import AddCommentComponent from "./AddComment";

interface IProps {
    taskId: string;
}

const CommentsContainer: React.FunctionComponent<IProps> = ({ taskId }) => {

    const vars: GetTaskDetailVariables = { id: taskId };

    const { loading, error, data, refetch } = useQuery<GetTaskComments>(getTaskComments, { variables: vars });

    if (loading) {
        return <>
            {
                Array.from(new Array(5)).map((x) => <><TaskComment /></>)
            }
        </>;
    }

    if (error) {
        return <>
            An error has occured!
        </>;
    }

    const { task } = data;
    const { comments } = task;

    const refresh = () => {
        refetch();
    };

    if (!comments || comments.length < 1) {

        return <>
            <Grid container direction="column">
                Na tento požadavek ještě nikdo nereagoval
                <Grid item xs={12}>
                    <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                    <AddCommentComponent taskId={taskId} onAdd={refresh} />
                </Grid>
            </Grid>
        </>;
    }

    return <>
        <Grid container direction="column" >
            <Grid item xs={12} >
                <Grid container direction="column" >
                    {
                        comments.map((comment) => <Grid item xs={12}>
                            <TaskComment
                                comment={comment}
                                onRemove={refresh} />
                        </Grid>)
                    }
                </Grid>
            </Grid>

            <Grid item xs={12} >
                <Divider style={{ marginTop: "1rem", marginBottom: "1rem" }} />
                <AddCommentComponent taskId={taskId} onAdd={refresh} />
            </Grid>
        </Grid>
    </>;
};

export default CommentsContainer;
