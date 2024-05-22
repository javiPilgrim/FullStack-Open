import { useState } from "react";

const CreateBlog = ({ createNewBlog }) => {
  const [newBlog, setNewBlog] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    createNewBlog({
      title: title,
      author: author,
      url: url,
    });
    setNewBlog("");
    setAuthor("");
    setTitle("");
    setUrl("");
  };

  return (
    <div>
      <div>
        <h2>Create a New Blog</h2>
      </div>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            id="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
          />
        </div>
        <div>
          Author:
          <input
            id="author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
          />
        </div>
        <div>
          Url:
          <input
            id="url"
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="url"
          />
        </div>
        <button id="createNewBlog" type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
