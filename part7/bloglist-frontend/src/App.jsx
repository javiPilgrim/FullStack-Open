import "./index.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./components/Notification";
import { setUser, clearUser } from "./reducers/userReducer";
import LogicLogin from "./components/LogicLogin";
import BlogList from "./components/BlogList";
import blogService from './services/blogs'
import { newBlogNotification, clearNotification } from "./reducers/notificationReducer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";




const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(clearUser());
  };

  const notify = (message, type = "INFO") => {
    dispatch(newBlogNotification(`${type}: ${message}`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  };


  return (
    <Router>
      <div>
        <Notification />
        {user === null ? (
          <LogicLogin notify={notify} /> 
        ) : (
          <div>
            <p>
              {user.name} logged-in <button onClick={logOut}>log-out</button>
            </p>
            <nav>
              <Link to="/">Blogs</Link> | <Link to="/users">Users</Link>
            </nav>
            <Routes>
              <Route path="/users" element={<Users />} />
              <Route path="/" element={<BlogList notify={notify} />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/blogs/:id" element={<BlogView />} />
            </Routes>
          </div>
        )}
        <h6>Javi Macias Project</h6>
      </div>
    </Router>
  );
};

export default App;