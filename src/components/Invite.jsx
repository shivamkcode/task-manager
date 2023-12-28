/* eslint-disable react/prop-types */
import { useState } from "react";
import Button from "./Button";

const Invite = ({ invite, type }) => {
  const [status, setStatus] = useState(invite.status);

  const handleAccept = async (task) => {
    const response = await fetch(
      `http://localhost:3000/invites/${invite.id}/${task}`,
      {
        method: "PUT",
      }
    );

    if (response.ok) {
      const updatedInvite = await response.json();
      setStatus(updatedInvite.status);
    } else {
      console.error("Error accepting invite:", response.status);
    }
  };

  return (
    <div className="invite">
      <h4>Board Name : <span>{invite.board.name}</span></h4>
      <br />
      {type === "recieved" && <p>Invited by: {invite.Inviter.username}</p>}
      {type === "sent" && <p>Invited member: {invite.Invitee.username}</p>}
      {type === "recieved" && (
        <>
          {status === "pending" && (
            <div className="invite-buttons">
              <Button onClick={() => handleAccept("accept")}>Accept</Button>
              <Button color="#EA5555" onClick={() => handleAccept("reject")}>
                Reject
              </Button>
            </div>
          )}
          {status === "accepted" && <p>Accepted</p>}
          {status === "rejected" && <p style={{color:'#EA5555'}}>Rejected</p>}
        </>
      )}
      {type === "sent" && (
        <>
          {status === "pending" && (
            <p>Pending... </p>
          )}
          {status === "accepted" && <p>Accepted</p>}
          {status === "rejected" && <p style={{color:'#EA5555'}}>Rejected</p>}
        </>
      )}
    </div>
  );
};

export default Invite;
