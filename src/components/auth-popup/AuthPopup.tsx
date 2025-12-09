import React, { useEffect, useRef, useState } from "react";
import "./AuthPopup.scss";

type Mode = "login" | "signup" | "recover-email" | "recover-code" | "recover-reset";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess?: (user?: any) => void;
}

export default function AuthPopup({ isOpen, onClose, onAuthSuccess }: Props) {
  const [mode, setMode] = useState<Mode>("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup fields
  const [signupEmail, setSignupEmail] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  // Recover fields
  const [recoverEmail, setRecoverEmail] = useState("");
  const [recoverCode, setRecoverCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);

  const modalRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Trap focus basic (optional improvement)
  useEffect(() => {
    if (!isOpen) return;
    const previousActive = document.activeElement as HTMLElement | null;
    modalRef.current?.focus();
    return () => previousActive?.focus();
  }, [isOpen]);

  // reset on close
  useEffect(() => {
    if (!isOpen) {
      setMode("login");
      setError(null);
      setLoading(false);
      setLoginEmail("");
      setLoginPassword("");
      setSignupEmail("");
      setSignupUsername("");
      setSignupPassword("");
      setRecoverEmail("");
      setRecoverCode("");
      setNewPassword("");
    }
  }, [isOpen]);

  // --- Helpers (replace with real api calls) ---
  async function fakeApiDelay<T>(result: T, ms = 800) {
    return new Promise<T>((res) => setTimeout(() => res(result), ms));
  }

  // --- Handlers ---
  async function handleLogin(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);

    if (!loginEmail || !loginPassword) {
      setError("Por favor ingresa email y contraseña.");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real API call
      const user = await fakeApiDelay({ id: "u1", email: loginEmail });
      setLoading(false);
      onAuthSuccess?.(user);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err?.message ?? "Error al iniciar sesión.");
    }
  }

  async function handleSignup(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);

    if (!signupEmail || !signupUsername || !signupPassword) {
      setError("Completa todos los campos para crear la cuenta.");
      return;
    }
    if (signupPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setLoading(true);
    try {
      // TODO: replace with real API call
      const user = await fakeApiDelay({
        id: "u_new",
        email: signupEmail,
        username: signupUsername,
      }, 900);
      setLoading(false);
      onAuthSuccess?.(user);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err?.message ?? "Error al crear la cuenta.");
    }
  }

  // Start password recovery (send code)
  async function handleSendRecoveryEmail(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!recoverEmail) {
      setError("Ingresa el email de tu cuenta.");
      return;
    }
    setLoading(true);
    try {
      // TODO: request backend to send code
      await fakeApiDelay(true, 900);
      setLoading(false);
      setMode("recover-code");
    } catch (err: any) {
      setLoading(false);
      setError(err?.message ?? "Error enviando código.");
    }
  }

  // Verify code step
  async function handleVerifyCode(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!recoverCode) {
      setError("Ingresa el código de recuperación que recibiste.");
      return;
    }
    setLoading(true);
    try {
      // TODO: verify code with backend
      await fakeApiDelay(true, 700);
      setLoading(false);
      setMode("recover-reset");
    } catch (err: any) {
      setLoading(false);
      setError(err?.message ?? "Código inválido.");
    }
  }

  // Final reset password
  async function handleResetPassword(e?: React.FormEvent) {
    e?.preventDefault();
    setError(null);
    if (!newPassword || newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    setLoading(true);
    try {
      // TODO: call backend to set new password for email/recoverCode
      await fakeApiDelay(true, 900);
      setLoading(false);
      // After reset, go to login
      setMode("login");
      setRecoverCode("");
      setNewPassword("");
    } catch (err: any) {
      setLoading(false);
      setError(err?.message ?? "Error actualizando la contraseña.");
    }
  }

  // Minimal email validator
  function isValidEmail(email: string) {
    return /\S+@\S+\.\S+/.test(email);
  }

  // Renderers for each panel
  function renderLogin() {
    return (
      <>
        <h2 className="auth-title">Iniciar sesión</h2>
        <p className="auth-subtitle">Accede con tu correo y contraseña.</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <label className="field">
            <span className="field-label">Correo</span>
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              aria-label="email"
              className="field-input"
            />
          </label>

          <label className="field">
            <span className="field-label">Contraseña</span>
            <div className="password-row">
              <input
                type={showLoginPassword ? "text" : "password"}
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Contraseña"
                required
                aria-label="password"
                className="field-input"
              />
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowLoginPassword((s) => !s)}
                aria-label={showLoginPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showLoginPassword ? eyeSlashIcon : eyeIcon}
              </button>
            </div>
          </label>

          <div className="form-row spaced">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Iniciar sesión"}
            </button>
            <button
              type="button"
              className="btn-link"
              onClick={() => {
                setMode("recover-email");
                setError(null);
              }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
        </form>

        <div className="divider">o</div>

        <div className="socials">
          {/* Placeholder social buttons: replace or remove */}
          <button className="btn-outline" onClick={() => alert("Login con Google (implementa API)")}>
            Iniciar con Google
          </button>
        </div>

        <div className="switch">
          ¿No tienes cuenta?{" "}
          <button
            className="btn-link"
            onClick={() => {
              setMode("signup");
              setError(null);
            }}
          >
            Crear cuenta
          </button>
        </div>
      </>
    );
  }

  function renderSignup() {
    return (
      <>
        <h2 className="auth-title">Crear cuenta</h2>
        <p className="auth-subtitle">Regístrate con tu email, elige un nombre de usuario y contraseña.</p>

        <form className="auth-form" onSubmit={handleSignup}>
          <label className="field">
            <span className="field-label">Correo</span>
            <input
              type="email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="field-input"
            />
          </label>

          <label className="field">
            <span className="field-label">Nombre de usuario</span>
            <input
              type="text"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              placeholder="nombre_de_usuario"
              required
              className="field-input"
            />
          </label>

          <label className="field">
            <span className="field-label">Contraseña</span>
            <div className="password-row">
              <input
                type={showSignupPassword ? "text" : "password"}
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                required
                className="field-input"
              />
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowSignupPassword((s) => !s)}
                aria-label={showSignupPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showSignupPassword ? eyeSlashIcon : eyeIcon}
              </button>
            </div>
          </label>

          <div className="form-row">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Creando..." : "Crear cuenta"}
            </button>
          </div>
        </form>

        <div className="switch">
          ¿Ya tienes cuenta?{" "}
          <button
            className="btn-link"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
          >
            Iniciar sesión
          </button>
        </div>
      </>
    );
  }

  function renderRecoverEmail() {
    return (
      <>
        <h2 className="auth-title">Recuperar contraseña</h2>
        <p className="auth-subtitle">Ingresa el correo asociado a tu cuenta para recibir un código.</p>

        <form className="auth-form" onSubmit={handleSendRecoveryEmail}>
          <label className="field">
            <span className="field-label">Correo</span>
            <input
              type="email"
              value={recoverEmail}
              onChange={(e) => setRecoverEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              className="field-input"
            />
          </label>

          <div className="form-row">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Enviar código"}
            </button>
          </div>
        </form>

        <div className="switch">
          ¿Recordaste tu contraseña?{" "}
          <button
            className="btn-link"
            onClick={() => {
              setMode("login");
              setError(null);
            }}
          >
            Volver a iniciar sesión
          </button>
        </div>
      </>
    );
  }

  function renderRecoverCode() {
    return (
      <>
        <h2 className="auth-title">Ingresa el código</h2>
        <p className="auth-subtitle">Revisa tu correo y coloca el código que te enviamos.</p>

        <form className="auth-form" onSubmit={handleVerifyCode}>
          <label className="field">
            <span className="field-label">Código</span>
            <input
              type="text"
              value={recoverCode}
              onChange={(e) => setRecoverCode(e.target.value)}
              placeholder="Código de 6 dígitos"
              required
              className="field-input"
            />
          </label>

          <div className="form-row spaced">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Verificando..." : "Verificar código"}
            </button>
            <button
              type="button"
              className="btn-outline"
              onClick={() => {
                setMode("recover-email");
                setError(null);
              }}
            >
              Reenviar código / Cambiar email
            </button>
          </div>
        </form>
      </>
    );
  }

  function renderRecoverReset() {
    return (
      <>
        <h2 className="auth-title">Nueva contraseña</h2>
        <p className="auth-subtitle">Elige una nueva contraseña para tu cuenta.</p>

        <form className="auth-form" onSubmit={handleResetPassword}>
          <label className="field">
            <span className="field-label">Nueva contraseña</span>
            <div className="password-row">
              <input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Nueva contraseña"
                required
                className="field-input"
              />
              <button
                type="button"
                className="btn-icon"
                onClick={() => setShowNewPassword((s) => !s)}
                aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
              >
                {showNewPassword ? eyeSlashIcon : eyeIcon}
              </button>
            </div>
          </label>

          <div className="form-row">
            <button className="btn-primary" type="submit" disabled={loading}>
              {loading ? "Guardando..." : "Guardar contraseña"}
            </button>
          </div>
        </form>
      </>
    );
  }

  if (!isOpen) return null;

  return (
    <div
      className={`auth-backdrop ${isOpen ? "visible" : ""}`}
      role="dialog"
      aria-modal="true"
      onMouseDown={(e) => {
        // close if click on backdrop
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`auth-modal slide-in`}
        ref={modalRef}
        tabIndex={-1}
        aria-labelledby="auth-title"
      >
        <button className="close-btn" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <div className="auth-content">
          <div className="auth-left">
            {/* left graphic / info */}
            <div className="brand">
              <strong>MiCV</strong>
              <span>Crea y administra tu CV</span>
            </div>
            <div className="auth-illustration" aria-hidden>
              {/* simple decorative illustration (SVG) */}
              <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="12" width="152" height="96" rx="12" fill="#f5f7fb"/>
                <rect x="20" y="28" width="120" height="12" rx="6" fill="#e6eefc"/>
                <rect x="20" y="52" width="80" height="10" rx="5" fill="#e6eefc"/>
                <rect x="20" y="72" width="110" height="10" rx="5" fill="#e6eefc"/>
              </svg>
            </div>
          </div>

          <div className="auth-right">
            <div id="auth-title" className="auth-panel">
              {error && <div className="error">{error}</div>}

              {mode === "login" && renderLogin()}
              {mode === "signup" && renderSignup()}
              {mode === "recover-email" && renderRecoverEmail()}
              {mode === "recover-code" && renderRecoverCode()}
              {mode === "recover-reset" && renderRecoverReset()}
            </div>

            <div className="auth-footer small">
              <span>Al usar el servicio aceptas los <button className="btn-link">Términos</button> y <button className="btn-link">Privacidad</button>.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --- Inline svgs/icons --- */
const eyeIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 5C7 5 2.73 8.11 1 12c1.73 3.89 6 7 11 7s9.27-3.11 11-7c-1.73-3.89-6-7-11-7z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const eyeSlashIcon = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M17.94 17.94C16.18 19.1 14.14 19.8 12 19.8c-5 0-9.27-3.11-11-7 1.07-2.41 2.79-4.4 4.85-5.7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M1 1l22 22" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
