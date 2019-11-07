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

const TaskBoard: FunctionComponent = () => {

    // const { loading, data, error } = useQuery<getUsers>(getUsersQuery);

class TaskBoard extends React.Component<{}> {

    const { loading, error, data } = useQuery(tasksBoardQuery);

    if(loading) return Loading;
    if(error) return 'Errrrrrrohr! ${error.message}';

    {data.tasks.map(task => (tasksData.lanes.cards.add(task)))}

    tasksData = {
        lanes: [
            {
                id: 'uncompleted',
                title: 'Nezapočato',
                cards: [
                    { id: 'TaskID', title: 'Write Blog', description: 'Can AI make memes', label: '15/10/2019'},
                    { id: 'TaskID', title: 'Pay Rent', description: 'Transfer via NEFT', label: '15/10/2019'}
                ]
            },
            {
                id: 'inprogress',
                title: 'Pracuje se na tom',
                cards: [
                    { id: 'TaskID', title: 'Buy car', description: 'Can AI make memes', label: '15/10/2019'},
                    { id: 'TaskID', title: 'Rent new house', description: 'Transfer via NEFT', label: '10/10/2019'}
                ]
            },
            {
                id: 'completed',
                title: 'Dokončeno',
                cards: [
                    { id: 'TaskID', title: 'Steal diamond', description: 'Can AI make memes', label: '15/10/1000'},
                    { id: 'TaskID', title: 'Break window', description: 'Transfer via NEFT. Konečně se mi podařilo napsat nějaký text abych otestoval, jestli to umí více řádků', label: '14/05/2001'},
                    { id: 'TaskID', title: 'Kill one person', description: 'Can AI make memes', label: '14/05/1000'},
                    { id: 'TaskID', title: 'Stay alive', description: 'Zůstat živ ale jen tak na oko aby se neřeklo. Nevím co víc sem napsat aby to bylo na více řádků', label: '19/09/20019'},
                    { id: 'TaskID', title: 'Nákup', description: 'Když budou mít mléko, tak jich vzít 5', label: '17/05/2008'},
                    { id: 'TaskID', title: 'Nákup', description: 'Koupit 6 vajec', label: '13/01/2019'},
                ]
            }
        ]
    };


    render() {

        return <>
            
            <Board data={this.tasksData}/>
            
        </>;
    }
}
