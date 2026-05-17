import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import "./Register.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Validación de formulario
    if (!username.trim()) {
      setError("El nombre de usuario es requerido");
      return;
    }
    if (username.length < 3) {
      setError("El usuario debe tener al menos 3 caracteres");
      return;
    }
    if (!email.trim()) {
      setError("El email es requerido");
      return;
    }
    if (!validateEmail(email)) {
      setError("Ingresa un email válido");
      return;
    }
    if (!password.trim()) {
      setError("La contraseña es requerida");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setLoading(true);
    try {
      await register(username, email, password);
      setSuccess(true);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Error al registrar usuario");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="decoration decoration-1"></div>
      <div className="decoration decoration-2"></div>
      <div className="register-card">
        <h2>Crear Cuenta</h2>
        <p className="subtitle">Regístrate para continuar</p>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Usuario:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Mínimo 3 caracteres"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@email.com"
            />
          </div>
          <div className="form-group">
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 6 caracteres"
            />
          </div>
          <div className="form-group">
            <label>Confirmar Contraseña:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Repite tu contraseña"
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          {success && (
            <div className="success-message">
              ¡Registro exitoso! Redirigiendo al login...
            </div>
          )}
          <button type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>
        <p className="login-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;