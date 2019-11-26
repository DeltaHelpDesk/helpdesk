import * as React from 'react';
import Board from 'react-trello-for-timeline';
import { useMutation } from '@apollo/react-hooks';
//import "../../graphql/auth";
import { checkUserRole, IAuthContextValue, ReactAuthContext, UserRole } from '../../src/graphql/auth';
import Loading from "./../Loading/Loading";
import { GET_TASKS } from "../TaskList/TaskListQueries";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { getTasksQuery } from '../../src/graphql/queries';
import DateFormatComponent from '../Dates/DateFormatter';
import { getTasks } from '../../src/graphql/types/getTasks';
import { State } from '../../src/graphql/graphql-global-types';
import { updateTaskBoardQuery } from '../../src/graphql/mutations';

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
    const { loading, error, data } = useQuery<getTasks>(getTasksQuery);
    const [changeTaskState, { error: errorMutation, data: dataMutation }] = useMutation<
        {changeTaskState : ICard}>(updateTaskBoardQuery);
    
    if (loading)
        return <> <Loading/> </>;

    if (error)
        return <> Error... </>;

    const {tasks} = data;

    let tasksCompleted: Array<ICard> = [];
    tasks.filter(x => x.state === State.SOLVED)
        .map(x => tasksCompleted = [
            ...tasksCompleted, 
            { id: x.id, 
                title: x.subject, 
                description: x.issue, 
                label: DateFormatComponent.getFormattedDate(x.created_at, true), 
                draggable: true }]);
    let tasksSolving: Array<ICard> = [];
    tasks.filter(x => x.state === State.SOLVING)
        .map(x => tasksSolving = [
            ...tasksSolving, 
            { id: x.id, 
                title: x.subject, 
                description: x.issue, 
                label: DateFormatComponent.getFormattedDate(x.created_at, true), 
                draggable: true
            }]);
    let tasksNotStarted: Array<ICard> = [];
    tasks.filter(x => x.state === State.UNRESOLVED)
        .map(x => tasksNotStarted = [
            ...tasksNotStarted, 
            { id: x.id, 
                title: x.subject, 
                description: x.issue, 
                label: DateFormatComponent.getFormattedDate(x.created_at, true), 
                draggable: true
            }]);


    const boardData = {
        lanes: [
            {
                id: "UNRESOLVED",
                title: 'Nezapočato',
                cards: tasksNotStarted,
            },
            {
                id: "SOLVING",
                title: 'Pracuje se na tom',
                cards: tasksSolving
            },
            {
                id: "SOLVED",
                title: 'Dokončeno',
                cards: tasksCompleted
            }
        ]
    };

    const handleCardChange = async (cardId : number, sourceLaneId : string, targetLaneId : string, position: number, cardDetails: any, description: string)=> {
        const res = await changeTaskState({variables:{
            taskId: cardId, 
            comment: "TASK STATE CHANGED", 
            state: targetLaneId
          }});           
    }

    return <>
        <Board data={boardData} editable={true} draggable={true} handleDragEnd={handleCardChange} />
    </>
}

export default TaskBoard;
