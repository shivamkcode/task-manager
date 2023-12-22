import Button from "./Button";
import Card from "./Card";

// eslint-disable-next-line react/prop-types
const DeleteConfirm = ({ text, name, showForm }) => {
  const deleteBoard = () => {};
  const deleteTask = () => {};
  return (
    <Card showShadow={true}>
      <h3 style={{ color: "#EA5555" }}>Delete this {text}?</h3>
      {text === "board" && (
        <p>
          Are you sure you want to delete the <b>{name}</b> board? This action
          will remove all columns and tasks and cannot be reversed.
        </p>
      )}
      {text === "task" && (
        <p>
          Are you sure you want to delete the <b>{name}</b> task and its
          subtasks? This action cannot be reversed.
        </p>
      )}
      <Button
        color="#EA5555"
        textColor="white"
        onClick={text === "board" ? deleteBoard : deleteTask}
      >
        Delete
      </Button>
      <Button
        color="rgba(99, 95, 199, 0.10)"
        textColor="#635FC7"
        onClick={() => showForm(false)}
      >
        Cancel
      </Button>
    </Card>
  );
};

export default DeleteConfirm;
