/* eslint-disable react/prop-types */
import Button from "./Button";
import Card from "./Card";

const DeleteConfirm = ({
  text,
  name,
  hideForm,
  id,
  getBoards,
}) => {
  const deleteBoard = async (id, token) => {
    const response = await fetch(`https://task-manager-server-ashy.vercel.app/boards/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.ok) {
      console.log("Board and all its tasks are deleted successfully");
    } else {
      console.log("Error deleting the board:", response.status);
    }
  };

  const deleteTask = async (id, token) => {
    const response = await fetch(`https://task-manager-server-ashy.vercel.app/tasks/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
      },
    });
    if (response.ok) {
      console.log("Task deleted successfully");
    } else {
      console.log("Error deleting the task:", response.status);
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (text === "board") {
      await deleteBoard(id, token);
      getBoards(token);
    } else {
      await deleteTask(id, token);
      getBoards(token);
    }
  };

  return (
    <Card showShadow={true}>
      <h3 style={{ color: "#EA5555", fontSize: "20px", margin: "15px auto" }}>
        Delete this {text}?
      </h3>
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
        onClick={() => {
          hideForm();
          handleDelete();
        }}
      >
        Delete
      </Button>
      <Button
        color="rgba(99, 95, 199, 0.10)"
        textColor="#635FC7"
        onClick={() => hideForm()}
      >
        Cancel
      </Button>
    </Card>
  );
};

export default DeleteConfirm;
