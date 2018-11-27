import * as React from "react";
import Task from "./Task";

import { withStyles } from "@material-ui/core/styles";

export interface IUser {
  name: string;
  description: string;
}

const styles = {
};

function TaskList(props: any) {
  // const { classes } = props;
  const users : IUser[] = [{name: "Havelis", description: "Neni to Asus"}, {name: "Lorem", description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec vitae arcu. Cras pede libero, dapibus nec, pretium sit amet, tempor quis. Vivamus luctus egestas leo. Etiam ligula pede, sagittis quis, interdum ultricies, scelerisque eu. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos hymenaeos. Duis sapien nunc, commodo et, interdum suscipit, sollicitudin et, dolor."}, {name: "name", description: "description"}]
  const tasks = users.map((user : IUser) => <Task key="Task" name={user.name} description={user.description}/>);
  return (
    <div>{tasks}</div>
  );
}

export default withStyles(styles)(TaskList);
