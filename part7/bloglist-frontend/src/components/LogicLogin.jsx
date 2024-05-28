
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../reducers/userReducer";
import loginService from "../services/login";
import { newBlogNotification } from "../reducers/notificationReducer";
import Login from "./Login";

const LogicLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
      loginService.setToken(user.token);
    } catch (exception) {
      dispatch(newBlogNotification("ERROR: Wrong credentials"));
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
    }
  };

  const handleNameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  return (
    <Login
      handleSubmit={handleLogin}
      handleNameChange={handleNameChange}
      handlePasswordChange={handlePasswordChange}
      username={username}
      password={password}
    />
  );
};

export default LogicLogin;