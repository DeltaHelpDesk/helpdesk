import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Validation {
    @Field(() => Int)
    taskSubjectMaxLength: number;

    @Field(() => Int)
    commentMaxLength: number;

    @Field(() => Int)
    taskIssueMaxLength: number;

    @Field(() => Int)
    subtaskMaxLength: number;
}

@ObjectType()
export class Preferencies {
    @Field(() => String)
    language: string;

    @Field(() => String)
    theme: string;
}

@ObjectType()
export class ClientConfig {
    @Field(() => Validation)
    validation: Validation;

    @Field(() => Preferencies)
    preferencies: Preferencies;
}
