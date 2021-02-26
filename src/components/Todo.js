const Todo = ({ todo, toggleComplete, onDelete }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <div
        style={{ textDecoration: todo.complete ? "line-through" : "" }}
        onClick={toggleComplete}
      >
        {todo.text}
      </div>
      <button onClick={onDelete}>x</button>
    </div>
  );
};

export default Todo;
