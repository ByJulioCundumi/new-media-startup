import React, { useState, type ChangeEvent, type FormEvent } from "react";
import "./PasswordSettings.scss";
import { MdLockOutline, MdVisibility, MdVisibilityOff } from "react-icons/md";
import { FaSave, FaCheckCircle } from "react-icons/fa";

const PasswordSettings: React.FC = () => {
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

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm({ ...passwordForm, [name]: value });
    setError(null);
  };

  const toggleVisibility = (field: "current" | "new" | "confirm") => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const { newPassword, confirmPassword } = passwordForm;
    if (newPassword !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Simulación de guardado
    console.log("Contraseña actualizada:", passwordForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <form className="password-settings" onSubmit={handleSubmit}>
      <header className="password-settings__header">
        <h3>Cambiar Contraseña</h3>
        <p>
          Actualiza la contraseña de tu cuenta para mantener tu información segura.
        </p>
      </header>

      <div className="password-settings__grid">
        {/* Contraseña actual */}
        <div className="password-settings__field">
          <label>Contraseña actual</label>
          <div className="password-settings__input-icon">
            <MdLockOutline />
            <input
              type={showPasswords.current ? "text" : "password"}
              name="currentPassword"
              value={passwordForm.currentPassword}
              onChange={handleChange}
              placeholder="********"
              required
            />
            <button
              type="button"
              className="password-settings__visibility-btn"
              onClick={() => toggleVisibility("current")}
            >
              {showPasswords.current ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
        </div>

        {/* Nueva contraseña */}
        <div className="password-settings__field">
          <label>Nueva contraseña</label>
          <div className="password-settings__input-icon">
            <MdLockOutline />
            <input
              type={showPasswords.new ? "text" : "password"}
              name="newPassword"
              value={passwordForm.newPassword}
              onChange={handleChange}
              placeholder="********"
              required
            />
            <button
              type="button"
              className="password-settings__visibility-btn"
              onClick={() => toggleVisibility("new")}
            >
              {showPasswords.new ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
        </div>

        {/* Confirmar nueva contraseña */}
        <div className="password-settings__field">
          <label>Confirmar nueva contraseña</label>
          <div className="password-settings__input-icon">
            <MdLockOutline />
            <input
              type={showPasswords.confirm ? "text" : "password"}
              name="confirmPassword"
              value={passwordForm.confirmPassword}
              onChange={handleChange}
              placeholder="********"
              required
            />
            <button
              type="button"
              className="password-settings__visibility-btn"
              onClick={() => toggleVisibility("confirm")}
            >
              {showPasswords.confirm ? <MdVisibilityOff /> : <MdVisibility />}
            </button>
          </div>
        </div>
      </div>

      {error && <p className="password-settings__error">{error}</p>}

      <div className="password-settings__actions">
        <button type="submit" className="password-settings__save-btn">
          <FaSave /> Guardar cambios
        </button>
        {saved && (
          <span className="password-settings__success">
            <FaCheckCircle /> Contraseña actualizada
          </span>
        )}
      </div>
    </form>
  );
};

export default PasswordSettings;