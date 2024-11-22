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

const Authors = ({ show }) => {
  const [selectedAuthor, setSelectedAuthor] = useState(null); // Autor seleccionado
  const [year, setYear] = useState("");

  const { loading, error, data } = useQuery(ALL_AUTHORS, {
    fetchPolicy: 'network-only', // Asegurarse de que no se use cache
  });

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }], // Refrescar la consulta
  });

  if (!show) {
    return null;
  }

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


  const authorOptions = data.allAuthors.map((author) => ({
    value: author.name,
    label: author.name,
  }));

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

      setSelectedAuthor(null);
      setYear("");
    } catch (error) {
      console.error("Error updating author:", error);
    }
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born || "unknown"}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birth year</h3>
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
          <label>Year of birth</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>
        <button type="submit">Update author</button>
      </form>
    </div>
  );
};

export default Authors;
