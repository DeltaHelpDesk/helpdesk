import Typography from "@material-ui/core/Typography";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import {ITask} from "./TaskList";
import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
};

// Prepared for Task component
function Task(props: any) {
  // const { classes } = props;
  const user : ITask = props.user;
  return (
    <Card>
      <CardContent>
        <Typography>
          <h1>
            {user.name}
          </h1>
        </Typography>
      </CardContent>
      <CardContent>
        <Typography>
        {user.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(Task);
