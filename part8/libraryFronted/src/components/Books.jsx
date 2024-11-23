import { gql, useQuery } from "@apollo/client";
import { useState, useEffect } from "react";

// Nueva consulta de GraphQL que acepta un argumento "genre"
const ALL_BOOKS_BY_GENRE = gql`
  query allBooksByGenre($genre: String) {
    allBooks(genre: $genre) {
      title
      author {
        name
      }
      published
      genres
    }
  }
`;

const ME = gql`
  query {
    me {
      favoriteGenre
    }
  }
`;

const Books = ({ show }) => {
  const [selectedGenre, setSelectedGenre] = useState(null); // Género seleccionado
  const [showAllGenres, setShowAllGenres] = useState(true); // Estado para controlar la visualización de todos los géneros
  const { data: booksData, loading: booksLoading, error: booksError, refetch } = useQuery(ALL_BOOKS_BY_GENRE, {
    variables: { genre: selectedGenre }, // Enviamos el género como variable de consulta
    fetchPolicy: "network-only", // Evitar usar caché
  });

  const { data: meData, loading: meLoading, error: meError } = useQuery(ME);

  if (booksLoading || meLoading) {
    return <div>Loading...</div>;
  }

  if (booksError) {
    console.error("Error fetching books:", booksError);
    return <div>Error fetching books: {booksError.message}</div>;
  }

  if (meError) {
    console.error("Error fetching user data:", meError);
    return <div>Error fetching user data: {meError.message}</div>;
  }

  const books = booksData?.allBooks || [];

  // Obtener los géneros únicos de todos los libros
  const genres = Array.from(new Set(books.flatMap((book) => book.genres)));

  // Obtener el género favorito del usuario
  const favoriteGenre = meData?.me?.favoriteGenre;

  // Función para manejar la selección de género
  const handleGenreSelect = (genre) => {
    setShowAllGenres(false); // Desactivar mostrar todos los géneros
    setSelectedGenre(genre); // Establecer el género seleccionado
    refetch(); // Refrescar los datos de libros cuando se selecciona un género
  };

  // Función para mostrar todos los géneros
  const showAllBooks = () => {
    setShowAllGenres(true); // Mostrar todos los géneros
    setSelectedGenre(null); // Reiniciar género seleccionado
    refetch(); // Refrescar los datos de libros
  };

  // Función para mostrar solo los libros del género favorito del usuario
  const showFavoriteGenre = () => {
    setShowAllGenres(false); // Desactivar mostrar todos los géneros
    setSelectedGenre(favoriteGenre); // Filtrar por el género favorito
    refetch(); // Refrescar los datos de libros
  };

  return (
    <div>
      <h2>Books</h2>

      {/* Mostrar los botones para los géneros */}
      <div>
        <button onClick={showAllBooks}>All genres</button>
        {genres.map((genre) => (
          <button key={genre} onClick={() => handleGenreSelect(genre)}>
            {genre}
          </button>
        ))}

        {/* Botón para mostrar solo los libros del género favorito del usuario */}
        {favoriteGenre && (
          <button onClick={showFavoriteGenre}>
            Favorite Genre
          </button>
        )}
      </div>

      {/* Tabla para mostrar los libros filtrados */}
      <table>
        <tbody>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author ? book.author.name : "Unknown"}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;