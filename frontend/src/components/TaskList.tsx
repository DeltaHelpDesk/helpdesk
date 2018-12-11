import * as React from "react";
import Task from "./Task";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import { withStyles } from "@material-ui/core/styles";

export interface ITask {
  id: string;
  issue: string;
}
const GET_TASKS = gql`
  {
    task {
      id
      issue
    }
  }`;

const styles = {
};

function TaskList() {
  return (
    <Query query={GET_TASKS}>
      {({ loading, error, data }) => {
        if (loading) {return "Loading..."};
        if (error) { return `Error! ${error.message}`};

        return (
        data.map((task : ITask) => <Task key={task.id} task={task}/>)
        );
      }}
    </Query>
  );
}

export default withStyles(styles)(TaskList);
