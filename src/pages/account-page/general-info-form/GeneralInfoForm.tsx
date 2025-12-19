import React from "react";
import { MdEmail, MdManageSearch } from "react-icons/md";
import { FaPercentage, FaUser, FaCrown } from "react-icons/fa";
import { HiOutlineSearch, HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import "./GeneralInfoForm.scss";
import { useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import { FiAlertTriangle, FiExternalLink, FiLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoCardOutline } from "react-icons/io5";
import { TbAlertSquare } from "react-icons/tb";

const GeneralInfoForm: React.FC = () => {
  const { userName, email, affiliateCommission, subscriptionPlan, subscriptionStatus, subscriptionExpiresAt } = useSelector((state: IState) => state.user);

  // Formatear plan para mostrar en español
  const planDisplayName = () => {
    if (!subscriptionPlan || subscriptionPlan === "FREE") return "Gratuito";
    if (subscriptionPlan === "MONTHLY") return "Mensual";
    if (subscriptionPlan === "ANNUAL") return "Anual";
    return "Gratuito";
  };

  // Formatear fecha de expiración
  const formatExpirationDate = () => {
    if (!subscriptionExpiresAt) return "—";

    const date = new Date(subscriptionExpiresAt);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Determinar si mostrar sección de plan premium
  const isPremium = subscriptionPlan === "MONTHLY" || subscriptionPlan === "ANNUAL";

  return (
    <div className="general-info-form">
      <h3>Información General</h3>

      <div className="general-info-form__grid">
        {/* Nombre de usuario */}
        <div className="general-info-form__field">
          <label>Nombre de usuario</label>
          <div className="general-info-form__input-icon">
            <FaUser />
            <input type="text" value={userName || "—"} disabled />
          </div>
        </div>

        {/* Email */}
        <div className="general-info-form__field">
          <label>Email</label>
          <div className="general-info-form__input-icon">
            <MdEmail />
            <input type="email" value={email || "—"} disabled />
          </div>
        </div>

        {/* Comisión de afiliado */}
        <div className="general-info-form__field">
          <label>Comisión de afiliado (Hasta 50%)</label>
          <div className="general-info-form__input-icon">
            <FaPercentage />
            <input
              type="text"
              value={`${affiliateCommission ?? 20}%`}
              disabled
            />
          </div>
             <a className="affiliate-link" href="#"><FiExternalLink /> Mi Enalce De Afiliado</a>
        </div>
      </div>

      {/* ===== PLAN ACTUAL ===== */}
      <div className="general-info-form__plan">
        <h4>
          <FaCrown /> Plan actual
        </h4>

        <div className="general-info-form__plan-grid">
          <div className="general-info-form__plan-item">
            <span className="value">Plan {planDisplayName()}</span>
            {isPremium && (
              <span className="label">
                Fecha de caducidad: {formatExpirationDate()}
              </span>
            )}
            {!isPremium && (
              <span className="label free-info"><TbAlertSquare /> Acceso A Funciones Limitadas</span>
            )}
          </div>

          {/* Acciones solo si tiene plan premium activo */}
          <div className="general-info-form__plan-actions">
            {isPremium && subscriptionStatus === "ACTIVE" && (
              <button className="general-info-form__plan-cancel">
                <MdCancel />
                Cancelar Suscripción
              </button>
            )}

              <Link to={"/pricing"} className="general-info-form__plan-change">
                <MdManageSearch size={22} />
                Explorar Planes
              </Link>
            </div>

          {/* Si está cancelado o delayed, mostrar estado */}
          {isPremium && subscriptionStatus === "CANCELED" && (
            <div className="general-info-form__plan-actions">
              <span style={{ color: "#dc2626", fontWeight: "600" }}>
                Suscripción cancelada
              </span>
            </div>
          )}

          {isPremium && subscriptionStatus === "DELAYED" && (
            <div className="general-info-form__plan-actions">
              <span style={{ color: "#f59e0b", fontWeight: "600" }}>
                Pago en mora
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoForm;