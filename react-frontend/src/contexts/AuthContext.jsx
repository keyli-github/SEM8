import { createContext, useState, useEffect } from "react";
import AuthService from "../services/AuthService";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const storedUser = AuthService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
      setRoles(storedUser.roles || []);
    }
  }, []);

  const login = async (username, password) => {
    const data = await AuthService.login(username, password);
    setUser(data);
    setRoles(data.roles || []);
    return data;
  };

  const register = async (username, email, password) => {
    return await AuthService.register(username, email, password);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setRoles([]);
  };

  const hasRole = (role) => {
    // Los roles vienen como "ROLE_USER", "ROLE_ADMIN", etc.
    const roleName = `ROLE_${role.toUpperCase()}`;
    return roles.includes(roleName);
  };

  const isAdmin = () => hasRole("admin");
  const isModerator = () => hasRole("moderator");
  const isUser = () => hasRole("user");

  return (
    <AuthContext.Provider
      value={{
        user,
        roles,
        login,
        register,
        logout,
        hasRole,
        isAdmin,
        isModerator,
        isUser,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};