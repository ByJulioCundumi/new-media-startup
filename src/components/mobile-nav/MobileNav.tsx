import { NavLink } from "react-router-dom";
import "./mobileNav.scss";

import {
  FaHome,
  FaBriefcase,
  FaPlusCircle,
  FaUsers,
  FaUser,
} from "react-icons/fa";

const MobileNav = () => {
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
        <span>Trabajo</span>
      </NavLink>

      <NavLink to="/pricing" className="mobile-nav__item">
        <FaUser />
        <span>Planes</span>
      </NavLink>
    </nav>
  );
};

export default MobileNav;
