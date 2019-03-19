import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { withTranslation } from "react-i18next";

export interface ITodoProps {
  name: string;
}

interface ITodoType {
    id: number,
    completed: boolean,
    text: string
}

const GET_TODOS = gql`
  {
    todos @client {
      id
      completed
      text
    }
  }
`;

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) @client {
      id
    }
  }
`;

const TOGGLE_TODO = gql`
  mutation ToggleTodo($id: Int!) {
    toggleTodo(id: $id) @client
  }
`;

const TodoForm = withTranslation()(({t}) => (
  <Mutation mutation={ADD_TODO}>
    {addTodo => {
      let input: any;
      return (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              if (!input.value.trim()) {
                return;
              }
              addTodo({ variables: { text: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">{t('addTodo')}</button>
          </form>
        </div>
      );
    }}
  </Mutation>
));

const TodoItem = ({ id, completed, text } : {id: number, completed: boolean, text: string}) => (
  <Mutation mutation={TOGGLE_TODO} variables={{ id }}>
    {toggleTodo => (
      <li
        // tslint:disable-next-line:jsx-no-lambda
        onClick={() => toggleTodo()}
        hidden={completed}
        style={{
          textDecoration: completed ? "line-through" : "none"
        }}
      >
        {text}
      </li>
    )}
  </Mutation>
);

const TodoList = () => (
  <Query query={GET_TODOS}>
    {({ data }) => (
      <ul>
        {data.todos.map(
          (todo: ITodoType) => <TodoItem key={todo.id} {...todo} />
        )}
      </ul>
    )}
  </Query>
);

const Todo: React.SFC<ITodoProps> = props => {
  return (
    <div>
      <h2>{props.name}</h2>
      <TodoForm />
      <TodoList />
    </div>
  );
};

export default Todo;
