import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, isAdmin, isModerator, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/home">JWT Auth App</Link>
      </div>
      
      <div className="navbar-menu">
        {/* Links públicos */}
        <Link to="/home" className="navbar-item">Inicio</Link>
        
        {/* Links para usuarios autenticados */}
        {user && (
          <>
            <Link to="/home" className="navbar-item">Panel</Link>
            
            {/* Links solo para moderador y admin */}
            {(isModerator() || isAdmin()) && (
              <Link to="/home" className="navbar-item">Zona Moderación</Link>
            )}
            
            {/* Links solo para admin */}
            {isAdmin() && (
              <Link to="/home" className="navbar-item">Zona Admin</Link>
            )}
          </>
        )}
      </div>

      <div className="navbar-auth">
        {user ? (
          <div className="user-menu">
            <span className="user-name">
              {user.username} 
              <span className="user-roles">({user.roles?.join(", ")})</span>
            </span>
            <button onClick={handleLogout} className="logout-btn">
              Cerrar Sesión
            </button>
          </div>
        ) : (
          <>
            <Link to="/login" className="login-btn">Iniciar Sesión</Link>
            <Link to="/register" className="register-btn">Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;