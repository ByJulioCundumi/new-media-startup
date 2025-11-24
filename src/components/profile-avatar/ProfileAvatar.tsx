import React, { useState } from "react";
import { IoDiamond } from "react-icons/io5";
import { LuShoppingBasket } from "react-icons/lu";
import "./profileavatar.scss";

const ProfileAvatar: React.FC = () => {
  // 🔹 Mocks internos (ajusta cuando tengas datos reales)
  const mockImg =
    "https://www.wikihow.com/images/thumb/9/90/What_type_of_person_are_you_quiz_pic.png/1200px-What_type_of_person_are_you_quiz_pic.png";

  const mockIsVip = false; // true = diamante, false = icono tienda
  const mockTooltipMsg =
    "Desbloquea beneficios Premium y haz que tu CV destaque";

  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="profile-avatar-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button className="profile-avatar-btn">
        <img src={mockImg} alt="Perfil" className="profile-avatar-img" />

        <span className={`profile-avatar-icon ${mockIsVip ? "vip" : "novip"}`}>
          {mockIsVip ? <IoDiamond /> : <LuShoppingBasket />}
        </span>
      </button>

      {/* Tooltip solo si NO es VIP */}
      {!mockIsVip && showTooltip && (
        <div className="profile-avatar-tooltip">{mockTooltipMsg}</div>
      )}
    </div>
  );
};

export default ProfileAvatar;
