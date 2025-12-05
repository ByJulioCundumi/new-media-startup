import React from "react";
import { IoDiamond, IoWater } from "react-icons/io5";
import { LuShoppingBasket } from "react-icons/lu";
import { BsCalendar2Check } from "react-icons/bs";
import "./profileavatar.scss";

const ProfileAvatar: React.FC = () => {
  const mockImg =
    "https://www.wikihow.com/images/thumb/9/90/What_type_of_person_are_you_quiz_pic.png/1200px-What_type_of_person_are_you_quiz_pic.png";

  const mockIsVip = false;
  const mockEndDate = "20 Dic 2025";

  return (
    <div className="profile-avatar-wrapper">
      {/* Indicador de suscripción refinado */}
      <div className={`subscription-badge ${mockIsVip ? "vip" : "free"}`}>
        {mockIsVip && (
          <BsCalendar2Check className="subscription-badge__icon" />
        )}

        <div className="subscription-badge__text">
          <span className="subscription-badge__title">
            {mockIsVip ? "Plan Premium" : "Plan Gratuito"}
          </span>

          <p className="subscription-badge__subtitle">
            {mockIsVip ? `Válido hasta ${mockEndDate}` : "Marca de agua visible"}
          </p>
        </div>
      </div>

      {/* Botón avatar */}
      <button className="profile-avatar-btn">
        <img src={mockImg} alt="Perfil" className="profile-avatar-img" />

        <span className={`profile-avatar-icon ${mockIsVip ? "vip" : "novip"}`}>
          {mockIsVip ? <IoDiamond /> : <IoWater />}
        </span>
      </button>
    </div>
  );
};

export default ProfileAvatar;
