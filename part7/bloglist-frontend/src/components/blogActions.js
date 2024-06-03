import blogService from '../services/blogs'

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'SET_BLOGS',
      payload: blogs,
    })
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch) => {
    const returnedBlog = await blogService.createBlog(newBlog)
    dispatch({
      type: 'ADD_BLOG',
      payload: returnedBlog,
    })
  }
}
