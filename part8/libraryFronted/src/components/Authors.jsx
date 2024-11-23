import { useState } from "react";
import Select from "react-select"; // Importar react-select
import { gql, useMutation, useQuery } from "@apollo/client";

export const ALL_AUTHORS = gql`
  query ALL_AUTHORS {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;

const Authors = () => {
  const [selectedAuthor, setSelectedAuthor] = useState(null); // Autor seleccionado
  const [year, setYear] = useState("");

  // Consulta para obtener todos los autores
  const { loading, error, data } = useQuery(ALL_AUTHORS, {
    fetchPolicy: "network-only", // Asegurarse de que no se use caché
  });

  // Mutación para editar el año de nacimiento del autor
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }], // Refrescar la consulta de autores después de editar
  });

  if (loading) {
    return <div>Loading authors...</div>;
  }

  if (error) {
    console.error("Error fetching authors:", error); // Mostrar el error en la consola
    return <div>Error: {error.message}</div>;
  }

  if (!data || !data.allAuthors) {
    return <div>No authors found</div>;
  }

  // Opciones para el selector de autores
  const authorOptions = data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

  // Manejador del envío del formulario
  const submit = async (event) => {
    event.preventDefault();

    if (!selectedAuthor) {
      alert("Please select an author");
      return;
    }

    try {
      await editAuthor({
        variables: {
          name: selectedAuthor.value,
          setBornTo: parseInt(year, 10),
        },
      });

      // Limpiar el formulario después de actualizar
      setSelectedAuthor(null);
      setYear("");
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <div>
      <h2>Authors</h2>
      {/* Tabla de autores */}
      <table>
        <thead>
          <tr>
            <th>Author</th>
            <th>Born</th>
            <th>Books</th>
          </tr>
        </thead>
        <tbody>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || "Unknown"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Formulario para establecer el año de nacimiento */}
      <h3>Set Birth Year</h3>
      <form onSubmit={submit}>
        <div>
          <label>Author</label>
          <Select
            value={selectedAuthor}
            onChange={setSelectedAuthor}
            options={authorOptions}
            placeholder="Select an author..."
          />
        </div>
        <div>
          <label>Year of Birth</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>
    </div>
  );
};

export default Authors;
