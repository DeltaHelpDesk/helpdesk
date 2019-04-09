import { IAuthor } from '../TaskList/TaskList';
import { IUser } from 'src/graphql/auth';

export interface ILog {
    author: IAuthor
    created_at: string
    comment: string
    state: string
    assignee: IUser
}
/*
logs {
    author {
        id
        fullname
    }
    created_at
    comment
    state
    assignee
}