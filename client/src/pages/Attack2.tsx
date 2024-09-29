import { useState, useEffect } from 'react';
import axios from 'axios';

const Attack2 = () => {
  const [currentUser, setCurrentUser] = useState<{ id: number, name: string }>();

  useEffect(() => {
    axios.get('http://localhost:5000/api/auth/current-user')
      .then((res) => {
        setCurrentUser(res.data.user);
      });
  }, []);

  return (
    <div className="text-white p-8">
      <h2 className="text-3xl">XSS Attack Demonstration</h2>
      <p className="mt-4">Logged in User: {currentUser ? currentUser.name : 'No user'}</p>
    </div>
  );
};

export default Attack2;
