import Board from "react-trello-for-timeline";
import { useMutation } from "@apollo/react-hooks";
import Loading from "./../Loading/Loading";
import { useQuery } from "@apollo/react-hooks";
import { getTasksQuery } from "../../src/graphql/queries";
import { getFormattedDate } from "../Dates/DateFormatter";
import { getTasks, getTasks_tasks } from "../../src/graphql/types/getTasks";
import { State } from "../../src/graphql/graphql-global-types";
import { updateTaskBoardQuery } from "../../src/graphql/mutations";
import { FunctionComponent, useState } from "react";
import { Typography, Grid, Divider, Paper, Tooltip } from "@material-ui/core";

interface ICard {
    id: string;
    title: string;
    description: string;
    label?: string;
    draggable?: boolean;
    metadata?: {};
    selected?: boolean;
    state?: State;
    onClick?: (id: string) => void;
}

// tslint:disable-next-line: no-empty-interface
interface IProps {
    showDetail?: (task: getTasks_tasks) => void;
}

const TaskBoard: FunctionComponent<IProps> = ({ showDetail }) => {
    const { loading, error, data } = useQuery<getTasks>(getTasksQuery);
    const [changeTaskState] = useMutation<
        { changeTaskState: ICard }>(updateTaskBoardQuery);

    const [selectedId, setSelectedId] = useState<string>("");

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <> Error... </>;
    }

    const { tasks } = data;

    const onClicked = (id: string) => {

        const task = tasks.find((x) => x.id === id);

        if (!task) {
            return;
        }

        if (showDetail) {
            setSelectedId(id);
            showDetail(task);
        }
    };

    let tasksCompleted: ICard[] = [];
    tasks.filter((x) => x.state === State.SOLVED)
        .map((x) => tasksCompleted = [
            ...tasksCompleted,
            {
                id: x.id,
                title: x.subject,
                state: x.state,
                description: x.issue,
                label: getFormattedDate(x.created_at, true),
                draggable: true,
                onClick: onClicked,
                selected: x.id === selectedId,
            }]);
    let tasksSolving: ICard[] = [];
    tasks.filter((x) => x.state === State.SOLVING)
        .map((x) => tasksSolving = [
            ...tasksSolving,
            {
                id: x.id,
                title: x.subject,
                state: x.state,
                description: x.issue,
                label: getFormattedDate(x.created_at, true),
                draggable: true,
                onClick: onClicked,
                selected: x.id === selectedId,
            }]);
    let tasksNotStarted: ICard[] = [];
    tasks.filter((x) => x.state === State.UNRESOLVED)
        .map((x) => tasksNotStarted = [
            ...tasksNotStarted,
            {
                id: x.id,
                state: x.state,
                title: x.subject,
                description: x.issue,
                label: getFormattedDate(x.created_at, true),
                draggable: true,
                onClick: onClicked,
                selected: x.id === selectedId,
            }]);

    const boardData = {
        lanes: [
            {
                id: "UNRESOLVED",
                title: "Nezapočato",
                cards: tasksNotStarted,
            },
            {
                id: "SOLVING",
                title: "Pracuje se na tom",
                cards: tasksSolving,
            },
            {
                id: "SOLVED",
                title: "Dokončeno",
                cards: tasksCompleted,
            },
        ],
    };

    const CustomCard = (x: any) => {
        const { id, description, title, label = "", onClick, selected, state }: ICard = x;

        let borderColor: string = "";

        switch (state) {
            case State.RETURNED:
                borderColor = "#ffffff";
                break;
            case State.SOLVED:
                borderColor = "#40a351";
                break;
            case State.SOLVING:
                borderColor = "#ffff00";
                break;
            case State.UNRESOLVED:
                borderColor = "#ff0000";
                break;
        }

        const taskBorder = `3px solid ${borderColor}`;

        return (
            <Tooltip title="Kliknutím zobrazíte detail">
                <Paper style={{
                    padding: "0.7rem",
                    backgroundColor:
                        selected ? "#1f1f1f" : "#3f3f3f",
                    borderTop: taskBorder,
                }}>
                    <div onClick={() => { onClick(id); }} >
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="subtitle1" color="textPrimary">{title}</Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="caption">{label}</Typography>
                                <Divider />
                            </Grid>
                        </Grid>
                        <div style={{ fontSize: 12 }}>
                            <div style={{ padding: "5px 0px" }} >
                                <Typography variant="body2" className="text-desc" style={{ whiteSpace: "normal" }}>
                                    {description}
                                </Typography>
                            </div>
                        </div>
                    </div>
                </Paper>
            </Tooltip>
        );
    };

    const handleCardChange = async (
        cardId: number,
        sourceLaneId: string,
        targetLaneId: string,
        position: number,
        cardDetails: any,
        description: string) => {
        const res = await changeTaskState({
            variables: {
                taskId: cardId,
                comment: "TASK STATE CHANGED",
                state: targetLaneId,
            },
        });
    };

    return <Board data={boardData} customCardLayout laneDraggable={false}
        draggable handleDragEnd={handleCardChange}>
        <CustomCard />
    </Board>;
};

export default TaskBoard;
