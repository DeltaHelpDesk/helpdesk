import { FunctionComponent } from "react";
import { Query, useQuery } from "react-apollo";
import { GET_TASKS } from "../TaskList/TaskListQueries";
import Loading from "../Loading/Loading";
import { Grid, Paper, Divider, Typography } from "@material-ui/core";
import TaskCard from "./TaskCard";
import { State, ITask } from "../../src/graphql/types";
import { getUsers } from "../../src/graphql/types/getUsers";
import { getUsersQuery } from "../../src/graphql/queries";

const TaskBoard: FunctionComponent = () => {

    // const { loading, data, error } = useQuery<getUsers>(getUsersQuery);

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
                        <Grid item={true} xs={true} style={{ padding: "2rem" }}>
                            <Paper style={{ background: "#ffffff", padding: "1rem" }}>
                                <div><Typography variant="h6" component="h2">Nezapočaté</Typography></div>
                                <Divider style={{ marginTop: ".5rem", marginBottom: ".5rem" }} />

                                {tasks.map((x) => x.state === State.Unresolved && <TaskCard task={x} key={x.id} />)}
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={true} style={{ padding: "2rem" }}>
                            <Paper style={{ background: "#ffffff", padding: "1rem" }}>
                                <div><Typography variant="h6" component="h2">Započaté</Typography></div>
                                <Divider style={{ marginTop: ".5rem", marginBottom: ".5rem" }} />
                                {tasks.map((x) => x.state === State.Unresolved && <TaskCard task={x} key={x.id} />)}
                            </Paper>
                        </Grid>
                        <Grid item={true} xs={true} style={{ padding: "2rem" }}>
                            <Paper style={{ background: "#ffffff", padding: "1rem" }}>
                                <div><Typography variant="h6" component="h2">Dokončené</Typography></div>
                                <Divider style={{ marginTop: ".5rem", marginBottom: ".5rem" }} />
                                {tasks.map((x) => x.state === State.Solved && <TaskCard task={x} key={x.id} />)}
                            </Paper>
                        </Grid>
                    </Grid>

                </>;
            }}
        </Query>
    );

};

export default TaskBoard;
