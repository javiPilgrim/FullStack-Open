import { useState } from 'react'


const CreateBlog = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) =>{
    event.preventDefault()
    createNewBlog({
      title: title,
      author: author,
      url: url
    })
    setNewBlog('')
    setAuthor('')
    setTitle('')
    setUrl('')
  }
  
  return(
    <div>
      <div>
        <h2>Create a New Blog</h2>
      </div>
            <form onSubmit={addBlog}>
        <div>
          Title: 
            <input
            type="text"
            value={title}
            name="title"
            onChange={event => setTitle(event.target.value)}
          />
        </div>
        <div>
          Author: 
            <input
            type="text"
            value={author}
            name="author"
            onChange={event => setAuthor(event.target.value)}
          />
        </div>
        <div>
          Url: 
            <input
            type="text"
            value={url}
            name="url"
            onChange={event => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>  
  )
  }
  
  export default CreateBlog