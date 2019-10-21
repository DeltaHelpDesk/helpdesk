import * as React from 'react';
import Board from 'react-trello'



class TaskBoard extends React.Component<{}> {

    tasksData = {
        lanes: [
            {
                id: 'uncompleted',
                title: 'Nezapočato',
                label: '2/2',
                cards: [
                    { id: 'Card1', title: 'Write Blog', description: 'Can AI make memes', label: '30 mins', draggable: false },
                    { id: 'Card2', title: 'Pay Rent', description: 'Transfer via NEFT', label: '5 mins', metadata: { sha: 'be312a1' } }
                ]
            },
            {
                id: 'inprogress',
                title: 'Pracuje se na tom',
                label: '0/0',
                cards: []
            },
            {
                id: 'completed',
                title: 'Dokončeno',
                label: '0/0',
                cards: []
            }
        ]
    };


    render() {
        return <>
            <Board data={this.tasksData} />
        </>;
    }
}

export default TaskBoard;