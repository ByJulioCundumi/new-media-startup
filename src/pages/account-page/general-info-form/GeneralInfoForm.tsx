import React from "react";
import { MdEmail } from "react-icons/md";
import { FaPercentage, FaUser, FaCrown } from "react-icons/fa";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { MdCancel } from "react-icons/md";
import "./GeneralInfoForm.scss";

const GeneralInfoForm: React.FC = () => {
  // 👉 Normalmente vendría de Redux / backend
  const userData = {
    username: "Julio Pérez",
    email: "julio@email.com",
    affiliateCommission: 20,
    plan: "Mensual", // Gratuito | Mensual | Anual
    planExpiresAt: "15 de enero de 2026",
  };

  return (
    <div className="general-info-form">
      <h3>Información General</h3>

      <div className="general-info-form__grid">
        {/* Nombre */}
        <div className="general-info-form__field">
          <label>Nombre de usuario</label>
          <div className="general-info-form__input-icon">
            <FaUser />
            <input type="text" value={userData.username} disabled />
          </div>
        </div>

        {/* Email */}
        <div className="general-info-form__field">
          <label>Email</label>
          <div className="general-info-form__input-icon">
            <MdEmail />
            <input type="email" value={userData.email} disabled />
          </div>
        </div>

        {/* Comisión */}
        <div className="general-info-form__field">
          <label>Comisión de afiliado</label>
          <div className="general-info-form__input-icon">
            <FaPercentage />
            <input
              type="text"
              value={`${userData.affiliateCommission}%`}
              disabled
            />
          </div>
        </div>
      </div>

      {/* ===== PLAN ACTUAL ===== */}
      <div className="general-info-form__plan">
        <h4>
          <FaCrown /> Plan actual
        </h4>

        <div className="general-info-form__plan-grid">
          <div className="general-info-form__plan-item">
            <span className="value">Plan Mensual</span>
            <span className="label">Fecha de caducidad: 03/05/2025</span>
          </div>

          <div className="general-info-form__plan-actions">
          <button className="general-info-form__plan-cancel">
            <MdCancel />
            Cancelar plan
          </button>
          
          <button className="general-info-form__plan-change">
            <HiOutlineSwitchHorizontal />
            Cambiar plan
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoForm;
