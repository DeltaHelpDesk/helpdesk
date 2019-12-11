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
            throw new HttpException('Task id is missing', HttpStatus.BAD_REQUEST);
        }
        const task = await this.taskRepository.findOne({ id: taskId });
        if (!task) {
            throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
        }
        return await this.addCommentP(message, authorId, task);
    }

    private async addCommentP(message: string, authorId: number, task: Task): Promise<Comment | undefined> {
        if (!authorId) {
            throw new HttpException('Author id is missing', HttpStatus.BAD_REQUEST);
        }
        const author = await this.userRepository.findOne({ id: authorId });
        if (!author) {
            throw new HttpException('Author not found', HttpStatus.NOT_FOUND);
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
            throw new HttpException('Comment id is missing', HttpStatus.BAD_REQUEST);
        }
        const comment = await this.commentRepository.findOne({ id: commentId });
        if (!comment) {
            throw new HttpException('Comment not found', HttpStatus.NOT_FOUND);
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
        if (!commentId) {
            throw new HttpException('Comment id is missing', HttpStatus.BAD_REQUEST);
        }

        const comment = await this.commentRepository.findOne(commentId);
        if (!comment) {
            throw new HttpException(`Comment with id: ${commentId} not found`, HttpStatus.NOT_FOUND);
        }
        await this.commentRepository.delete(commentId);
        return true;
    }

}