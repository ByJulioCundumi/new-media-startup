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
import { IoCardOutline, IoDiamondOutline } from "react-icons/io5";
import { TbAlertSquare } from "react-icons/tb";
import { hasValidSubscriptionTime } from "../../../util/checkSubscriptionTime";

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
        {
          affiliateCommission > 0 ? <div className="general-info-form__field">
          <label>Tu Comision Actual (Hasta 70%)</label>
          <div className="general-info-form__input-icon">
            <FaPercentage />
            <input
              type="text"
              value={`${affiliateCommission ?? 0}%`}
              disabled
            />
          </div>
             <a className="affiliate-link" href="#"><FiExternalLink /> Mi Enalce De Afiliado</a>
        </div> 
        : 
        <div className="general-info-form__field">
          <label>Tu Comision Actual</label>
          <div className="general-info-form__input-icon">
            <FaPercentage />
            <input
              type="text"
              value={`0% De Comision`}
              disabled
            />
          </div>
             <a className="affiliate-link" href="#"><FiExternalLink /> Trabaja Con Nosotros y gana hasta el 70%</a>
        </div>
        }
      </div>

      {/* ===== PLAN ACTUAL ===== */}
      <div className="general-info-form__plan">
        <h4>
          <IoDiamondOutline /> Plan {planDisplayName()}
        </h4>

        <div className="general-info-form__plan-grid">
          <div className="general-info-form__plan-item">
            <span className="value">{hasValidSubscriptionTime(subscriptionExpiresAt) ? "Fecha de Caducidad:" : "Sobre este plan:"} </span>
            {isPremium && (
              <span className="label">
                {formatExpirationDate()}
              </span>
            )}
            {!isPremium && (
              <span className="label free-info"><TbAlertSquare /> Acceso A Funciones Limitadas</span>
            )}
            {/* Si está cancelado o delayed, mostrar estado */}
          {isPremium && subscriptionStatus === "CANCELED" && (
            <div className="general-info-form__plan-actions">
              <span style={{ color: "#f79f9fff", fontWeight: "600" }}>
                Suscripción cancelada
              </span>
            </div>
          )}

          {isPremium && subscriptionStatus === "DELAYED" && (
            <div className="general-info-form__plan-actions">
              <span style={{ color: "#ffcb70ff", fontWeight: "600" }}>
                Pago en mora
              </span>
            </div>
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
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoForm;