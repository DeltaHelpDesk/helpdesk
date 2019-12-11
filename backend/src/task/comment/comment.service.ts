import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../task.entity';
import { Defaults } from 'common/defaults';
import { Comment } from './comment.entity';
import { User } from '../../auth/user.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Task)
        private readonly taskRepository: Repository<Task>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
    ) { }

    async addComment(message: string, authorId: number, taskId: number): Promise<Comment | undefined> {
        if (!taskId) {
            return undefined;
        }
        const task = await this.taskRepository.findOne({ id: taskId });
        if (!task) {
            return undefined;
        }
        return await this.addCommentP(message, authorId, task);
    }

    private async addCommentP(message: string, authorId: number, task: Task): Promise<Comment | undefined> {
        if (!authorId) {
            return undefined;
        }
        const author = await this.userRepository.findOne({ id: authorId });
        if (!author) {
            return undefined;
        }
        return await this.addCommentPp(message, author, task);
    }

    private async addCommentPp(message: string, author: User, task: Task): Promise<Comment | undefined> {
        if (!message || !author || !task) {
            return undefined;
        }

        const maxLength = Defaults.commentMaxLength;
        if (message.length > maxLength) {
            throw new HttpException(`Comment message is longer than max length (${maxLength})`, HttpStatus.BAD_REQUEST);
        }

        const subTask = this.commentRepository.create({
            message,
            task,
            author,
        });
        return await this.commentRepository.save(subTask);
    }

    async changeComment(commentId: number, message?: string): Promise<Comment | undefined> {
        if (!commentId) {
            return undefined;
        }
        const comment = await this.commentRepository.findOne({ id: commentId });
        if (!comment) {
            return undefined;
        }
        if (message) {
            const maxLength = Defaults.commentMaxLength;
            if (message.length > maxLength) {
                throw new HttpException(`Comment message is longer than max length (${maxLength})`, HttpStatus.BAD_REQUEST);
            }

            comment.message = message;
        }
        return await this.commentRepository.save(comment);
    }

    async deleteComment(commentId: number): Promise<boolean> {
        const comment = await this.commentRepository.findOne(commentId);
        if (!comment) {
            throw new HttpException(`Comment with id: ${commentId} not found`, HttpStatus.NOT_FOUND);
        }
        await this.commentRepository.delete(commentId);
        return true;
    }

}