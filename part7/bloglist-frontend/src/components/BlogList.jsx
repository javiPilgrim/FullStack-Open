import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import Blog from './Blog'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import { initializeBlogs, createBlog } from '../reducers/blogReducer'

const BlogList = ({ notify }) => {
  const createBlogRef = useRef()
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)


  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll()
      dispatch(initializeBlogs(blogs))
    }
    fetchBlogs()
  }, [dispatch])

  const addBlog = async (newBlog) => {
    createBlogRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.createBlog(newBlog)
      console.log('Este es el retornado: ', returnedBlog)
      dispatch(createBlog(returnedBlog))
      notify(`${newBlog.title} has been added to the list`)
    } catch (error) {
      notify('Failed to add blog', 'ERROR')
    }
  }

  return (
    <div>
      <br />
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateBlog createNewBlog={addBlog} />
      </Togglable>
      <h2>blogs</h2>
      <ol>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <div key={blog.id}>
              <li>
                <Blog blog={blog} />
              </li>
            </div>
          ))}
      </ol>
    </div>
  )
}

export default BlogList
