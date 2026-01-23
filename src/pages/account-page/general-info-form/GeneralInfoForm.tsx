import React from "react";
import { MdEmail, MdManageSearch } from "react-icons/md";
import { FaPercentage, FaUser } from "react-icons/fa";
import "./GeneralInfoForm.scss";
import { useSelector } from "react-redux";
import type { IState } from "../../../interfaces/IState";
import { FiAlertTriangle, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import { IoDiamondOutline } from "react-icons/io5";
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
          <label className="general-row">Tu Comisión Actual </label>
          <div className="general-info-form__input-icon">
            <FaPercentage />
            <input
              type="text"
              value={`${affiliateCommission ?? 0}%`}
              disabled
            />
          </div>
             <a href="#" className="affiliate-link" style={{fontWeight: 300}}><FiExternalLink /> Comparte tu enlace de afiliado</a>
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
             <a className="affiliate-link" style={{fontWeight: 300}} href="#"><FiExternalLink /> Trabaja Con Nosotros y gana hasta el 50%</a>
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
            {isPremium && <span className="value">Fecha de Caducidad </span>}
            {(!isPremium) && <span className="value">Sobre Este Plan </span>}
            {isPremium && (
              <span className="label">
                {formatExpirationDate()}
              </span>
            )}
            {!isPremium && (
              <span className="label free-info"><TbAlertSquare /> Acceso A Funciones Limitadas</span>
            )}
            {/* Si está cancelado o delayed, mostrar estado */}
          
          </div>

          {/* Acciones solo si tiene plan premium activo */}
          <div className="general-info-form__plan-actions">
            {isPremium && subscriptionStatus === "CANCELED" && (
            <button style={{ color: "#f79f9fff", fontWeight: "600" }} className="general-info-form__plan-cancel">
                Renovacion cancelada
              </button>
          )}

          {isPremium && subscriptionStatus === "DELAYED" && (
            <button style={{ color: "#fcd058ff",  borderColor: "#ffdc7bff", fontWeight: "600" }} className="general-info-form__plan-cancel">
                Pago en mora
              </button>
          )}

            {isPremium && subscriptionStatus === "ACTIVE" && (
              <button style={{ color: "#9fdef7ff", fontWeight: "600", borderColor: "#9fdef7ff"}} className="general-info-form__plan-cancel">
                Renovacion Activa
              </button>
            )}

              <Link to={"/pricing"} className="general-info-form__plan-change">
                <MdManageSearch size={22} />
                Explorar Planes
              </Link>
            </div>
        </div>
            
            {hasValidSubscriptionTime(subscriptionExpiresAt) === false && <p className="alert"><FiAlertTriangle /> Renueva tu suscripción para acceder a todas las funciones de CvRemoto.</p>}
      </div>
    </div>
  );
};

export default GeneralInfoForm;