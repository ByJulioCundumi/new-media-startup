import { useState } from "react";
import "./adminactions.scss";

function AdminActions() {
  const [actions, setActions] = useState({
    loginEnabled: true,
    cvCreationEnabled: true,
    cvUpdateEnabled: true,
    passwordRecoveryEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const toggleAction = (key: keyof typeof actions) => {
    if (!isEditing) return;
    setActions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleEditClick = () => {
    setShowAuthModal(true);
  };

  const handleAuthConfirm = () => {
    // ⚠️ Simulación de validación (aquí va backend)
    if (password === "admin123") {
      setIsEditing(true);
      setShowAuthModal(false);
      setPassword("");
      setAuthError("");
    } else {
      setAuthError("Contraseña incorrecta");
    }
  };

  const handleSaveChanges = () => {
    // 👉 Aquí se envían los cambios al backend
    setIsEditing(false);
  };

  return (
    <section className="admin-actions">
      <header className="admin-actions__header">
        <h2 className="admin-actions__title">Control del sistema</h2>
        <p className="admin-actions__subtitle">
          Administración de funcionalidades críticas de la plataforma
        </p>
      </header>

      <div className="admin-actions__list">
        <AdminSwitch
          label="Inicio de sesión"
          description="Permite el acceso de usuarios a la plataforma"
          checked={actions.loginEnabled}
          disabled={!isEditing}
          onChange={() => toggleAction("loginEnabled")}
        />

        <AdminSwitch
          label="Creación de CVs"
          description="Habilita la creación de nuevos currículums"
          checked={actions.cvCreationEnabled}
          disabled={!isEditing}
          onChange={() => toggleAction("cvCreationEnabled")}
        />

        <AdminSwitch
          label="Actualización de CVs"
          description="Permite modificar CVs existentes"
          checked={actions.cvUpdateEnabled}
          disabled={!isEditing}
          onChange={() => toggleAction("cvUpdateEnabled")}
        />

        <AdminSwitch
          label="Recuperación de contraseñas"
          description="Permite restablecer contraseñas olvidadas"
          checked={actions.passwordRecoveryEnabled}
          disabled={!isEditing}
          onChange={() => toggleAction("passwordRecoveryEnabled")}
        />
      </div>

      <div className="admin-actions__actions">
        {!isEditing ? (
          <button
            className="admin-actions__edit-btn"
            onClick={handleEditClick}
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
          <div className="admin-actions__modal">
            <h3>Confirmar identidad</h3>
            <p>
              Ingresa tu contraseña para habilitar la edición de esta sección
            </p>

            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {authError && (
              <span className="admin-actions__error">{authError}</span>
            )}

            <div className="admin-actions__modal-actions">
              <button
                className="admin-actions__cancel-btn"
                onClick={() => {
                  setShowAuthModal(false);
                  setPassword("");
                  setAuthError("");
                }}
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
        <small className="admin-actions__description">{description}</small>
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
