import { Validation, Preferencies } from '../clientConfig/clientConfig.type';

export class Defaults {

    static taskSubjectMaxLength: number = 20;
    static commentMaxLength: number = 120;
    static taskIssueMaxLength: number = 120;
    static subtaskMaxLength: number = 50;
    static language: string = 'cs_CZ';
    static theme: string = 'light';

    static GetValidation(): Validation {
        return {
            taskSubjectMaxLength: this.taskSubjectMaxLength,
            commentMaxLength: this.commentMaxLength,
            taskIssueMaxLength: this.taskIssueMaxLength,
            subtaskMaxLength: this.subtaskMaxLength,
        };
    }

    static GetPreferences(): Preferencies {
        return {
            language: this.language,
            theme: this.theme,
        };
    }
}