import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import "./Home.css";

const Home = () => {
  const { user, isAdmin, isModerator } = useContext(AuthContext);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      const token = user?.accessToken;
      const config = {
        headers: { "x-access-token": token },
      };

      try {
        // Cargar contenido público
        const publicRes = await axios.get(
          "/api/test/all",
          config
        );
        setContent((prev) => ({ ...prev, public: publicRes.data }));

        // Cargar contenido de usuario
        const userRes = await axios.get(
          "/api/test/user",
          config
        );
        setContent((prev) => ({ ...prev, user: userRes.data }));

        // Cargar contenido de moderador si tiene el rol
        if (isModerator()) {
          const modRes = await axios.get(
            "/api/test/mod",
            config
          );
          setContent((prev) => ({ ...prev, mod: modRes.data }));
        }

        // Cargar contenido de admin si tiene el rol
        if (isAdmin()) {
          const adminRes = await axios.get(
            "/api/test/admin",
            config
          );
          setContent((prev) => ({ ...prev, admin: adminRes.data }));
        }
      } catch (err) {
        console.error("Error fetching content:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchContent();
    }
  }, [user, isAdmin, isModerator]);

  if (!user) {
    return (
      <div className="home-container">
        <div className="home-card">
          <h2>Bienvenido</h2>
          <p>Por favor, inicia sesión para ver el contenido.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="home-card">
        <h2>Panel de Usuario</h2>
        <p className="welcome-text">Bienvenido, {user.username}</p>
        
        <div className="user-info">
          <h3>Informacion de tu cuenta</h3>
          <div className="info-row">
            <span className="info-label">Usuario:</span>
            <span className="info-value">{user.username}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Roles:</span>
            <span className="info-value">{user.roles?.map(r => r.replace('ROLE_', '')).join(", ")}</span>
          </div>
        </div>

        {loading ? (
          <p className="loading-text">Cargando contenido...</p>
        ) : (
          <div className="content-sections">
            <div className="content-section public">
              <h3>Contenido Publico</h3>
              <p>{content.public}</p>
            </div>

            <div className="content-section user">
              <h3>Contenido de Usuario</h3>
              <p>{content.user}</p>
            </div>

            {isModerator() && (
              <div className="content-section mod">
                <h3>Contenido de Moderador</h3>
                <p>{content.mod}</p>
              </div>
            )}

            {isAdmin() && (
              <div className="content-section admin">
                <h3>Contenido de Administrador</h3>
                <p>{content.admin}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;