import * as React from 'react';
import Board from 'react-trello-for-timeline';
import { Query } from "react-apollo";
//import "../../graphql/auth";
import { checkUserRole, IAuthContextValue, ReactAuthContext, UserRole } from '../../src/graphql/auth';
import Loading from "./../Loading/Loading";
import { GET_TASKS } from "../TaskList/TaskListQueries";
import { ITask } from '../../src/graphql/types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { tasksBoardQuery } from '../../src/graphql/queries';

const Tasks = ({onTaskSelected}) => (
    <Query query={tasksBoardQuery}>
        {({ loading, error, data }) => {
            if(loading) return Loading;
            if(error) return 'Erohr! ${error.message}';

            return (
                <select name="task" onChange={onTaskSelected}>
                    {data.tasks.map(task => (
                        <option key={task.id} value={task.subject}>
                            {task.issue}
                        </option>
                    ))}
                </select>
            );
        }}
    </Query>
);

class TaskBoard extends React.Component<{}> {
    tasksData = {
        lanes: [
            {
                id: 'uncompleted',
                title: 'Nezapočato',
                cards: [Tasks]
            },
            {
                id: 'inprogress',
                title: 'Pracuje se na tom',
                cards: [Tasks]
            },
            {
                id: 'completed',
                title: 'Dokončeno',
                cards: [Tasks]
            }
        ]
    };


    render() {

        return <>
            
            <Board data={this.tasksData}/>
            
        </>;
    }
}
