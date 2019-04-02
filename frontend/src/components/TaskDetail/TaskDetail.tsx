import * as React from "react";
import { Query } from "react-apollo";
import { withStyles } from "@material-ui/core/styles";
import "../../graphql/auth";
import { ReactAuthContext, checkUserRole, UserRole, IAuthContextValue } from '../../graphql/auth';
import { TASK_DETAIL } from './TaskDetailQueries';
import { RouteComponentProps } from 'react-router';
import { ILog } from './Log';

const styles = {};
class TaskList extends React.Component<RouteComponentProps<{id: string}>> {
    static contextType = ReactAuthContext;
    context : IAuthContextValue;
    render() {
    
    const { id } = this.props.match.params;
    return (
      <Query query={TASK_DETAIL} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          }
          if (error) {
            return `Error! ${error.message}`;
          }
          const isAdmin = (this.context.user === undefined ? false : checkUserRole(this.context.user.role, UserRole.ADMIN));
          const isOwner = (this.context.user === undefined ? false : this.context.user.id === data.task.author.id);
          const isAuthorized = isAdmin || isOwner;
          const { task } = data;
          // const tableBody = tasks.map((task: ITask) => <Task key={task.id} task={task} isAdmin={isAdmin} />);
          return (
            <div>
                <h2>{task.subject}</h2>
                <div>assignee: {task.assignee.fullName}</div>
                <div>author: {task.author.fullName}</div>
                <div>state: {task.state}</div>
                <div>created at: {task.created_at}</div>
                {isAuthorized && 
                    <div>issue: {task.issue}</div>
                }

                {isAuthorized &&
                    task.logs.map((log: ILog) => {
                        return (
                            <div key={log.id}>
                            <span>
                                {log.author.fullName}
                            </span>
                            <span>
                                {log.comment}
                            </span>
                            <span>
                                {log.created_at}
                            </span>
                            <span>
                                {log.assignee.fullName}
                            </span>
                            <span>
                                {log.state}
                            </span>
                            </div>
                        )
                    })                  
                }
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(TaskList);
