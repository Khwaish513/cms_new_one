import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers
      ? JSON.parse(storedUsers)
      : [{ username: 'admin', password: 'password' }];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (username, password) => {
    const found = users.find(
      (u) => u.username === username && u.password === password
    );
    if (found) {
      setUser({ username });
      return true;
    }
    return false;
  };

  const signup = (username, password) => {
    const exists = users.some((u) => u.username === username);
    if (exists) return { success: false, message: 'Username already taken' };

    const newUser = { username, password };
    setUsers((prev) => [...prev, newUser]); // ✅ add user to list
    setUser({ username }); // ✅ log in new user immediately

    return { success: true };
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
