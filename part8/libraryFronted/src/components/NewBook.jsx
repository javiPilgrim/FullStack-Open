import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
    addBook(title: $title, published: $published, author: $author, genres: $genres) {
      title
      author {
        name
      }
      published
    }
  }
`;

const NewBook = () => {
  const [title, setTitle] = useState("");
  const [published, setPublished] = useState("");
  const [author, setAuthor] = useState("");
  const [genres, setGenres] = useState([]);
  const [addBook] = useMutation(ADD_BOOK);

  const token = localStorage.getItem("token");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token) {
      alert("You must be logged in to add a book.");
      return;
    }

    await addBook({
      variables: {
        title,
        published: parseInt(published),
        author,
        genres,
      },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
  };

  return (
    <div>
      <h2>Add a New Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label>Published Year</label>
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
          />
        </div>
        <div>
          <label>Genres</label>
          <input
            type="text"
            value={genres}
            onChange={(e) => setGenres(e.target.value.split(","))}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default NewBook;

