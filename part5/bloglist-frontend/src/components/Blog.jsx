import { useState } from "react";

const Blog = ({ blog}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [showLikes, setShowLikes] = useState(false);
  return (
  <div style={blogStyle}>
    Blog: {blog.title} /  Author: {blog.author}
    <button onClick={() => setShowLikes(!showLikes)}>
        {showLikes ? "Ocultar" : "Mostrar"}
      </button>
      {showLikes && (
        <div>
          url: {blog.url} <br/>
          Likes: {blog.likes} <br/>
          user: {blog.user.name}
        </div>
      )}
  </div>  
  )
  }

export default Blog