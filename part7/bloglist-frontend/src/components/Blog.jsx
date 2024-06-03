import { Link } from 'react-router-dom'
import { Card, CardContent, Typography, Box } from '@mui/material'

function Blog({ blog }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="h6" component="div">
            Blog: <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Author: {blog.author}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Blog
