import { useState } from "react";

const Blog = ({ blog, addLike }) => {
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
          Likes: {blog.likes} <button onClick={addLike}>Like</button> <br/>
          user: {blog.user.name}
        </div>
      )}
  </div>  
  )
  }
/*
  const newLike = ({ newLike }) => {
    const [newBlog, setNewBlog] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [like, setLike] = useState('')
  
    const addBLike = (event) =>{
      event.preventDefault()
      createNewLike({
        title: title,
        author: author,
        url: url
      })
      window.location.reload()
    }
}
*/

export default Blog