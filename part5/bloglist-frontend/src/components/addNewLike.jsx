import { useState } from "react";

const useNewLike = ({ newLike }) => {
  const [newBlog, setNewBlog] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addLike = (event) => {
    event.preventDefault();
    console.log(newLike, newBlog);
    createNewLike({
      title: title,
      author: author,
      url: url,
    });
    setNewBlog("");
    setAuthor("");
    setTitle("");
    setUrl("");
    window.location.reload();
  };
  console.log(addLike);
};

export default useNewLike;
