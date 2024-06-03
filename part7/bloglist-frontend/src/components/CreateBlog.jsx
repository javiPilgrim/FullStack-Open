import { useState } from 'react'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const CreateBlog = ({ createNewBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createNewBlog({
      title: title,
      author: author,
      url: url,
    })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" component="h2" gutterBottom>
        Create a New Blog
      </Typography>
      <Box
        component="form"
        onSubmit={addBlog}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
        />
        <TextField
          id="author"
          label="Author"
          variant="outlined"
          value={author}
          onChange={(event) => setAuthor(event.target.value)}
          fullWidth
        />
        <TextField
          id="url"
          label="Url"
          variant="outlined"
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          fullWidth
        />
        <Button
          id="createNewBlog"
          type="submit"
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </Box>
    </Box>
  )
}

export default CreateBlog
