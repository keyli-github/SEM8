import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";

import "./App.css";

const AppRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        
        {/* Rutas de autenticación */}
        <Route 
          path="/login" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={isAuthenticated ? <Navigate to="/home" /> : <Register />} 
        />
        
        {/* Ruta protegida - cualquier usuario autenticado */}
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta protegida - solo admin */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta protegida - solo moderador */}
        <Route 
          path="/mod" 
          element={
            <ProtectedRoute requireModerator>
              <Home />
            </ProtectedRoute>
          } 
        />
        
        {/* Ruta catch-all */}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
