import { useState } from "react";

function Blog({ blog, addLike, delBlog, user }) {
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

  const handleAddLike = async () => {
    await addLike(blog.id);
    setShowLikes(showLikes + 1);
  };

  const handleDeleteBlog = async () => {
    await delBlog(blog.id);
    setShowLikes(showLikes);
  };

  return (
    <div style={blogStyle} className="blogComponent">
      <div className="blogBasicInfo">
      Blog: {blog.title} / Author: {blog.author}
      </div>
      <button id='mostrar' onClick={() => setShowItems(!showItems)}>
        {showItems ? "Ocultar" : "Mostrar"}
      </button>
      {showItems && (
        <div className="blogDetailedInfo">
          url: {blog.url} <br />
          Likes: {showLikes} <button id='likeButton' onClick={handleAddLike}>Like</button>{" "}
          <br />
          user: {blog.user.name}
          {blog.user.name === user.name && (
            <div>
              <br />
              <button id='deleteButton' style={deleteButton} onClick={handleDeleteBlog}>
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
