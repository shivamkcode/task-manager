import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Eye from "../assets/icon-hide-sideBar.svg";
import EyeIcon from "../assets/icon-show-sidebar.svg";
import Cross from "../assets/icon-cross.svg";

// eslint-disable-next-line react/prop-types
const SignupPage = ({ isOpen, hideSignup, showPassword, setShowPassword, showAlert }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSignup = async () => {
    const response = await fetch(`${import.meta.env.VITE_SOME_SERVER}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      showAlert("Signup successful!", 'success');
      hideSignup();
    } else {
      showAlert("Signup failed.", 'error');
    }
  };

  return (
    <Card isOpen={!isOpen}>
      <div className="card-header">
        <h1>Signup</h1>
        <img onClick={hideSignup} src={Cross} alt="X" />
      </div>
      <Input
        className={"username"}
        placeholder={"Username"}
        value={username}
        capital={false}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type={"email"}
        placeholder={"Email"}
        value={email}
        capital={false}
        onChange={(e) => setEmail(e.target.value)}
      />
      <div className="passwordInput">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={"Password"}
          value={password}
          capital={false}
          onChange={(e) => setPassword(e.target.value)}
        />
        <img
          onClick={() => setShowPassword(!showPassword)}
          src={showPassword ? EyeIcon : Eye}
          alt="eye"
        />
      </div>
      <Button onClick={handleSignup} disabled={!username || !password}>
        Signup
      </Button>
    </Card>
  );
};

export default SignupPage;
