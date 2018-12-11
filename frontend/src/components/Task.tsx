import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {ITask} from "./TaskList";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
};

// Prepared for Task component
function Task(props: {task:ITask}) {
  // const { classes } = props;
  const task: ITask = props.task;
  return (
    <Card>
      <CardContent>
        <Typography>
          <h1>
            Titulek
          </h1>
        </Typography>
      </CardContent>
      <CardContent>
        <Typography>
        {task.issue}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Task);
