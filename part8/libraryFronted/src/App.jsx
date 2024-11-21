import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import { gql, useQuery } from "@apollo/client";

const App = () => {
  const [page, setPage] = useState("authors");
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div>
      <div>
        {isAuthenticated ? (
          <>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>

      {isAuthenticated ? (
        <>
          <Authors show={page === "authors"} />
          <Books show={page === "books"} />
          <NewBook show={page === "add"} />
        </>
      ) : (
        <p>Please log in to access the functionality</p>
      )}
    </div>
  );
};

export default App;
