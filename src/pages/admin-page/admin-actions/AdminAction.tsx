import { useState } from "react";
import "./adminactions.scss";

type ProtectedAction = "edit" | "logout" | null;

function AdminActions() {
  const [actions, setActions] = useState({
    loginEnabled: true,
    accountCreationEnabled: true,
    passwordRecoveryEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [pendingAction, setPendingAction] =
    useState<ProtectedAction>(null);

  const toggleAction = (key: keyof typeof actions) => {
    if (!isEditing) return;
    setActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const requestAuth = (action: ProtectedAction) => {
    setPendingAction(action);
    setShowAuthModal(true);
  };

  const handleAuthConfirm = () => {
    // ⚠️ Validación simulada (backend real aquí)
    if (password !== "admin123") {
      setAuthError("Contraseña incorrecta");
      return;
    }

    if (pendingAction === "edit") setIsEditing(true);
    if (pendingAction === "logout") handleForceLogout();

    resetAuthModal();
  };

  const handleSaveChanges = () => {
    // 👉 Enviar flags al backend
    setIsEditing(false);
  };

  const handleForceLogout = () => {
    console.log("🚨 Sesión cerrada para todos los usuarios");
  };

  const resetAuthModal = () => {
    setShowAuthModal(false);
    setPassword("");
    setAuthError("");
    setPendingAction(null);
  };

  return (
    <section className="admin-actions">
      <header className="admin-actions__header">
        <h2 className="admin-actions__title">Control del sistema</h2>
        <p className="admin-actions__subtitle">
          Administración de funcionalidades críticas
        </p>
      </header>

      <div className="admin-actions__list">
        <AdminSwitch
          label="Inicio de sesión"
          description="Permite el acceso de usuarios"
          checked={actions.loginEnabled}
          disabled={!isEditing}
          onChange={() => toggleAction("loginEnabled")}
        />

        <AdminSwitch
          label="Creación de cuentas"
          description="Permite que nuevos usuarios se registren"
          checked={actions.accountCreationEnabled}
          disabled={!isEditing}
          onChange={() => toggleAction("accountCreationEnabled")}
        />

        <AdminSwitch
          label="Recuperación de contraseñas"
          description="Permite restablecer contraseñas"
          checked={actions.passwordRecoveryEnabled}
          disabled={!isEditing}
          onChange={() => toggleAction("passwordRecoveryEnabled")}
        />
      </div>

      

      {/* ACCIONES NORMALES */}
      <div className="admin-actions__actions">
        <button
          className="admin-actions__logout-all-btn"
          onClick={() => requestAuth("logout")}
        >
          Cerrar sesión de todos los usuarios
        </button>

        {!isEditing ? (
          <button
            className="admin-actions__edit-btn"
            onClick={() => requestAuth("edit")}
          >
            Editar configuración
          </button>
        ) : (
          <button
            className="admin-actions__save-btn"
            onClick={handleSaveChanges}
          >
            Guardar cambios
          </button>
        )}
      </div>

      

      {/* MODAL DE AUTENTICACIÓN */}
      {showAuthModal && (
        <div className="admin-actions__modal-overlay">
          <div className="admin-actions__modal admin-actions__modal--auth">
            <div className="admin-actions__modal-header">
              <h3>Confirmación de seguridad</h3>
              <p>Esta acción requiere validación administrativa</p>
            </div>

            <input
              type="password"
              placeholder="Contraseña de administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoFocus
            />

            {authError && (
              <div className="admin-actions__error">
                {authError}
              </div>
            )}

            <div className="admin-actions__modal-actions">
              <button
                className="admin-actions__cancel-btn"
                onClick={resetAuthModal}
              >
                Cancelar
              </button>

              <button
                className="admin-actions__confirm-btn"
                onClick={handleAuthConfirm}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

interface AdminSwitchProps {
  label: string;
  description: string;
  checked: boolean;
  disabled: boolean;
  onChange: () => void;
}

function AdminSwitch({
  label,
  description,
  checked,
  disabled,
  onChange,
}: AdminSwitchProps) {
  return (
    <div
      className={`admin-actions__item ${
        disabled ? "admin-actions__item--disabled" : ""
      }`}
    >
      <div className="admin-actions__info">
        <span className="admin-actions__label">{label}</span>
        <small className="admin-actions__description">
          {description}
        </small>
      </div>

      <label className="admin-actions__switch">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        <span className="admin-actions__slider" />
      </label>
    </div>
  );
}

export default AdminActions;
