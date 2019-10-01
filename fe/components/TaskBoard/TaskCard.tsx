import { Paper, Divider, Button, Icon, Typography } from "@material-ui/core";
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import DateFormatComponent from '../Dates/DateFormatter';
import { ITask } from '../../src/graphql/types';


interface ITaskCardProps {
    task: ITask
}

const TaskCard: React.FunctionComponent<ITaskCardProps> = ({ task }) => {

    const DetailButton = () => {
        const path = "/task/" + task.id;
        return (
            <NavLink to={path}>
                <Button variant="contained" color="primary">
                    <Icon>edit_icon</Icon>
                </Button>
            </NavLink>
        )
    };

    return <>
        <div style={{ padding: '2rem' }}>
            <Paper style={{ background: '#ffffff', padding: '1rem' }}>
                <div><Typography variant="h6" component="h2">{task.subject}</Typography></div>
                <Divider style={{ marginTop: '.5rem', marginBottom: '.5rem' }} />
                <div><strong>Od: </strong>{task.author.fullName}</div>
                <div><strong>Řeší: </strong>{!task.assignee ? 'Nikdo' : task.assignee.fullName}</div>
                <div><strong>Vytvořeno: </strong> <DateFormatComponent date={task.created_at} relative={true} /> </div>
                <div><strong>Popis: </strong>{task.issue}</div>
                <Divider style={{ marginTop: '.5rem', marginBottom: '.5rem' }} />
                <div style={{ padding: '1rem' }}>
                    <DetailButton />
                </div>
            </Paper>
        </div>
    </>;
}

export default TaskCard;