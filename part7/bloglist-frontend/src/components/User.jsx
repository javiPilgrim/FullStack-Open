import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import userService from '../services/users'
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  Box,
} from '@mui/material'

const User = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.getById(id)
        setUser(user)
      } catch (error) {
        console.error('Failed to fetch user', error)
      }
    }

    fetchUser()
  }, [id])

  if (!user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Card
      variant="outlined"
      sx={{ maxWidth: 600, margin: 'auto', mt: 4, p: 2 }}
    >
      <CardContent>
        <Typography variant="h4" component="h2" gutterBottom>
          {user.name}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Username: {user.username}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Added Blogs:
        </Typography>
        <List>
          {user.blogs.map((blog) => (
            <ListItem key={blog.id}>
              <Typography variant="body1">{blog.title}</Typography>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  )
}

export default User
