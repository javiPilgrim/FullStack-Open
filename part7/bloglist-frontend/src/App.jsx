import {
  Container,
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Notification from './components/Notification'
import { setUser, clearUser } from './reducers/userReducer'
import LogicLogin from './components/LogicLogin'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import {
  newBlogNotification,
  clearNotification,
} from './reducers/notificationReducer'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const logOut = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.clearToken()
    dispatch(clearUser())
  }

  const notify = (message, type = 'INFO') => {
    dispatch(newBlogNotification(`${type}: ${message}`))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  return (
    <Container>
      <Router>
        <div>
          <Notification />
          {user === null ? (
            <LogicLogin notify={notify} />
          ) : (
            <div>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                mb={2}
              >
                <Typography variant="h6">{user.name} logged-in</Typography>
                <Button variant="contained" color="secondary" onClick={logOut}>
                  Log Out
                </Button>
              </Box>
              <AppBar position="static">
                <Toolbar>
                  <Button color="inherit" component={Link} to="/">
                    Blogs
                  </Button>
                  <Button color="inherit" component={Link} to="/users">
                    Users
                  </Button>
                </Toolbar>
              </AppBar>
              <Routes>
                <Route path="/users" element={<Users />} />
                <Route path="/" element={<BlogList notify={notify} />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<BlogView />} />
              </Routes>
            </div>
          )}
          <Typography
            variant="body2"
            align="center"
            color="textSecondary"
            mt={4}
          >
            Javi Macias Project
          </Typography>
        </div>
      </Router>
    </Container>
  )
}

export default App
