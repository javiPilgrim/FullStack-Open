
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { initializeUsers } from '../reducers/usersReducer';
import userService from '../services/users'
import { Link } from 'react-router-dom';


const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUsers = async () => {
      const users = await userService.getAll();
      dispatch(initializeUsers(users));
      setLoading(false);
    };

    initUsers();
  }, [dispatch]);


  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td> <Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;