import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Copy,
  Check,
  LogOut,
  User,
  Mail,
  CreditCard,
  Lock,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { FaSave, FaCheckCircle } from "react-icons/fa";
import "./accountpage.scss";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";

function AccountPage() {
  // Datos simulados (en producción: desde auth/context/API)
  const user = {
    name: "María González",
    email: "maria.gonzalez@example.com",
    plan: "Plan Anual",
    affiliateCommission: 20,
    affiliateLink: "https://hotmart.com/es/link/maria123",
    referrals: 12,
    pendingEarnings: 156.40,
    isPaidPlan: true,
    isAffiliated: true,
  };

  // Estados
  const [copied, setCopied] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);

  // Cambio de contraseña
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
    setPasswordError(null);
  };

  const togglePasswordVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handlePasswordSubmit = (e: FormEvent) => {
    e.preventDefault();
    const { newPassword, confirmPassword } = passwordForm;

    if (newPassword !== confirmPassword) {
      setPasswordError("Las contraseñas nuevas no coinciden.");
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    // Simulación de éxito
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 3000);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setShowPasswordForm(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(user.affiliateLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="account-page">
      <div className="account-container">

        <div className="account-sections">
          {/* Información Personal */}
          <section className="account-card">
            <header className="card-header">
              <User size={24} />
              <h3>Información Personal</h3>
            </header>
            <div className="info-grid">
              <div className="info-item">
                <Mail size={18} />
                <div>
                  <span className="label">Correo electrónico</span>
                  <span className="value">{user.email}</span>
                </div>
              </div>
              <div className="info-item">
                <User size={18} />
                <div>
                  <span className="label">Nombre completo</span>
                  <span className="value">{user.name}</span>
                </div>
              </div>
            </div>
            <p className="card-note">
              Si necesitas modificar estos datos, contacta con soporte.
            </p>
          </section>

          {/* Plan Actual */}
          <section className="account-card">
            <header className="card-header">
              <CreditCard size={24} />
              <h3>Plan Actual</h3>
            </header>
            <div className="plan-content">
              <div className="plan-name">{user.plan}</div>
              <div className="plan-badge">{user.isPaidPlan ? "Premium" : "Gratuito"}</div>
            </div>
            <p className="card-note">
              {user.isPaidPlan
                ? "Acceso completo a todas las plantillas y funciones premium."
                : "Considera actualizar para más beneficios."}
            </p>
            {user.isPaidPlan && (
              <button
                className="action-btn danger"
                onClick={() => setShowCancelModal(true)}
              >
                Cancelar suscripción
              </button>
            )}
          </section>

          {/* Seguridad - Cambio de Contraseña */}
          <section className="account-card password-card">
            <header className="card-header">
              <Lock size={24} />
              <h3>Cambiar Contraseña</h3>
            </header>
            <p className="card-note">
              Actualiza tu contraseña periódicamente para mayor seguridad.
            </p>

            {!showPasswordForm ? (
              <button
                className="action-btn primary"
                onClick={() => setShowPasswordForm(true)}
              >
                Cambiar contraseña
              </button>
            ) : (
              <form onSubmit={handlePasswordSubmit} className="password-form">
                <div className="password-grid">
                  {/* Contraseña actual */}
                  <div className="password-field">
                    <label>Contraseña actual</label>
                    <div className="input-wrapper">
                      <MdLockOutline />
                      <input
                        type={showPasswords.current ? "text" : "password"}
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="visibility-btn"
                        onClick={() => togglePasswordVisibility("current")}
                      >
                        {showPasswords.current ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </div>
                  </div>

                  {/* Nueva contraseña */}
                  <div className="password-field">
                    <label>Nueva contraseña</label>
                    <div className="input-wrapper">
                      <MdLockOutline />
                      <input
                        type={showPasswords.new ? "text" : "password"}
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="visibility-btn"
                        onClick={() => togglePasswordVisibility("new")}
                      >
                        {showPasswords.new ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </div>
                  </div>

                  {/* Confirmar */}
                  <div className="password-field">
                    <label>Confirmar nueva contraseña</label>
                    <div className="input-wrapper">
                      <MdLockOutline />
                      <input
                        type={showPasswords.confirm ? "text" : "password"}
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        required
                      />
                      <button
                        type="button"
                        className="visibility-btn"
                        onClick={() => togglePasswordVisibility("confirm")}
                      >
                        {showPasswords.confirm ? <MdVisibilityOff /> : <MdVisibility />}
                      </button>
                    </div>
                  </div>
                </div>

                {passwordError && <p className="error-text">{passwordError}</p>}

                <div className="form-actions">
                  <button
                    type="button"
                    className="action-btn secondary"
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
                      setPasswordError(null);
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="action-btn save">
                    <FaSave />
                    Guardar cambios
                  </button>
                  {passwordSaved && (
                    <span className="success-message">
                      <FaCheckCircle />
                      Contraseña actualizada
                    </span>
                  )}
                </div>
              </form>
            )}
          </section>

          {/* Programa de Afiliados */}
          <section className="account-card affiliate-card">
            <header className="card-header">
              <DollarSign size={24} />
              <h3>Programa de Afiliados (Hotmart)</h3>
            </header>

            {user.isAffiliated ? (
              <>
                <div className="affiliate-stats">
                  <div className="stat-item">
                    <span className="label">Comisión actual</span>
                    <span className="value highlight">{user.affiliateCommission}%</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Referidos</span>
                    <span className="value">{user.referrals}</span>
                  </div>
                  <div className="stat-item">
                    <span className="label">Ganancias pendientes</span>
                    <span className="value">${user.pendingEarnings.toFixed(2)}</span>
                  </div>
                </div>

                <div className="affiliate-link">
                  <label>Tu enlace de afiliado</label>
                  <div className="link-wrapper">
                    <input type="text" value={user.affiliateLink} readOnly />
                    <button onClick={copyToClipboard} className="copy-btn">
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                  {copied && <span className="copied-text">¡Copiado!</span>}
                </div>

                {user.affiliateCommission < 50 && user.isPaidPlan && (
                  <div className="upgrade-box">
                    <AlertCircle size={20} />
                    <div className="upgrade-text">
                      <strong>¡Aumento disponible!</strong>
                      <p>Con tu plan premium puedes solicitar el 50% de comisión.</p>
                    </div>
                    <button
                      className="action-btn primary"
                      onClick={() => setShowUpgradeModal(true)}
                    >
                      Solicitar 50%
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="not-affiliated">
                <p className="card-note">
                  Regístrate en Hotmart para obtener tu enlace de afiliado y empezar a ganar comisiones.
                </p>
                <a
                  href="https://hotmart.com/es/afiliados"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn primary"
                >
                  Registrarme en Hotmart
                </a>
              </div>
            )}
          </section>
        </div>

        <div className="logout-section">
          <button className="logout-btn">
            <LogOut size={20} />
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Modales */}
      {showCancelModal && (
        <div className="modal-overlay" onClick={() => setShowCancelModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>¿Cancelar suscripción?</h3>
            <p>Mantendrás acceso hasta el final del período actual.</p>
            <div className="modal-actions">
              <button className="action-btn secondary" onClick={() => setShowCancelModal(false)}>
                Conservar plan
              </button>
              <button className="action-btn danger">Confirmar cancelación</button>
            </div>
          </div>
        </div>
      )}

      {showUpgradeModal && (
        <div className="modal-overlay" onClick={() => setShowUpgradeModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Solicitar aumento al 50%</h3>
            <p>Se revisará tu solicitud y te notificaremos por email.</p>
            <div className="modal-actions">
              <button className="action-btn secondary" onClick={() => setShowUpgradeModal(false)}>
                Cancelar
              </button>
              <button className="action-btn primary">Enviar solicitud</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountPage;