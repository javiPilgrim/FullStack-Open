import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import {
  newBlogNotification,
  clearNotification,
} from '../reducers/notificationReducer'
import { deleteBlog } from '../reducers/blogReducer'
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Button,
  List,
  ListItem,
  TextField,
  Box,
} from '@mui/material'

const BlogView = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [showLikes, setShowLikes] = useState(0)
  const [newComment, setNewComment] = useState('')

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogService.getById(id)
        setBlog(blog)
        setShowLikes(blog.likes)
      } catch (error) {
        console.error('Failed to fetch blog', error)
      }
    }

    fetchBlog()
  }, [id])

  const handleComments = async () => {
    try {
      const fullUser = blog.user
      const updatedComments = blog.comments.concat(newComment)
      const updatedUser = user ? user.id : null
      const updatedBlog = {
        ...blog,
        user: updatedUser,
        comments: updatedComments,
      }

      await blogService.update(id, updatedBlog)
      setBlog({ ...updatedBlog, user: fullUser })
      setNewComment('')
      dispatch(newBlogNotification('INFO: You added a comment'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (error) {
      console.error('Failed to add comments', error)
    }
  }

  const delBlog = async () => {
    const confirmed = window.confirm(
      `Do you really want to remove ${blog.title}?`
    )
    if (confirmed) {
      try {
        await blogService.delById(id)
        dispatch(deleteBlog(id))
        dispatch(newBlogNotification(`INFO: ${blog.title} has been deleted`))
        setTimeout(() => {
          dispatch(clearNotification())
        }, 5000)
        navigate('/')
      } catch (error) {
        console.error('Failed to delete blog', error)
      }
    }
  }

  const handleAddLike = async () => {
    const fullUser = blog.user
    try {
      const updatedBlog = { ...blog, user: user.id, likes: blog.likes + 1 }
      await blogService.update(id, updatedBlog)
      setBlog({ ...updatedBlog, user: fullUser })
      setShowLikes(updatedBlog.likes)
      dispatch(newBlogNotification('INFO: You liked the blog!'))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 5000)
    } catch (error) {
      console.error('Failed to add like', error)
    }
  }

  if (!blog) {
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
          {blog.title} by {blog.author}
          {blog.user.name === user.name && (
            <Button id="deleteButton" onClick={delBlog}>
              Delete
            </Button>
          )}
        </Typography>
        <Typography variant="body1" gutterBottom>
          <a href={blog.url} target="_blank" rel="noopener noreferrer">
            {blog.url}
          </a>
        </Typography>
        <Typography variant="body1" gutterBottom>
          {showLikes} Likes
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddLike}
            sx={{ ml: 2 }}
          >
            Like
          </Button>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Added by {blog.user ? blog.user.name : 'Unknown'}
        </Typography>
        <Typography variant="h6" component="h3" gutterBottom>
          Comments:
        </Typography>
        <List>
          {blog.comments && blog.comments.length > 0 ? (
            blog.comments.map((comment, index) => (
              <ListItem key={index}>
                <Typography variant="body2">{comment}</Typography>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <Typography variant="body2">No comments yet</Typography>
            </ListItem>
          )}
        </List>
        <Box display="flex" alignItems="center" mt={2}>
          <TextField
            variant="outlined"
            label="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleComments}
            sx={{ ml: 2 }}
          >
            Add Comment
          </Button>
        </Box>
      </CardContent>
    </Card>
  )
}

export default BlogView
