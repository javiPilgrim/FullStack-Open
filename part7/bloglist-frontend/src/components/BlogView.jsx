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
    const fullUser = blog.user;
    try {
      const updatedBlog = { ...blog, user: user.id, likes: blog.likes + 1 };
      await blogService.update(id, updatedBlog);
      setBlog({...updatedBlog, user: fullUser});
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
      <p>Added by {blog.user.name}</p>
      <p>Comments:</p>
      <ul>
      {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))
        ) : (
          <li>No comments yet</li>
        )}
      </ul>
      
    </div>
  );
};

export default BlogView;