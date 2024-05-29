import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import blogService from '../services/blogs';
import { useDispatch, useSelector } from 'react-redux';
import { newBlogNotification, clearNotification } from "../reducers/notificationReducer";

const BlogView = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showLikes, setShowLikes] = useState(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await blogService.getById(id);
        setBlog(blog);
        setShowLikes(blog.likes);
      } catch (error) {
        console.error('Failed to fetch blog', error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleAddLike = async () => {
    try {
      const updatedBlog = { ...blog, user: user.id, likes: blog.likes + 1 };
      await blogService.update(id, updatedBlog);
      setBlog(updatedBlog);
      setShowLikes(updatedBlog.likes);
      dispatch(newBlogNotification("INFO: You liked the blog!"));
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    } catch (error) {
      console.error('Failed to add like', error);
    }
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </a>
      <p>{showLikes} Likes <button onClick={handleAddLike}>Like</button></p>
      
    </div>
  );
};

export default BlogView;