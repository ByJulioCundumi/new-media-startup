import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setSidebar } from "../../reducers/sidebarSlice";
import type { IState } from "../../interfaces/IState";

import ProfileAvatar from "../profile-avatar/ProfileAvatar";
import { TbSettingsCode } from "react-icons/tb";
import { HiHome } from "react-icons/hi2";
import { LuFileSearch } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdManageSearch,
  MdWorkOutline,
} from "react-icons/md";
import { PiReadCvLogo, PiShoppingCartBold } from "react-icons/pi";
import { IoSearchOutline } from "react-icons/io5";
import SearchBar from "../search-bar/SearchBar";

function Navbar() {
  const dispatch = useDispatch();
  const { sidebarOption } = useSelector((state: IState) => state.sidebar);
  const { logged, role } = useSelector((state: IState) => state.user);

  return (
    <nav className="navbar">
      <div className="navbar__content">

        {/* LOGO */}
        <Link
          to="/"
          className="navbar__logo"
          onClick={() => dispatch(setSidebar("templates"))}
        >
          <div className="logo-icon">
            <PiReadCvLogo />
          </div>
          <span className="logo-text">CvRemoto</span>
        </Link>

        {/* LINKS */}
        <ul className="navbar__links">

            <Link
            to="/"
            className={`link ${
              sidebarOption === "templates" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("templates"))}
          >
            <HiHome />
            <span>Inicio</span>
          </Link>

          {
            sidebarOption !== "explore" ? <Link
            to="/explore"
            className={`link ${
              sidebarOption === "explore" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("explore"))}
          >
            <IoSearchOutline />
            <span>Explorar</span>
          </Link>
            :
            <SearchBar textHolder="Buscar"/>
          }

          <Link
            to="/pricing"
            className={`link ${
              sidebarOption === "pricing" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("pricing"))}
          >
            <PiShoppingCartBold className="navbar__pricing" />
            <span>Suscripciones</span>
          </Link>

          <Link
            to="/affiliates"
            className={`link ${
              sidebarOption === "affiliates" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("affiliates"))}
          >
            <MdWorkOutline className="navbar__pricing" />
            <span>Affiliados</span>
          </Link>


          {role === "USER" && (
            <Link
              to="/account"
              className={`link ${
                sidebarOption === "account" ? "active" : ""
              }`}
              onClick={() => dispatch(setSidebar("account"))}
            >
              <TbSettingsCode /> <span>Mi Cuenta</span>
            </Link>
          )}

          {logged && role === "ADMIN" && (
            <Link
              to="/admin"
              className={`link ${
                sidebarOption === "admin" ? "active" : ""
              }`}
              onClick={() => dispatch(setSidebar("admin"))}
            >
              <MdAdminPanelSettings />
              <span>Admin</span>
            </Link>
          )}
        </ul>

        {/* ACTIONS */}
        <ProfileAvatar />
      </div>
    </nav>
  );
}

export default Navbar;
