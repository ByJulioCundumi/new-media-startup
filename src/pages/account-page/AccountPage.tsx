import { useDispatch, useSelector } from "react-redux";
import "./accountpage.scss";
import GeneralInfoForm from "./general-info-form/GeneralInfoForm";
import PasswordSettings from "./password-settings/PasswordSettings";
import { useEffect, useState } from "react";
import { setSidebar } from "../../reducers/sidebarSlice";
import AffiliateCommissionRequest from "./affiliate-commission-requeset/AffiliateCommissionRequest";
import { FiTrash2 } from "react-icons/fi";
import { HiOutlineArrowLeftStartOnRectangle } from "react-icons/hi2";
import type { IState } from "../../interfaces/IState";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import { logout, deleteAccount } from "../../api/auth"; // ← Asegúrate de importar deleteAccount
import { clearUser } from "../../reducers/userSlice";
import { useNavigate } from "react-router-dom";

function AccountPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { subscriptionExpiresAt } = useSelector((state: IState) => state.user);

  // Estado del modal de eliminación
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    dispatch(setSidebar("account"));
  }, [dispatch]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      dispatch(clearUser());
    }
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setPassword("");
    setError("");
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setPassword("");
    setError("");
  };

  const confirmDeleteAccount = async () => {
    if (!password.trim()) {
      setError("Por favor, ingresa tu contraseña actual");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await deleteAccount(password);
      dispatch(clearUser());
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al eliminar la cuenta. Verifica tu contraseña.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="account-page">
      <GeneralInfoForm />
      {hasValidSubscriptionTime(subscriptionExpiresAt) && <AffiliateCommissionRequest />}
      <PasswordSettings />

      {/* ===== ACCIONES DE CUENTA ===== */}
      <div className="account-page__actions">
        <button className="account-page__logout-btn" onClick={handleLogout}>
          <HiOutlineArrowLeftStartOnRectangle />
          Cerrar sesión
        </button>

        <button className="account-page__delete-btn" onClick={openDeleteModal}>
          <FiTrash2 />
          Eliminar cuenta
        </button>
      </div>

      {/* ===== MODAL DE CONFIRMACIÓN DE ELIMINACIÓN ===== */}
      {showDeleteModal && (
        <div className="modal-overlay" onClick={closeDeleteModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>¿Estás seguro?</h3>
            <p>
              Esta acción <strong>es irreversible</strong>. Se eliminará permanentemente:
            </p>
            <ul>
              <li>Tu cuenta y todos tus datos personales</li>
              <li>Todos tus CVs guardados en la nube</li>
              <li>Datos de afiliado</li>
            </ul>

            <p>Para confirmar, ingresa tu contraseña actual:</p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña actual"
              disabled={loading}
              autoFocus
            />

            {error && <p className="error-text">{error}</p>}

            <div className="modal-actions">
              <button onClick={closeDeleteModal} disabled={loading}>
                Cancelar
              </button>
              <button
                className="danger-btn"
                onClick={confirmDeleteAccount}
                disabled={loading}
              >
                {loading ? "Eliminando..." : "Eliminar cuenta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default AccountPage;