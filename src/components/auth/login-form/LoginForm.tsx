import { useState } from "react";
import "./loginform.scss";
import { IoMailOutline, IoLockClosedOutline, IoEye, IoEyeOff } from "react-icons/io5";
import { login, type AuthUser } from "../../../api/auth";

interface Props {
  goSignup: () => void;
  goRecovery: () => void;
  onLoginSuccess?: (user: AuthUser) => void;
}

export default function LoginForm({ goSignup, goRecovery, onLoginSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await login(email, password);
      if (res.user) {
        onLoginSuccess?.(res.user);
      } else {
        setError(res.message || "Error al iniciar sesión");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loginform">
      <div className="card">
        <h2 className="title">Bienvenido de nuevo</h2>
        <p className="subtitle">Ingresa tus datos para continuar</p>

        <form onSubmit={handleLogin} className="form">
          {/* EMAIL */}
          <div className="input-group">
            <label htmlFor="email">Correo electrónico</label>
            <div className="input-wrapper">
              <IoMailOutline className="icon" />
              <input
                id="email"
                type="email"
                placeholder="example@mail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="input-group">
            <label htmlFor="password">Contraseña</label>
            <div className="input-wrapper password-wrapper">
              <IoLockClosedOutline className="icon" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOff /> : <IoEye />}
              </span>
            </div>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Iniciando..." : "Iniciar sesión"}
          </button>
        </form>

        <div className="extra-options">
          <button className="link-btn" onClick={goSignup}>
            Crear cuenta
          </button>
          <button className="link-btn" onClick={goRecovery}>
            ¿Olvidaste tu contraseña?
          </button>
        </div>
      </div>
    </div>
  );
}