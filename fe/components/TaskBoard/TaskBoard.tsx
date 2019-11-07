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

type Asignee = {
    id: number;
    fullName: string;
}

type Author = {
    id: number;
    fullName: string;
}

interface Task {
    id: number;
    subject: string;
    issue: string;
    created_at: Date;
    state: string;
    asignee: Asignee;
    author: Author;
}

interface TasksData {
    tasks: Task[];
}

function Taskyhehe(){
    const{ data } = useQuery<TasksData>(tasksBoardQuery);

    const boardData = {
        lanes: [
            {
                id: 'uncompleted',
                title: 'Nezapočato',
                cards: data.tasks
            },
            {
                id: 'inprogress',
                title: 'Pracuje se na tom',
                cards: data.tasks
            },
            {
                id: 'completed',
                title: 'Dokončeno',
                cards: data.tasks
            }
        ]
    };

    return (

    )
}

class TaskBoard extends React.Component<{}> {
    
}
