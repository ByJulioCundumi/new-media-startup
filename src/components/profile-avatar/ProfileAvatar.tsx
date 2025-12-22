import React from "react";
import {
  IoCardOutline,
  IoDiamondOutline,
  IoWaterOutline,
} from "react-icons/io5";
import "./profileavatar.scss";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { clearUser } from "../../reducers/userSlice";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineArrowLeftStartOnRectangle,
  HiOutlineArrowRightEndOnRectangle,
} from "react-icons/hi2";
import { openAuthModal } from "../../reducers/authModalSlice";
import { FiAlertOctagon } from "react-icons/fi";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";

const ProfileAvatar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    logged,
    subscriptionPlan,
    subscriptionStatus,
    subscriptionExpiresAt,
    cvCount
  } = useSelector((state: IState) => state.user);

  // Determinar si es VIP (tiene plan de pago activo)
  const isVip = hasValidSubscriptionTime(subscriptionExpiresAt)

  // Formatear fecha de expiración (ej: "20 Dic 2025")
  const formatExpirationDate = (dateString: string | null | undefined): string => {
    if (!dateString) return "Sin fecha";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Inválida";

    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const expirationDate = formatExpirationDate(subscriptionExpiresAt as string | null | undefined);

  const planTitle = isVip
    ? subscriptionPlan === "MONTHLY"
      ? "Plan Mensual"
      : "Plan Anual"
    : "Plan Gratuito";

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

  const handleOpenLogin = () => {
    dispatch(openAuthModal({}));
  };

  return (
    <div className="profile-avatar-wrapper">
      {/* Indicador de suscripción */}
      {logged && (
        <div className={`subscription-badge ${isVip ? "vip" : "free"}`}>
          {isVip ? (
            <IoDiamondOutline className="subscription-badge__icon" />
          ) : (
            <FiAlertOctagon className="subscription-badge__icon" />
          )}

          <div className="subscription-badge__text">

            <p className="subscription-badge__subtitle">
              {isVip
                ? `${planTitle}: ${expirationDate}`
                : `Plan Gratuito: ${cvCount}/1 CV Online`}
            </p>
          </div>
        </div>
      )}

      {!logged && (
        <div className={`subscription-badge free`}>
          <IoWaterOutline className="subscription-badge__icon" />

          <div className="subscription-badge__text">
            <p className="subscription-badge__subtitle">
              Funciones Limitadas
            </p>
          </div>
        </div>
      )}

      {/* Botón avatar - Login / Logout */}
      <button
        className="profile-avatar-btn"
        onClick={logged ? handleLogout : handleOpenLogin}
        title={logged ? "Cerrar sesión" : "Iniciar sesión"}
      >
        {logged ? (
          <HiOutlineArrowLeftStartOnRectangle size={20} />
        ) : (
          <HiOutlineArrowRightEndOnRectangle size={20} />
        )}
      </button>
    </div>
  );
};

export default ProfileAvatar;