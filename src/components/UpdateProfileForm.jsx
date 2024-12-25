/* eslint-disable react/prop-types */
import Card from "./Card";
import Cross from "../assets/icon-cross.svg";
import Input from "./Input";
import Button from "./Button";
import { useState } from "react";
import Eye from "../assets/icon-hide-sidebar.svg";
import EyeIcon from "../assets/icon-show-sidebar.svg";

const UpdateProfileForm = ({
  setShowUpdateProfileForm,
  user,
  showAlert,
  updateUser,
  getUser,
  handleLogout,
}) => {
  const [username, setUsername] = useState(user.username);
  const [oldPassword, setOldPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(null);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    if (!oldPassword) {
      await updateUser(user.id, { username: username }, token);
      getUser(token);
      showAlert("Username Changed", "success");
    } else if (oldPassword === newPassword) {
      showAlert("New Password can't be same as the Old Password", "error");
    } else if (newPassword !== confirmNewPassword) {
      showAlert("New Passwords don't match", "error");
    } else {
      const data = await updateUser(
        user.id,
        { oldPassword: oldPassword, newPassword: newPassword },
        token
      );
      if (data) {
        handleLogout();
        showAlert("Password Changed", "success");
      }
    }
  };

  const isValidPassword = (password) => {
    return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(password);
  };

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
    if (!isValidPassword(e.target.value)) {
      const errorMsg =
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, and one digit.";
      setPasswordError(errorMsg);
    } else {
      setPasswordError(null);
    }
  };

  return (
    <Card showShadow={true}>
      <div className="card-header">
        <h3>Update Profile</h3>
        <img
          className="cross"
          onClick={() => setShowUpdateProfileForm(false)}
          src={Cross}
          alt="X"
        />
      </div>
      <form action="submit">
        <label>
          Change Username
          <Input
            placeholder="John"
            autoComplete="on"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <div>
          <h3>Change Password</h3>
          <label>
            Old Password
            <div className="passwordInput">
              <Input
                type={showOldPassword ? "text" : "password"}
                placeholder={"Password"}
                value={oldPassword}
                capital={false}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <img
                className="eye"
                onClick={() => setShowOldPassword(!showOldPassword)}
                src={showOldPassword ? EyeIcon : Eye}
                alt="eye"
              />
            </div>
          </label>
          <label>
            New Password
            <div className="passwordInput">
              <Input
                type={showNewPassword ? "text" : "password"}
                placeholder={"Password"}
                value={newPassword}
                capital={false}
                onChange={handlePasswordChange}
              />
              <img
                className="eye"
                onClick={() => setShowNewPassword(!showNewPassword)}
                src={showNewPassword ? EyeIcon : Eye}
                alt="eye"
              />
            </div>
            {passwordError && (
              <p style={{ color: "#CD2C2C" }}>{passwordError}</p>
            )}
          </label>
          <label>
            Confirm New Password
            <div className="passwordInput">
              <Input
                type={showConfirmNewPassword ? "text" : "password"}
                placeholder={"Password"}
                value={confirmNewPassword}
                capital={false}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
              <img
                className="eye"
                onClick={() =>
                  setShowConfirmNewPassword(!showConfirmNewPassword)
                }
                src={showConfirmNewPassword ? EyeIcon : Eye}
                alt="eye"
              />
            </div>
          </label>
        </div>
        <Button
          disabled={
            !username ||
            (username === user.username && !oldPassword) ||
            (oldPassword && (!newPassword || !confirmNewPassword)) ||
            (newPassword && (!oldPassword || !confirmNewPassword)) ||
            (confirmNewPassword && (!oldPassword || !newPassword))
          }
          onClick={() => {
            handleUpdate();
            setShowUpdateProfileForm(false);
          }}
        >
          Update Profile
        </Button>
        <Button
          color="#EA5555"
          textColor="white"
          //   onClick={() => {
          //     handleSubmit();
          //     showForm();
          //   }}
        >
          Delete User
        </Button>
      </form>
    </Card>
  );
};

export default UpdateProfileForm;
