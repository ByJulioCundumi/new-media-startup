import { useState } from "react";
import "./signupform.scss";
import { signup } from "../../../api/auth";

interface Props {
  goLogin: () => void;
  onSignupSuccess?: (user: { id: string; email: string; userName: string; favoriteTemplates: string[] }) => void;
}

function SignupForm({ goLogin, onSignupSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await signup(email, username, password);
      if (res.user) {
        onSignupSuccess?.(res.user);
      } else {
        setError(res.message || "Error creando la cuenta");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signupform">
      <h2 className="signupform__title">Crear Cuenta</h2>
      <p className="signupform__subtitle">Únete y crea tu CV profesional en minutos</p>

      <form className="signupform__form" onSubmit={handleSignup}>
        <div className="signupform__input-group">
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="tuemail@correo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="signupform__input-group">
          <label htmlFor="username">Nombre de usuario</label>
          <input
            id="username"
            type="text"
            placeholder="Escribe un nombre único"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="signupform__input-group">
          <label htmlFor="password">Contraseña</label>
          <div className="signupform__password-wrapper">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Mínimo 8 caracteres"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="signupform__showpass"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        <button className="signupform__btn" type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear Cuenta"}
        </button>
      </form>

      <p className="signupform__switch">
        ¿Ya tienes una cuenta? <span onClick={goLogin}>Inicia sesión</span>
      </p>
    </div>
  );
}

export default SignupForm;