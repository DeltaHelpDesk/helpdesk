import * as React from 'react';
import Layout from '../components/Layouts/Layout';
import TaskBoard from '../components/TaskBoard/TaskBoard';
import { withAuthSync } from '../src/graphql/auth';
import HeadComponent from '../components/Layouts/HeadComponent';

interface IProps {

}

class Board extends React.Component<IProps> {

    render() {
        return <>
                <Layout title={'Board'}>
                    <TaskBoard />
                </Layout>
        </>;
    }
}

export default withAuthSync(Board);
