import { NavLink } from "react-router-dom";
import "./mobilenav.scss";

import {
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { TbSettingsCode } from "react-icons/tb";
import { HiHome } from "react-icons/hi2";
import { IoCreateOutline } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";

const MobileNav = () => {
  const {role} = useSelector((state:IState)=>state.user)

  return (
    <nav className="mobile-nav">
      <NavLink to="/" className="mobile-nav__item">
        <HiHome />
        <span>Inicio</span>
      </NavLink>

      <NavLink to="/affiliates" className="mobile-nav__item">
        <MdWorkOutline />
        <span>Afiliados</span>
      </NavLink>

      <NavLink to="/cvs" className="mobile-nav__item mobile-nav__item--main">
        <IoCreateOutline size={25} />
        <span>Crear CV</span>
      </NavLink>

      <NavLink to="/pricing" className="mobile-nav__item">
        <FaUser />
        <span>Planes</span>
      </NavLink>

      {
        role === "USER" && <NavLink to="/account" className="mobile-nav__item">
          <TbSettingsCode />
          <span>Cuenta</span>
        </NavLink>
      }

      {
        role === "ADMIN" && <NavLink to="/admin" className="mobile-nav__item">
          <TbSettingsCode />
          <span>Cuenta</span>
        </NavLink>
      }
    </nav>
  );
};

export default MobileNav;
