import { useState } from "react";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

// eslint-disable-next-line react/prop-types
const LoginPage = ({ isOpen }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("token", data.token);
      setMessage("Login successful!");
      navigate('/')
    } else {
      setMessage("Login failed.");
    }
  };

  return (
    <Card isOpen={!isOpen}>
      <div>
        <h1>Login</h1>
        <Input
          type={"email"}
          placeholder={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type={"password"}
          placeholder={"Password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button disabled={!email || !password} onClick={() => handleLogin()}>
          Login
        </Button>
        <p>{message}</p>
        <button onClick={() => navigate("/signup")}>Create New Account</button>
      </div>
    </Card>
  );
};

export default LoginPage;
