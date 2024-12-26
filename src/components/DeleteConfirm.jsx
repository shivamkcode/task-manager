/* eslint-disable react/prop-types */
import Button from "./Button";
import Card from "./Card";

const DeleteConfirm = ({
  text,
  name,
  hideForm,
  id,
  getBoards,
  showAlert,
  setChosenBoardId,
  boards,
  handleLogout,
  deleteUser,
  user,
}) => {
  const deleteBoard = async (id, token) => {
    const response = await fetch(
      `${import.meta.env.VITE_SOME_SERVER}/boards/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.ok) {
      showAlert("Board and all its tasks are deleted successfully", "success");
    } else {
      showAlert("Error deleting the board:", "error");
    }
  };

  const deleteTask = async (id, token) => {
    const response = await fetch(
      `${import.meta.env.VITE_SOME_SERVER}/tasks/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `${token}`,
        },
      }
    );
    if (response.ok) {
      showAlert("Task deleted successfully", "success");
    } else {
      showAlert("Error deleting the task:", "error");
    }
  };

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (text === "board") {
      const currentIndex = boards.findIndex((board) => board.id === id);
      await deleteBoard(id, token);
      getBoards(token);
      if (currentIndex !== -1) {
        if (currentIndex > 0) {
          setChosenBoardId(boards[currentIndex - 1].id);
        } else if (currentIndex < boards.length - 1) {
          setChosenBoardId(boards[currentIndex + 1].id);
        } else {
          setChosenBoardId(null);
        }
      }
    } else if (text === "task") {
      await deleteTask(id, token);
      getBoards(token);
    } else {
      await deleteUser(user.id, token);
      handleLogout();
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
      {text === "user" && (
        <p>
          Are you sure you want to Permanently delete your account and all the
          data? This action cannot be reversed.
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
