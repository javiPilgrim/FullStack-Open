import { gql, useQuery } from "@apollo/client";

const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      author
      published
    }
  }
`;

const Books = (props) => {
  // Ejecuta la consulta GraphQL
  const { data, loading, error } = useQuery(ALL_BOOKS);

  // Si el componente no debe mostrarse, retorna null
  if (!props.show) {
    return null;
  }

  // Muestra un indicador de carga mientras los datos están siendo recuperados
  if (loading) {
    return <div>Loading...</div>;
  }

  // Muestra un mensaje de error si ocurre algún problema con la consulta
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Recupera los libros desde los datos obtenidos
  const books = data.allBooks;

  return (
    <div>
      <h2>books</h2>

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
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;


