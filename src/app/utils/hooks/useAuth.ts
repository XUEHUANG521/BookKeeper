import { jwtDecode } from 'jwt-decode';
import { useState, useEffect } from 'react';

const useAuth = () => {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
	  const decoded: { username: string } = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  return username;
};

export default useAuth;
