import { FunctionComponent } from "react";
import { Typography } from "@material-ui/core";

interface IProps {
    taskId: string;
}

const TaskActions: FunctionComponent<IProps> = ({ taskId }) => {

    return <>
        <Typography variant="body1">
            WIP
        </Typography>
    </>;
};

export default TaskActions;
