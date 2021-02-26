import React from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

export default class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      todosToShow: "all",
      toggleAllComplete: true,
    };
  }

  addTodo = (todo) => {
    this.setState({ todos: [todo, ...this.state.todos] });
  };

  toggleComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) =>
        todo.id === id ? { ...todo, complete: !todo.complete } : todo
      ),
    });
  };

  handleDeleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter((todo) => todo.id !== id),
    });
  };

  updateTodosToShow = (newTodosToshow) => {
    this.setState({ todosToShow: newTodosToshow });
  };

  removeAllTodosThatAreComplete = () => {
    this.setState({ todos: this.state.todos.filter((todo) => !todo.complete) });
  };

  render() {
    let todos = [];
    switch (this.state.todosToShow) {
      case "all":
        todos = this.state.todos;
        break;
      case "active":
        todos = this.state.todos.filter((todo) => !todo.complete);
        break;
      case "complete":
        todos = this.state.todos.filter((todo) => todo.complete);
        break;
      default:
        break;
    }

    return (
      <div>
        <TodoForm onSubmit={this.addTodo} />
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            toggleComplete={() => this.toggleComplete(todo.id)}
            onDelete={() => this.handleDeleteTodo(todo.id)}
          />
        ))}
        <div>
          todos left: {this.state.todos.filter((todo) => !todo.complete).length}
        </div>
        <div>
          <button onClick={() => this.updateTodosToShow("all")}>all</button>
          <button onClick={() => this.updateTodosToShow("active")}>
            active
          </button>
          <button onClick={() => this.updateTodosToShow("complete")}>
            complete
          </button>
        </div>
        {this.state.todos.some((todo) => todo.complete) ? (
          <div>
            <button onClick={this.removeAllTodosThatAreComplete}>
              remove all complete todos
            </button>
          </div>
        ) : null}
        <div>
          <button
            onClick={() =>
              this.setState({
                todos: this.state.todos.map((todo) => ({
                  ...todo,
                  complete: this.state.toggleAllComplete,
                })),
                toggleAllComplete: !this.state.toggleAllComplete,
              })
            }
          >
            toggle all {this.state.toggleAllComplete ? "complete" : "active"}
          </button>
        </div>
      </div>
    );
  }
}
