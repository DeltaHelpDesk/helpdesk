import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { Task } from './task.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindConditions, MoreThan, Not, MoreThanOrEqual } from 'typeorm';
import { User } from '../auth/user.entity';
import { TaskState } from './taskState.enum';
import { UserRole, checkUserRole } from '../auth/userRole.enum';
import { Defaults } from '../common/defaults';

@Injectable()
export class TaskService {

    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) { }

    async findOneById(id: number): Promise<Task | undefined> {
        return await this.taskRepository.findOne(id);
    }

    async findAll(enabledOnly = true, lastUpdate?: Date): Promise<Task[]> {
        // Jestli toto někdo čte:
        // Nesnaž se to pochopit, dokud to funguje, tak to nech být.
        // Jiná varianta nefungovala :)
        let fcEnabled: FindConditions<Task> = {};
        if (enabledOnly) {
            fcEnabled = {
                enabled: true,
            };
        }
        let fcLastUpdate: FindConditions<Task> = {
            id: MoreThanOrEqual(0),
            // AND
            ...fcEnabled,
        };
        if (!!lastUpdate) {
            fcLastUpdate = {
                ...fcEnabled,
                // AND
                state: TaskState.SOLVED,
                // AND
                updated_at: MoreThan(lastUpdate),
            };
        }

        return this.taskRepository.find({
            where: [
                {
                    ...fcLastUpdate,
                },
                // OR
                {
                    state: Not(TaskState.SOLVED),
                    // AND
                    ...fcEnabled,
                },
            ],
        });
    }

    async addTask(author: User, issue: string, subject: string, assigneeId?: number): Promise<Task | undefined> {
        const assignee = await this.userRepository.findOne(assigneeId);

        return await this.addTaskP(author, issue, assignee, subject);
    }

    private async addTaskP(author: User, issue: string, assignee: User | undefined, subject: string): Promise<Task | undefined> {
        if (!author || !issue || !subject) {
            return undefined;
        }

        const subjectMaxLength = Defaults.taskSubjectMaxLength;
        const issueMaxLength = Defaults.taskIssueMaxLength;
        if (subject.length > subjectMaxLength) {
            throw new HttpException(`Subject is longer than max length (${subjectMaxLength})`, HttpStatus.BAD_REQUEST);
        }
        if (issue.length > issueMaxLength) {
            throw new HttpException(`Issue is longer than max length (${issueMaxLength})`, HttpStatus.BAD_REQUEST);
        }

        const task = this.taskRepository.create({
            author,
            assignee,
            issue,
            subject,
        });
        return await this.taskRepository.save(task);
    }

    async changeTaskState(author: User, taskId: number, comment?: string, state?: TaskState, assigneeId?: number, enabled?: boolean): Promise<Task> {
        let task = await this.taskRepository.findOne(taskId);
        if (!task) {
            throw new HttpException(`Task with id: ${taskId} not found`, HttpStatus.NOT_FOUND);
        }
        if (!(checkUserRole(author.role, UserRole.ADMIN) || author.id === task.author.id)) {
            throw new HttpException(`Unauthorized user`, HttpStatus.UNAUTHORIZED);
        }
        if (!comment && !state && !assigneeId && enabled == null) {
            throw new HttpException(`Haven't passed any changes for task`, HttpStatus.BAD_REQUEST);
        }
        if (state) {
            task.state = state;
        }
        if (comment) {
            task.issue = comment.trim();
        }
        if (enabled != null) {
            task.enabled = enabled;
        }
        if (assigneeId) {
            const assignee = await this.userRepository.findOne(assigneeId);
            if (assignee) {
                task.assignee = assignee;
            } else {
                throw new HttpException(`Assignee for task with id: ${assigneeId} not found`, HttpStatus.NOT_FOUND);
            }
        }
        task = await this.taskRepository.save(task);
        return task;
    }

    async deleteTask(taskId: number, currentUser: User) {
        if (!currentUser) {
            throw new UnauthorizedException('User not found');
        }
        const task = await this.taskRepository.findOne(taskId);
        if (!task) {
            throw new HttpException(`Task with id: ${taskId} not found`, HttpStatus.NOT_FOUND);
        }
        const { authorId, state } = task;
        const { id, role } = currentUser;
        if (role === UserRole.DEFAULT) {
            if (id === authorId && state === TaskState.UNRESOLVED) {
                await this.taskRepository.delete(taskId);
                return true;
            }
            throw new UnauthorizedException('You are not authorized to do this action');
        }
        await this.taskRepository.delete(taskId);
        return true;
    }
}
