import { NavLink } from "react-router-dom";
import "./mobileNav.scss";

import {
  FaHome,
  FaBriefcase,
  FaPlusCircle,
  FaUsers,
  FaUser,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { MdSettingsSuggest } from "react-icons/md";
import { TbSettingsCode } from "react-icons/tb";

const MobileNav = () => {
  const {logged} = useSelector((state:IState)=>state.user)

  return (
    <nav className="mobile-nav">
      <NavLink to="/" className="mobile-nav__item">
        <FaHome />
        <span>Inicio</span>
      </NavLink>

      <NavLink to="/templates" className="mobile-nav__item">
        <FaUsers />
        <span>Plantillas</span>
      </NavLink>

      <NavLink to="/cvs" className="mobile-nav__item mobile-nav__item--main">
        <FaPlusCircle />
        <span>Crear</span>
      </NavLink>


      <NavLink to="/affiliate" className="mobile-nav__item">
        <FaBriefcase />
        <span>Comisiones</span>
      </NavLink>

      {
        logged ? <NavLink to="/account" className="mobile-nav__item">
        <TbSettingsCode />
        <span>Cuenta</span>
      </NavLink>: 
      <NavLink to="/pricing" className="mobile-nav__item">
        <FaUser />
        <span>Planes</span>
      </NavLink>
      }
    </nav>
  );
};

export default MobileNav;
