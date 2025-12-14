import React from "react";
import { IoCardOutline, IoDiamond, IoDiamondOutline, IoWater } from "react-icons/io5";
import { LuShoppingBasket } from "react-icons/lu";
import { BsCalendar2Check, BsCreditCard2Front } from "react-icons/bs";
import "./profileavatar.scss";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { RiLogoutBoxRLine, RiLogoutCircleRLine } from "react-icons/ri";
import { BiLogOutCircle } from "react-icons/bi";
import { clearUser } from "../../reducers/userSlice";
import { logout } from "../../api/auth";
import { useNavigate } from "react-router-dom";
import { HiOutlineArrowLeftStartOnRectangle, HiOutlineArrowRightEndOnRectangle } from "react-icons/hi2";
import { MdOutlineDiamond } from "react-icons/md";
import { FaRegCreditCard } from "react-icons/fa6";

const ProfileAvatar: React.FC = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {logged} = useSelector((state:IState)=> state.user)
  const mockIsVip = true;
  const mockEndDate = "20 Dic 2025";

  const handleLogout = async()=>{
    try {
      await logout()
      navigate("/")
    } catch (error) {
      console.log(error)
    }
    dispatch(clearUser())
  }

  return (
    <div className="profile-avatar-wrapper">
      {/* Indicador de suscripción refinado */}
      <div className={`subscription-badge ${mockIsVip ? "vip" : "free"}`}>
        {mockIsVip ? 
        <IoCardOutline className="subscription-badge__icon" />
        :
        <IoWater className="subscription-badge__icon"/>
      }

        <div className="subscription-badge__text">
          <span className="subscription-badge__title">
            {mockIsVip ? "Plan Mensual" : "Plan Gratuito"}
          </span>

          <p className="subscription-badge__subtitle">
            {mockIsVip ? `Caducidad: ${mockEndDate}` : "Marca de agua visible"}
          </p>
        </div>
      </div>

      {/* Botón avatar */}
      <button className="profile-avatar-btn">
        {
          logged ? <HiOutlineArrowLeftStartOnRectangle onClick={handleLogout}/> : <HiOutlineArrowRightEndOnRectangle />
        }
      </button>
    </div>
  );
};

export default ProfileAvatar;
