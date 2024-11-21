import { useState } from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $favoriteGenre: String!, $password: String!) {
    createUser(username: $username, favoriteGenre: $favoriteGenre, password: $password) {
      id
      username
      favoriteGenre
    }
  }
`;

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [favoriteGenre, setFavoriteGenre] = useState("");
  const [password, setPassword] = useState("");  // Agregar campo de contraseña

  // Define la mutación de Apollo
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log("User created:", data.createUser);
    },
    onError: (error) => {
      console.log("Error:", error.message);
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Llama a la mutación de Apollo Client con la contraseña
      await createUser({
        variables: {
          username,
          favoriteGenre,
          password, // Pasar la contraseña
        },
      });

      // Limpia los campos después de la creación
      setUsername("");
      setFavoriteGenre("");
      setPassword("");  // Limpiar la contraseña también
    } catch (error) {
      console.log("Error al crear usuario", error);
    }
  };

  return (
    <div>
      <h2>Create New User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Favorite Genre:</label>
          <input
            type="text"
            value={favoriteGenre}
            onChange={(e) => setFavoriteGenre(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"  // Asegúrate de que la contraseña sea de tipo "password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUser;
