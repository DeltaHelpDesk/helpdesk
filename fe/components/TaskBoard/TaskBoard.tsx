import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_TASKS } from '../TaskList/TaskListQueries';
import Loading from '../Loading/Loading';
import { Grid, Paper, Divider, Typography } from '@material-ui/core';
import TaskCard from './TaskCard';
import { ITask, State } from '../../src/graphql/types';



class TaskBoard extends React.Component<{}> {


    render() {
        return (
            <Query query={GET_TASKS}>
                {({ loading, error, data }: any) => {
                    if (loading) {
                        return <Loading />;
                    }
                    if (error) {
                        return <>Error! ${error.message}</>;
                    }
                    const tasks: ITask[] = data.tasks;

                    return <>
                        <Grid container={true}>
                            <Grid item={true} xs={true} style={{ padding: '2rem' }}>
                                <Paper style={{ background: '#ffffff', padding: '1rem' }}>
                                    <div><Typography variant="h6" component="h2">Nezapočaté</Typography></div>
                                    <Divider style={{ marginTop: '.5rem', marginBottom: '.5rem' }} />

                                    {tasks.map(x => x.state === State.Unresolved && <TaskCard task={x} key={x.id} />)}
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={true} style={{ padding: '2rem' }}>
                                <Paper style={{ background: '#ffffff', padding: '1rem' }}>
                                    <div><Typography variant="h6" component="h2">Započaté</Typography></div>
                                    <Divider style={{ marginTop: '.5rem', marginBottom: '.5rem' }} />
                                    {tasks.map(x => x.state === State.Unresolved && <TaskCard task={x} key={x.id} />)}
                                </Paper>
                            </Grid>
                            <Grid item={true} xs={true} style={{ padding: '2rem' }}>
                                <Paper style={{ background: '#ffffff', padding: '1rem' }}>
                                    <div><Typography variant="h6" component="h2">Dokončené</Typography></div>
                                    <Divider style={{ marginTop: '.5rem', marginBottom: '.5rem' }} />
                                    {tasks.map(x => x.state === State.Solved && <TaskCard task={x} key={x.id} />)}
                                </Paper>
                            </Grid>
                        </Grid>

                    </>;
                }}
            </Query>
        );
    }
}

export default TaskBoard;