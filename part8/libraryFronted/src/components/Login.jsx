import { useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useMutation(LOGIN);
  const navigate = useNavigate();
  const client = useApolloClient(); // Obtener el cliente de Apollo

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { username, password },
      });
      localStorage.setItem("token", data.login.value); // Almacenar el token
      console.log("Token saved in localStorage:", data.login.value);

      await client.resetStore(); // Limpiar y reiniciar el caché después del login
      navigate("/"); // Redirigir a la página principal
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;