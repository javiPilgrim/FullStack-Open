import React, { useState, useEffect } from 'react'

function Blog({ blog, addLike, delBlog, user }) {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteButton = {
    color: "white",
    backgroundColor: "red"
  }

    const [showItems, setShowItems] = useState(false);
    const [showLikes, setShowLikes] = useState(blog.likes);

  
    const handleAddLike = async () => {
      await addLike(blog.id);
      setShowLikes(showLikes + 1);
      window.location.reload()
    };

    const handleDeleteBlog = async () => {
      await delBlog(blog.id);
      setShowLikes(showLikes)
    };
  
    return (
      <div style={blogStyle}>
        Blog: {blog.title} / Author: {blog.author}
        <button onClick={() => setShowItems(!showItems)}>
          {showItems ? 'Ocultar' : 'Mostrar'}
        </button>
        {showItems && (
          <div>
            url: {blog.url} <br />
            Likes: {showLikes} <button onClick={handleAddLike}>Like</button> <br />
            user: {blog.user.name}
            {blog.user.name === user.name &&(
              <div>
            <br/>
            <button style={deleteButton} onClick = {handleDeleteBlog} >Delete</button>
            </div>
            )}
          </div>
        )}
      </div>
    );
  }
  
  export default Blog;