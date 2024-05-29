import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import blogService from "../services/blogs";
import Blog from "./Blog";
import CreateBlog from "./CreateBlog";
import Togglable from "./Togglable";
import { initializeBlogs, createBlog, deleteBlog } from "../reducers/blogReducer";

const BlogList = ({ notify }) => {
  const createBlogRef = useRef();
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchBlogs = async () => {
      const blogs = await blogService.getAll();
      dispatch(initializeBlogs(blogs));
    };
    fetchBlogs();
  }, [dispatch]);

  const addBlog = async (newBlog) => {
    createBlogRef.current.toggleVisibility();
    try {
      const returnedBlog = await blogService.createBlog(newBlog);
      dispatch(createBlog(returnedBlog));
      notify(`${newBlog.title} has been added to the list`);
    } catch (error) {
      notify("Failed to add blog", "ERROR");
    }
  };


  const delBlog = async (id) => {
    const blogToDelete = blogs.find(blog => blog.id === id);
    const confirmed = window.confirm(`Do you really want to remove ${blogToDelete.title}?`);
    if (confirmed) {
      try {
        await blogService.delById(id);
        dispatch(deleteBlog(id));
        notify(`${blogToDelete.title} has been deleted`);
      } catch (error) {
        notify("Failed to delete blog", "ERROR");
      }
    }
  };

  return (
    <div>
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
                <Blog
                  blog={blog}
                  delBlog={() => delBlog(blog.id)}
                  user={user}
                />
              </li>
            </div>
          ))}
      </ol>
    </div>
  );
};

export default BlogList;