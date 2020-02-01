import { FunctionComponent } from "react";
import { useQuery } from "react-apollo";
import { GetTaskDetail, GetTaskDetailVariables } from "../../src/graphql/types/GetTaskDetail";
import { getTaskDetail, getTaskComments } from "../../src/graphql/queries";
import { GetTaskComments } from "../../src/graphql/types/GetTaskComments";
import TaskComment from "./TaskComment";
import { Grid, Divider } from "@material-ui/core";
import AddCommentComponent from "./AddComment";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

interface IProps {
    taskId: string;
}

const CommentsContainer: FunctionComponent<IProps> = ({ taskId }) => {

    const vars: GetTaskDetailVariables = { id: taskId };

    const { t } = useTranslation();

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
            {t(locKeys.error.undefinedError)}
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
                {t(locKeys.common.noResponse)}
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
                        comments.map((comment, index) => <Grid item xs={12} key={index} >
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
