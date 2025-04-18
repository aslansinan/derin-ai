import { Button, Input } from "antd";
import React from "react";
import "../../styles/Login.scss";
const Login = () => {
  return (
    <div className="login-page">
      <h1>Login</h1>
      <div className="login-container">
        <div className="login-form">
          <Input type="text" placeholder="Username" />
          <Input type="password" placeholder="Password" />
          <Button>Login</Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
