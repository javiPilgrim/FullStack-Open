import './index.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [newBlogVisible, setNewBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (newBlog) =>{
    blogService
    .createBlog(newBlog)
    .then(retornedBlog=>{
      setBlogs(blogs.concat(retornedBlog));
      setErrorMessage(`INFO: ${newBlog.title} has been added to the list`)
      setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    addBlog()
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const loginForm = () => (
    <Login handleSubmit={handleLogin}
        handleNameChange={handleNameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password} />
  )

  const newBlog = () => (
   <Togglable buttonLabel="new blog">
      <CreateBlog createNewBlog = {addBlog} />
  </Togglable>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  return (
    <div>
    <Notification message={errorMessage} />
      {user === null ?
      loginForm() :
      <div>
      <p>{user.name} logged-in <button onClick = {logOut} >log-out</button> </p>
      {newBlog()}
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </div>
    }
    </div>
  )
}

export default App