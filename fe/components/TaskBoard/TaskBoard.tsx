import Board from "react-trello-for-timeline";
import { useMutation } from "@apollo/react-hooks";
import Loading from "./../Loading/Loading";
import { useQuery } from "@apollo/react-hooks";
import { getTasksQuery } from "../../src/graphql/queries";
import { getTasks, getTasks_tasks } from "../../src/graphql/types/getTasks";
import { State } from "../../src/graphql/graphql-global-types";
import { updateTaskBoardQuery } from "../../src/graphql/mutations";
import { FunctionComponent, useState, useContext, useEffect } from "react";
import { Typography, Grid, Divider, Paper, Tooltip } from "@material-ui/core";
import DateHelper from "../../utils/dateHelper";
import { ReactAuthContext, userIsAdmin } from "../../src/graphql/auth";
import { useTranslation } from "react-i18next";
import locKeys from "../../src/Locales/LocalizationKeys";

interface ICard {
    id: string;
    title: string;
    date?: string;
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
    taskId?: string;
}

const dateHelper = new DateHelper();

const getDateLabel = (x: getTasks_tasks) => {
    return `${dateHelper.getFormattedDate(x.created_at, "relative")} (${dateHelper.getFormattedDate(x.created_at, "fromNow")})`;
};

const sortDate = (a: getTasks_tasks, b: getTasks_tasks) => {
    const descending = true;

    const aDate = new Date(a.created_at);
    const bDate = new Date(b.created_at);

    return descending
        ? bDate.getTime() - aDate.getTime()
        : aDate.getTime() - bDate.getTime();
};

const TaskBoard: FunctionComponent<IProps> = ({ showDetail, taskId }) => {
    const { loading, error, data } = useQuery<getTasks>(getTasksQuery);
    const [changeTaskState] = useMutation<
        { changeTaskState: ICard }>(updateTaskBoardQuery);

    const [toFindId, setToFindId] = useState<string>("");

    const { t } = useTranslation();

    const [selectedId, setSelectedId] = useState<string>("");
    const { user } = useContext(ReactAuthContext);
    const isAdmin = () => userIsAdmin(user);

    const onClicked = (id: string) => {

        if (typeof (id) !== "string") {
            return;
        }

        const task = tasks.find((x) => x.id === id);

        const url = "/admin?taskId=" + id;
        // Router.push(url, url, { shallow: true });

        if (window) {
            window.history.pushState({}, `Helpdesk - detail ${id}`, url);
        }

        if (!task) {
            return;
        }

        if (showDetail) {
            setSelectedId(id);
            showDetail(task);
        }
    };

    useEffect(() => {
        if (!toFindId) {
            return;
        }

        onClicked(toFindId);
    }, [toFindId]);

    if (loading) {
        return <Loading />;
    }
    if (error) {
        return <> Error... </>;
    }

    const { tasks } = data;

    tasks.sort(sortDate);

    let tasksCompleted: ICard[] = [];
    tasks.filter((x) => x.state === State.SOLVED)
        .map((x) => tasksCompleted = [
            ...tasksCompleted,
            {
                id: x.id,
                title: x.subject,
                state: x.state,
                description: x.issue,
                label: getDateLabel(x),
                date: x.created_at,
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
                date: x.created_at,
                description: x.issue,
                label: getDateLabel(x),
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
                date: x.created_at,
                description: x.issue,
                label: getDateLabel(x),
                draggable: true,
                onClick: onClicked,
                selected: x.id === selectedId,
            }]);

    const boardData = {
        lanes: [
            {
                id: "UNRESOLVED",
                title: `${t(locKeys.taskState.UNRESOLVED)}`,
                cards: tasksNotStarted,
            },
            {
                id: "SOLVING",
                title: `${t(locKeys.taskState.SOLVING)}`,
                cards: tasksSolving,
            },
            {
                id: "SOLVED",
                title: `${t(locKeys.taskState.SOLVED)}`,
                cards: tasksCompleted,
            },
        ],
    };

    if (taskId && toFindId !== taskId) {
        setToFindId(taskId);
    }

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
            <Tooltip title={t(locKeys.task.showDetail)}>
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
                state: targetLaneId,
            },
        });
    };

    return <Board data={boardData} customCardLayout laneDraggable={false}
        draggable={isAdmin()} handleDragEnd={handleCardChange}>
        <CustomCard />
    </Board>;
};

export default TaskBoard;
