import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';

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
  const [title, setTitle] = useState('');
  const [published, setPublished] = useState('');
  const [author, setAuthor] = useState('');
  const [genres, setGenres] = useState([]);
  const [addBook, { loading, error }] = useMutation(ADD_BOOK, {
    onError: (err) => {
      console.error('Error adding book:', err);
      alert(`Error: ${err.message}`);
    },
    onCompleted: (data) => {
      console.log('Book added successfully:', data);
      alert('Book added successfully!');
      resetForm();
    },
  });

  const resetForm = () => {
    setTitle('');
    setPublished('');
    setAuthor('');
    setGenres([]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log('Formulario enviado con los siguientes datos:');
    console.log({ title, published, author, genres });

    // Validación de campos
    if (!title || !author || !published || isNaN(parseInt(published, 10))) {
      alert('Please fill in all fields correctly.');
      return;
    }

    // Comprobación del token y los encabezados
    const token = localStorage.getItem('token');  // O usa el almacenamiento adecuado según tu aplicación
    if (!token) {
      alert('No token found, please log in first.');
      return;
    }

    // Comprobación de la solicitud de GraphQL antes de enviarla
    try {

      const response = await addBook({
        variables: {
          title,
          published: parseInt(published, 10),
          author,
          genres,
        },
        context: {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      });

      console.log('Respuesta de la mutación GraphQL:', response);
    } catch (err) {
      console.error('Error al hacer la mutación:', err);
    }
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
            disabled={loading}
          />
        </div>
        <div>
          <label>Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label>Published Year</label>
          <input
            type="number"
            value={published}
            onChange={(e) => setPublished(e.target.value)}
            disabled={loading}
          />
        </div>
        <div>
          <label>Genres (comma-separated)</label>
          <input
            type="text"
            value={genres.join(',')}
            onChange={(e) => setGenres(e.target.value.split(','))}
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Book'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red' }}>
          <p>Error: {error.message}</p>
        </div>
      )}
    </div>
  );
};

export default NewBook;

