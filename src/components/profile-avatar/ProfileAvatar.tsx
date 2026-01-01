import React from "react";
import {
  IoDiamondOutline,
} from "react-icons/io5";
import "./profileavatar.scss";
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
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import { LuUserRoundPlus } from "react-icons/lu";

const ProfileAvatar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    logged,
    subscriptionPlan,
    subscriptionExpiresAt,
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

  return (
    <div className="profile-avatar-wrapper">
      {/* Indicador de suscripción */}
      {
        logged && <>
          <div className={`subscription-badge ${isVip ? "vip" : "free"}`}>
          {isVip && <IoDiamondOutline className="subscription-badge__icon" />}

          <div className="subscription-badge__text">
            <p className="subscription-badge__subtitle">
              {isVip && `${planTitle}: ${expirationDate}`}
            </p>
          </div>
        </div>

      {/* Botón avatar - Login / Logout */}
      <button
        className="profile-avatar-btn"
        onClick={handleLogout}
        title={"Cerrar sesión"}
      >
        <HiOutlineArrowLeftStartOnRectangle size={20} />
      </button>
        </>
      }

      {
        !logged && <div className="navbar__actions">
                    <button
                      className="login"
                      onClick={() => dispatch(openAuthModal({}))}
                    >
                      <HiOutlineArrowRightEndOnRectangle size={30} />
                    </button>
        
                    <button
                      className="signup"
                      onClick={() =>
                        dispatch(openAuthModal({ section: "signup" }))
                      }
                    >
                      <LuUserRoundPlus /> Crear Cuenta
                    </button>
                  </div>
      }
    </div>
  );
};

export default ProfileAvatar;