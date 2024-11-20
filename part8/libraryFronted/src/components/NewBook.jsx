import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

// Define la mutación `addBook`
const ADD_BOOK = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int, $genres: [String!]) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      title
      author
    }
  }
`;

// Define las consultas que deben actualizarse automáticamente
const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const NewBook = (props) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  // Conectar con la mutación `addBook`
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }], // Actualiza las vistas de autores y libros
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    // Llamar a la mutación `addBook`
    try {
      await addBook({
        variables: {
          title,
          author,
          published: parseInt(published), // Convertir el año a número
          genres,
        },
      });
      console.log('Book added successfully!');

      // Limpiar el formulario
      setTitle('');
      setPublished('');
      setAuthor('');
      setGenres([]);
      setGenre('');
    } catch (error) {
      console.error('Error adding book:', error.message);
    }
  };

  const addGenre = () => {
    if (genre.trim()) {
      setGenres(genres.concat(genre));
      setGenre('');
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  );
};

export default NewBook;
