import * as React from 'react';
import Layout from '../components/Layouts/Layout';
import TaskBoard from '../components/TaskBoard/TaskBoard';

interface IProps {

}

class Board extends React.Component<IProps> {

    render() {
        return <>
            <Layout title={'Board'}>
                <div className={"no-select"}>
                    <TaskBoard />
                </div>
            </Layout>
        </>;
    }
}


export default Board;