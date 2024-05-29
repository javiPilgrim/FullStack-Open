
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Blog({ blog, delBlog }) {
  const user = useSelector((state) => state.user);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const deleteButton = {
    color: "white",
    backgroundColor: "red",
  };

  const [showItems, setShowItems] = useState(false);
  const [showLikes, setShowLikes] = useState(blog.likes);

  const handleDeleteBlog = async () => {
    await delBlog();
    setShowLikes(showLikes);
  };

  return (
    <div style={blogStyle} className="blogComponent">
      <div className="blogBasicInfo">
        Blog: <Link to={`/blogs/${blog.id}`} >{blog.title} </Link>/ Author: {blog.author}
      </div>
      <button id="mostrar" onClick={() => setShowItems(!showItems)}>
        {showItems ? "Ocultar" : "Mostrar"}
      </button>
      {showItems && (
        <div className="blogDetailedInfo">
          user: {blog.user.name}
          {blog.user.name === user.name && (
            <div>
              <br />
              <button
                id="deleteButton"
                style={deleteButton}
                onClick={handleDeleteBlog}
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;