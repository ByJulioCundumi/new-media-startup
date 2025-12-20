import { useEffect, useState } from "react";
import "./adminactions.scss";
import {
  getSystemSettingsApi,
  updateSystemSettingsApi,
  forceLogoutAllApi,
  verifyAdminPasswordApi,
} from "../../../api/admin";

type ProtectedAction = "edit" | "logout" | null;

function AdminActions() {
  const [settings, setSettings] = useState({
    loginEnabled: true,
    signupEnabled: true,
    passwordRecoveryEnabled: true,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [pendingAction, setPendingAction] = useState<ProtectedAction>(null);
  const [loading, setLoading] = useState(true);

  // Cargar configuración real al montar el componente
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        const data = await getSystemSettingsApi();
        setSettings(data);
      } catch (err: any) {
        alert("Error cargando configuración: " + (err.message || "Intenta recargar"));
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, []);

  const toggleSetting = (key: keyof typeof settings) => {
    if (!isEditing) return;
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const requestAuth = (action: ProtectedAction) => {
    setPendingAction(action);
    setShowAuthModal(true);
    setAuthError("");
    setPassword("");
  };

  const handleAuthConfirm = async () => {
    try {
      await verifyAdminPasswordApi(password);

      if (pendingAction === "edit") {
        setIsEditing(true);
      } else if (pendingAction === "logout") {
        const res = await forceLogoutAllApi();
        alert(res.message);
      }

      setShowAuthModal(false);
    } catch (err: any) {
      setAuthError(err.message || "Error de autenticación");
    }
  };

  const handleSaveChanges = async () => {
    try {
      await updateSystemSettingsApi(settings);
      setIsEditing(false);
      alert("Configuración guardada correctamente");
    } catch (err: any) {
      alert("Error al guardar: " + (err.message || "Intenta nuevamente"));
    }
  };

  if (loading) {
    return (
      <section className="admin-actions">
        <p>Cargando configuración del sistema...</p>
      </section>
    );
  }

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
          checked={settings.loginEnabled}
          disabled={!isEditing}
          onChange={() => toggleSetting("loginEnabled")}
        />

        <AdminSwitch
          label="Creación de cuentas"
          description="Permite que nuevos usuarios se registren"
          checked={settings.signupEnabled}
          disabled={!isEditing}
          onChange={() => toggleSetting("signupEnabled")}
        />

        <AdminSwitch
          label="Recuperación de contraseñas"
          description="Permite restablecer contraseñas olvidadas"
          checked={settings.passwordRecoveryEnabled}
          disabled={!isEditing}
          onChange={() => toggleSetting("passwordRecoveryEnabled")}
        />
      </div>

      <div className="admin-actions__actions">
        <button
          className="admin-actions__logout-all-btn"
          onClick={() => requestAuth("logout")}
        >
          Cerrar sesión de usuarios conectados
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
              <h3>Confirmación requerida</h3>
              <p>Ingrese su contraseña de administrador</p>
            </div>

            <input
              type="password"
              placeholder="Contraseña de administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAuthConfirm()}
              autoFocus
            />

            {authError && <div className="admin-actions__error">{authError}</div>}

            <div className="admin-actions__modal-actions">
              <button
                className="admin-actions__cancel-btn"
                onClick={() => setShowAuthModal(false)}
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

function AdminSwitch({ label, description, checked, disabled, onChange }: AdminSwitchProps) {
  return (
    <div className={`admin-actions__item ${disabled ? "admin-actions__item--disabled" : ""}`}>
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