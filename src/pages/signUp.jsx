/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import Input from "../components/Input";
import Eye from "../assets/icon-hide-sidebar.svg";
import EyeIcon from "../assets/icon-show-sidebar.svg";
import Cross from "../assets/icon-cross.svg";

const SignupPage = ({
  isOpen,
  hideSignup,
  showPassword,
  setShowPassword,
  showAlert,
  email,
  setEmail,
  password,
  setPassword,
  handlePasswordChange,
  emailError,
  passwordError,
  handleEmailBlur,
}) => {
  const [username, setUsername] = useState("");

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
      showAlert("Signup successful!", "success");
      hideSignup();
      setUsername("")
      setPassword("")
    } else {
      const errorData = await response.json();
      showAlert(errorData.message, "error");
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
        placeholder={"email"}
        value={email}
        capital={false}
        onChange={(e) => setEmail(e.target.value)}
        onBlur={handleEmailBlur}
      />
      <div className="passwordInput">
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={"Password"}
          value={password}
          capital={false}
          onChange={handlePasswordChange}
        />
        <img
          className="eye"
          onClick={() => setShowPassword(!showPassword)}
          src={showPassword ? EyeIcon : Eye}
          alt="eye"
        />
      </div>
      {passwordError && <p style={{ color: "#CD2C2C" }}>{passwordError}</p>}
      <Button
        onClick={handleSignup}
        disabled={!username || passwordError || emailError || !email || !password}
      >
        Signup
      </Button>
      <Button
        onClick={hideSignup}
      >
        Already have an account?
      </Button>
    </Card>
  );
};

export default SignupPage;
