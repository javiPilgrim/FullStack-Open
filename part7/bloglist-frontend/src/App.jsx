import "./index.css";
import { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import Login from "./components/Login";
import Notification from "./components/Notification";
import loginService from "./services/login";
import CreateBlog from "./components/CreateBlog";
import Togglable from "./components/Togglable";
import { createStore } from 'redux'
import { newBlogNotification } from "./components/notificationReducer";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const createBlogRef = useRef();
  const dispatch = useDispatch();
 

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const addBlog = (newBlog) => {
    createBlogRef.current.toggleVisibility();
    blogService.createBlog(newBlog).then((retornedBlog) => {
      setBlogs(blogs.concat(retornedBlog));
    const content = `INFO: ${newBlog.title} has been added to the list`
      dispatch(newBlogNotification(content));
      setTimeout(() => {
        dispatch(newBlogNotification(""));
      }, 5000);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    });
  };

  const delBlog = async (blog) => {
    const confirmed = window.confirm(
      `Do you really want to remove ${blog.title}?`,
    );
    if (confirmed) {
      await blogService.delById(blog.id);
     const content = `INFO: ${blog.title} has been deleted`
     dispatch(newBlogNotification(content))
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    }
  };

  const addLike = async (id) => {
    const result = await blogService.getById(id);
    const newObject = {
      title: result.title,
      author: result.author,
      url: result.url,
      likes: result.likes + 1,
      user: user.id,
    };
    await blogService.newLike(id, newObject);
    dispatch(newBlogNotification(`INFO: ${newObject.title} has a new like`))
    setTimeout(() => {
      dispatch({ type: "CLEAR" });
    }, 5000);
    const updatedBlogs = blogs.map((b) =>
      b.id === id ? { ...b, likes: b.likes + 1 } : b,
    );
    setBlogs(updatedBlogs);
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
    } catch (exception) {
      dispatch(newBlogNotification("Wrong credentials"));
      setTimeout(() => {
        dispatch({ type: "CLEAR" });
      }, 5000);
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
    window.location.reload();
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
                      delBlog={() => delBlog(blog)}
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
