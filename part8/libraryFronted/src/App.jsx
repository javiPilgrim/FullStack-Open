import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";

const App = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const logout = async () => {
    localStorage.removeItem("token");
    await client.clearStore();
    navigate("/login");
  };

  return (
    <div>
      {/* Barra de navegación siempre visible */}
      <nav>
        {isAuthenticated ? (
          <>
            <button onClick={() => navigate("/authors")}>Authors</button>
            <button onClick={() => navigate("/books")}>Books</button>
            <button onClick={() => navigate("/add")}>Add Book</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </nav>

      {/* Aquí se renderizan las rutas específicas dependiendo de la URL */}
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated && (
          <>
            {/* Rutas protegidas */}
            <Route path="/authors" element={<Authors />} />
            <Route path="/books" element={<Books />} />
            <Route path="/add" element={<NewBook />} />
            {/* Ruta por defecto */}
            <Route path="/" element={<Books />} />  {/* Redirige a /books */}
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
