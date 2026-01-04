import "./navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setSidebar } from "../../reducers/sidebarSlice";
import type { IState } from "../../interfaces/IState";

import ProfileAvatar from "../profile-avatar/ProfileAvatar";
import { TbPencilPlus, TbSettingsCode } from "react-icons/tb";
import { HiHome, HiOutlineArrowRightEndOnRectangle } from "react-icons/hi2";
import { LuFileSearch, LuPencilLine, LuUserRoundPlus } from "react-icons/lu";
import {
  MdAdminPanelSettings,
  MdOutlineDiamond,
  MdOutlineWorkOutline,
} from "react-icons/md";
import { openAuthModal } from "../../reducers/authModalSlice";

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
          onClick={() => dispatch(setSidebar("home"))}
        >
          <div className="logo-icon">
            <TbPencilPlus />
          </div>
          <span className="logo-text">CvRemoto</span>
        </Link>

        {/* LINKS */}
        <ul className="navbar__links">
          <Link
              to={"/"}
              className={sidebarOption === "home" ? "active link" : " link"}
              onClick={() => dispatch(setSidebar("home"))}
            >
             <HiHome /> <span>Inicio</span>
            </Link>

          <Link
            to="/cvs"
            className={`link ${
              sidebarOption === "cvs" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("cvs"))}
          >
            <LuPencilLine />
            <span>Crea un CV</span>
          </Link>

          <Link
            to="/templates"
            className={`link ${
              sidebarOption === "templates" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("templates"))}
          >
            <LuFileSearch />
            <span>Plantillas</span>
          </Link>

          <Link
            to="/pricing"
            className={`link ${
              sidebarOption === "pricing" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("pricing"))}
          >
            <MdOutlineDiamond className="navbar__pricing" />
            <span>Planes</span>
          </Link>

          <Link
            to="/affiliate"
            className={`link jobs-pulse ${
              sidebarOption === "affiliate" ? "active" : ""
            }`}
            onClick={() => dispatch(setSidebar("affiliate"))}
          >
            <MdOutlineWorkOutline />
            <span>Gana Comisiones</span>
          </Link>

          {logged && role === "USER" && (
            <Link
              to="/account"
              className={`link ${
                sidebarOption === "account" ? "active" : ""
              }`}
              onClick={() => dispatch(setSidebar("account"))}
            >
              <TbSettingsCode /> <span>Cuenta</span>
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
