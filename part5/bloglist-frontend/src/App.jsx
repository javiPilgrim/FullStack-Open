import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/login'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = () =>{
    const newBlog = {
      title: title,
      author: author,
      url: url
    }
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
    console.log('He hecho el formulario')
    console.log(`Title: ${title} 
    Author: ${author} 
    url: ${author}`)
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

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  };

  const loginForm = () => (
    <Login handleSubmit={handleLogin}
        handleNameChange={handleNameChange}
        handlePasswordChange={handlePasswordChange}
        username={username}
        password={password} />
  )

  const blogList = () => (
    <>
        <h2>Create New</h2>
        <CreateBlog handleSubmit={handleSubmit}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        title={title}
        author={author}
        url={url} />
        <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      </>
  )

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    window.location.reload()
  }

  return (
    <div>
      {user === null ?
      loginForm() :
      <div>
      <p>{user.name} logged-in <button onClick = {logOut} >log-out</button> </p>
      {blogList()}
      </div>
    }
    </div>
  )
}

export default App