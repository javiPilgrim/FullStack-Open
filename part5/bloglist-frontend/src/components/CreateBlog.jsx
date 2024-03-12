const CreateBlog = ({ handleSubmit, title, handleTitleChange, author, handleAuthorChange,
            url, handleUrlChange }) => (
    <div>
            <form onSubmit={handleSubmit}>
        <div>
          Title: 
            <input
            type="text"
            value={title}
            name="title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          Author: 
            <input
            type="text"
            value={author}
            name="author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url: 
            <input
            type="text"
            value={url}
            name="url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>  
  )

  
  export default CreateBlog