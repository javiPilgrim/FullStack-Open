import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import userService from '../services/users';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await userService.getById(id);
        setUser(user);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
  }



  return (
    <div>
      <h2>{user.name}</h2>
      <p>Username: {user.username}</p>
      <p>Added Blogs:</p>
      <ul>
      {user.blogs.map(blog=>(<li key={blog.id}>{blog.title}</li>))}
      </ul>
    </div>
  );
};

export default User;