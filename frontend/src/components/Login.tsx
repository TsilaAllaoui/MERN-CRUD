import { FormEvent } from "react";

function Login() {

  const login = (e: FormEvent) => {
    e.preventDefault();
  };
  
  return (
    <form onSubmit={login}>
      <label>User name:</label>
      <input type="text" id="username" />
      <label>Password:</label>
      <input type="password" id="password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
