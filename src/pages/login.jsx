import { useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Eye from "../assets/icon-hide-sideBar.svg";
import EyeIcon from "../assets/icon-show-sidebar.svg";
import SignupPage from "./signUp";

// eslint-disable-next-line react/prop-types
const LoginPage = ({ isOpen,showAlert }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  const handleLogin = async () => {
    const response = await fetch(`${import.meta.env.VITE_SOME_SERVER}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      showAlert('Logged in successfully!', 'success')
      navigate("/");
    } else {
      showAlert('Login failed.','error' );
    }
  };

  return (
    <div className="login-page">
      <div className="login-heading">
        <h1>TaskTracker</h1>
      </div>
      <Card isOpen={!isOpen}>
        <div>
          <h1>Login</h1>
          <Input
            type={"email"}
            placeholder={"email"}
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
              className="eye"
              onClick={() => setShowPassword(!showPassword)}
              src={showPassword ? EyeIcon : Eye}
              alt="eye"
            />
          </div>
          <Button disabled={!email || !password} onClick={() => handleLogin()}>
            Login
          </Button>
          <Button onClick={() => setShowSignup(true)}>
            Create New Account
          </Button>
        </div>
      </Card>
      {showSignup && (
        <SignupPage
          showAlert={showAlert}
          hideSignup={() => setShowSignup(false)}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />
        )}
    </div>
  );
};

export default LoginPage;
