import * as React from 'react';
import Board from 'react-trello-for-timeline';
import { Query } from "react-apollo";
//import "../../graphql/auth";
import { checkUserRole, IAuthContextValue, ReactAuthContext, UserRole } from '../../src/graphql/auth';
import Loading from "./../Loading/Loading";
import { GET_TASKS } from "../TaskList/TaskListQueries";
import { ITask, State } from '../../src/graphql/types';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { tasksBoardQuery } from '../../src/graphql/queries';
import DateFormatComponent from '../Dates/DateFormatter';

// type Asignee = {
//     id: number;
//     fullName: string;
// }

// type Author = {
//     id: number;
//     fullName: string;
// }


// interface Task {
//     id: number;
//     subject: string;
//     issue: string;
//     created_at: Date;
//     state: string;
//     asignee: Asignee;
//     author: Author;
// }

// interface TasksData {
//     tasks: Task[];
// }

// function Taskyhehe() {
//     const { data } = useQuery<TasksData>(tasksBoardQuery);

//     const boardData = {
//         lanes: [
//             {
//                 id: 'uncompleted',
//                 title: 'Nezapočato',
//                 cards: data.tasks
//             },
//             {
//                 id: 'inprogress',
//                 title: 'Pracuje se na tom',
//                 cards: data.tasks
//             },
//             {
//                 id: 'completed',
//                 title: 'Dokončeno',
//                 cards: data.tasks
//             }
//         ]
//     };

//     return (
//         boardData
//     );
// }

interface ICard {
    id: string,
    title: string,
    description: string,
    label?: string,
    draggable?: boolean,
    metadata?: {}
}

interface IProps {

}

const TaskBoard: React.FunctionComponent<IProps> = () => {
    const { loading, error, data } = useQuery(tasksBoardQuery);

    if (loading)
        return <> <Loading/> </>;

    if (error)
        return <> Error... </>;

    const tasks: Array<ITask> = data.tasks;

    let tasksCompleted: Array<ICard> = [];
    tasks.filter(x => x.state === State.Solved)
        .map(x => tasksCompleted = [
            ...tasksCompleted, 
            { id: x.id, 
                title: x.subject, 
                description: x.issue, 
                label: DateFormatComponent.getFormattedDate(x.created_at, true), 
                draggable: true }]);
    let tasksSolving: Array<ICard> = [];
    tasks.filter(x => x.state === State.Solving)
        .map(x => tasksCompleted = [
            ...tasksCompleted, 
            { id: x.id, 
                title: x.subject, 
                description: x.issue, 
                label: DateFormatComponent.getFormattedDate(x.created_at, true), 
                draggable: true
            }]);
    let tasksNotStarted: Array<ICard> = [];
    tasks.filter(x => x.state === State.Unresolved)
        .map(x => tasksCompleted = [
            ...tasksCompleted, 
            { id: x.id, 
                title: x.subject, 
                description: x.issue, 
                label: DateFormatComponent.getFormattedDate(x.created_at, true), 
                draggable: true
            }]);


    const boardData = {
        lanes: [
            {
                id: "uncompleted",
                title: 'Nezapočato',
                cards: tasksNotStarted,
            },
            {
                id: "inprogress",
                title: 'Pracuje se na tom',
                cards: tasksSolving
            },
            {
                id: "completed",
                title: 'Dokončeno',
                cards: tasksCompleted
            }
        ]
    };

    const handleCardChange = (cardId : number, sourceLaneId : string, targetLaneId : string, position: number, cardDetails: any) => {
        console.log(sourceLaneId)
    }

    return <>
        <Board data={boardData} editable={true} draggable={true} handleDragEnd={handleCardChange} />
    </>
}
