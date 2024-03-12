const Login = ({ handleSubmit, username, handleNameChange, password, handlePasswordChange }) => (
    <div>
            <form onSubmit={handleSubmit}>
        <div>
          username: 
            <input
            type="text"
            value={username}
            name="Username"
            onChange={handleNameChange}
          />
        </div>
        <div>
          password: 
            <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>  
  )

  
  export default Login