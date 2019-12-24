import * as React from "react";
import { Typography } from "@material-ui/core";

interface IProps {
    taskId: string;
}

const TaskActions: React.FunctionComponent<IProps> = ({ taskId }) => {

    return <>
        <Typography variant="body1">
            WIP
        </Typography>
    </>;
};

export default TaskActions;
