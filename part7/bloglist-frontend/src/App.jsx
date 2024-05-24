
import "./index.css";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Notification from "./components/Notification";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from "./reducers/blogReducer";
import { newBlogNotification } from "./reducers/notificationReducer";
import { setUser, clearUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const createBlogRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(initializeBlogs(blogs));
    };
    fetchBlogs();
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const notify = (message, type = "INFO") => {
    dispatch(newBlogNotification(`${type}: ${message}`));
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
  };

  const addBlog = async (newBlog) => {
    createBlogRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.createBlog(newBlog);
      dispatch(createBlog(returnedBlog));
      notify(`${newBlog.title} has been added to the list`);
    } catch (error) {
      notify("Failed to add blog", "ERROR");
    }
  };

  const addLike = async (id) => {
    const blogToLike = blogs.find(blog => blog.id === id);
    const updatedBlog = {
      ...blogToLike,
      user: user.id,
      likes: blogToLike.likes + 1,
    };
    try {
      const returnedBlog = await blogService.update(id, updatedBlog);
      dispatch(updateBlog(returnedBlog));
      notify(`Liked ${returnedBlog.title}`);
    } catch (error) {
      console.error('Failed to like blog', error); // Añade logging para depurar el error
      notify("Failed to like blog", "ERROR");
    }
  };

  const delBlog = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id);
    const confirmed = window.confirm(`Do you really want to remove ${blogToDelete.title}?`);
    if (confirmed) {
      try {
        await blogService.delById(id);
        dispatch(deleteBlog(id));
        notify(`${blogToDelete.title} has been deleted`);
      } catch (error) {
        notify("Failed to delete blog", "ERROR");
      }
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setUser(user));
      blogService.setToken(user.token);
    } catch (exception) {
      notify("Wrong credentials", "ERROR");
    }
  };

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginForm = () => (
    <Login
      handleSubmit={handleLogin}
      handleNameChange={handleNameChange}
      handlePasswordChange={handlePasswordChange}
      username={username}
      password={password}
    />
  );

  const newBlog = () => (
    <Togglable buttonLabel="new blog" ref={createBlogRef}>
      <CreateBlog createNewBlog={addBlog} />
    </Togglable>
  );

  const logOut = () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(clearUser());
  };

  return (
    <div>
      <Notification />
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>
            {user.name} logged-in <button onClick={logOut}>log-out</button>
          </p>
          {newBlog()}
          <h2>blogs</h2>
          <ol>
            {blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <div key={blog.id}>
                  <li>
                    <Blog
                      blog={blog}
                      addLike={() => addLike(blog.id)}
                      delBlog={() => delBlog(blog.id)}
                      user={user}
                    />
                  </li>
                </div>
              ))}
          </ol>
        </div>
      )}
      <h6>Javi Macias Proyect</h6>
    </div>
  );
};

export default App;