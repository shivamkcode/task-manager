/* eslint-disable react/prop-types */
// import mailgun from 'mailgun-js'

import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import SideBar from "../components/SideBar";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import Card from "../components/Card";
import Input from "../components/Input";
import Cross from "../assets/icon-cross.svg";
import Invite from "../components/Invite";

const Profile = ({
  user,
  sidebarVisible,
  setSidebarVisible,
  isOpen,
  setIsOpen,
  darkMode,
  setDarkMode,
  boards,
  chosenBoardId,
  setChosenBoardId,
  windowWidth,
  showAlert,
}) => {
  const [inviteForm, setInviteForm] = useState(false);
  const [emailInput, setEmailInput] = useState({
    email: "",
    message: "",
  });
  const [boardId, setBoardId] = useState();
  const [sentInvites, setSentInvites] = useState();
  const [recievedInvites, setRecievedInvites] = useState();
  const navigate = useNavigate();
  const userInitial = user ? user.username[0].toUpperCase() : "";

  const sendInvite = async (inviterId, inviteeEmail, boardId) => {
    const response = await fetch(`${import.meta.env.VITE_SOME_SERVER}/invites`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inviterId, inviteeEmail, boardId }),
    });

    if (response.ok) {
      showAlert("Invite Sent Successfully", 'success');
    } else {
      showAlert("Error inviting user", 'error');
    }
  };

  const sentInvite = async (userId) => {
    const response = await fetch(
      `${import.meta.env.VITE_SOME_SERVER}/invites/sent/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const invites = await response.json();
      setSentInvites(invites);
    } else {
      console.error("Error getting invite:", response.status);
    }
  };

  const recievedInvite = async (userId) => {
    const response = await fetch(`${import.meta.env.VITE_SOME_SERVER}/invites/recieved/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const invites = await response.json();
      setRecievedInvites(invites);
    } else {
      console.error("Error getting invite:", response.status);
    }
  };

  useEffect(() => {
    if (user) {
      sentInvite(user.id);
      recievedInvite(user.id);
      setBoardId(user.boards[0]?.id);
    }
  }, [inviteForm, user]);

  const handleInvitation = () => {
    sendInvite(user.id, emailInput.email, boardId);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <div className="container">
        <NavBar
          windowWidth={windowWidth}
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          userName={user?.username}
        />
        <SideBar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          boards={boards}
          chosenBoardId={chosenBoardId}
          setChosenBoardId={setChosenBoardId}
          sidebarVisible={sidebarVisible}
          setSidebarVisible={setSidebarVisible}
          windowWidth={windowWidth}
          userName={user?.username}
        />
        <div
          className={`board profile-board ${
            sidebarVisible ? "" : "noSideBar-board"
          }`}
        >
          <div className="invite-container">
            <div className="invite-header">
              <h1>Manage Invitations:</h1>
              {boards?.length > 0 && (
                <Button
                  color={`${darkMode ? 'white' : '#635FC71A'}`}
                  textColor="#635FC7"
                  onClick={() => setInviteForm(true)}
                >
                  Invite
                </Button>
              )}
              {boards?.length === 0 && <p>Create a board to Invite memebers</p>}
            </div>
            <div className="invite-box-container">
              <div className="invite-box">
                <h3>Sent Invites:</h3>
                {sentInvites?.length > 0 && (
                  <div className="sent-invites">
                    <p>
                      You have sent {sentInvites?.length} invite
                      {sentInvites?.length > 1 ? "s" : ""}.
                    </p>
                    {sentInvites.map((invite) => (
                      <Invite
                        key={invite.id}
                        type={"sent"}
                        invite={invite}
                      ></Invite>
                    ))}
                  </div>
                )}
                {sentInvites?.length === 0 && <p>No invites sent.....</p>}
              </div>
              <div className="invite-box">
                <h3>Recieved Invites:</h3>
                {recievedInvites?.length > 0 && (
                  <div className="recieved-invites">
                    <p>
                      You have recieved {recievedInvites?.length} invite
                      {sentInvites?.length > 1 ? "s" : ""}.
                    </p>
                    {recievedInvites.map((invite) => (
                      <Invite
                        key={invite.id}
                        type={"recieved"}
                        invite={invite}
                      ></Invite>
                    ))}
                  </div>
                )}
                {recievedInvites?.length === 0 && (
                  <p>No invites recieved.....</p>
                )}
              </div>
            </div>
          </div>
          <div className="profile">
            <div
              onClick={() => navigate("/profile")}
              className="profile-icon"
              data-initial={`${userInitial}`}
            >
              <span>{userInitial}</span>
            </div>
            <p>username:</p>
            <h3>{user?.username}</h3>
            <p>email:</p>
            <h4>{user?.email}</h4>
            <Button disabled>Update Profile</Button>
            <Button onClick={handleLogout} color="#EA5555" textColor="white">
              Logout
            </Button>
          </div>
        </div>
      </div>
      {inviteForm && (
        <Card showShadow={true}>
          <div className="card-header">
            <h3>Invite a members</h3>
            <img onClick={() => setInviteForm(false)} src={Cross} alt="X" />
          </div>
          <label>
            To:
            <Input
              type="email"
              capital={false}
              value={emailInput.email}
              onChange={(e) =>
                setEmailInput({ ...emailInput, email: e.target.value })
              }
              placeholder={"email of the user you want to invite"}
            />
          </label>
          <label>
            Message:
            <Input
              type="text"
              value={emailInput.message}
              onChange={(e) =>
                setEmailInput({ ...emailInput, message: e.target.value })
              }
              placeholder={""}
            />
          </label>
          <label htmlFor="Status">
            Select Board
            <select
              value={boardId}
              onChange={(e) => {
                setBoardId(e.target.value);
              }}
              required
            >
              {boards.map((board) => {
                return (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                );
              })}
            </select>
          </label>
          <Button
            onClick={() => {
              setInviteForm(false);
              handleInvitation();
            }}
            disabled={!emailInput.email || !emailInput.message || !boardId}
          >
            Submit
          </Button>
        </Card>
      )}
      {sidebarVisible && windowWidth < 600 && (<div
        style={{
          position: "absolute",
          top: '80px',
          left: 0,
          width: "100vw",
          height: "calc(100vh - 90px)",
          backgroundColor: "rgba(0,0,0,0.5)",
          zIndex: "999",
        }}
      />)}
    </>
  );
};

export default Profile;
