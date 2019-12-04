import { Field, Int, ObjectType } from 'type-graphql';

@ObjectType()
export class Validation {
    @Field(() => Int)
    taskSubjectMaxLength: number;

    @Field(() => Int)
    taskIssueMaxLength: number;
}

@ObjectType()
export class Preferencies {
    @Field(() => String)
    language: String;

    @Field(() => String)
    theme: String;
}

@ObjectType()
export class ClientConfig {
    @Field(() => Validation)
    validation: Validation;

    @Field(() => Preferencies)
    preferencies: Preferencies;
}


