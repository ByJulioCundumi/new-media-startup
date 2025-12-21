import "./navbar.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";
import type { IState } from "../../interfaces/IState";
import { Link } from "react-router-dom";

import Auth from "../auth/Auth";
import ProfileAvatar from "../profile-avatar/ProfileAvatar";
import { TbLogout2, TbPencilPlus, TbSettingsCode } from "react-icons/tb";
import { HiHome, HiOutlineArrowRightEndOnRectangle } from "react-icons/hi2";
import { LuFileSearch, LuPencilLine } from "react-icons/lu";
import { MdAdminPanelSettings, MdOutlineAdminPanelSettings, MdOutlineDiamond, MdOutlineWorkOutline } from "react-icons/md";
import { RiAccountCircleFill, RiCopperDiamondLine } from "react-icons/ri";

function Navbar() {
  const dispatch = useDispatch();
  const { sidebarOption } = useSelector((state: IState) => state.sidebar);
  const { logged } = useSelector((state: IState) => state.user);

  const [authOpen, setAuthOpen] = useState(false);
  const [authSection, setAuthSection] = useState<"login" | "signup">("login");

  return (
    <>
      <nav className="navbar">
        <div className="navbar__content">

          {/* LOGO */}
          <Link to={"/"} className="navbar__logo" onClick={() => dispatch(setSidebar("home"))}>
            <div className="logo-icon"><TbPencilPlus /></div>
            <span className="logo-text">CvRemoto</span>
          </Link>

          {/* DESKTOP MENU */}
          <ul className="navbar__links">
            <Link
              to={"/"}
              className={sidebarOption === "home" ? "active link" : " link"}
              onClick={() => dispatch(setSidebar("home"))}
            >
             <HiHome />
            </Link>

            <Link
              to={"/cvs"}
              className={sidebarOption === "cvs" ? "active link" : " link"}
              onClick={() => dispatch(setSidebar("cvs"))}
            >
             <LuPencilLine /> {logged ? "Mis CV" : "Crea un CV"}
            </Link>

            <Link
              to={"/templates"}
              className={sidebarOption === "templates" ? "active link" : " link"}
              onClick={() => dispatch(setSidebar("templates"))}
            >
              <LuFileSearch /> Plantillas
            </Link>

            <Link
              to={"/pricing"}
              className={sidebarOption === "pricing" ? "active link" : " link"}
              onClick={() => dispatch(setSidebar("pricing"))}
            >
              <MdOutlineDiamond className="navbar__pricing"/> Planes
            </Link>

            <Link
              to={"/affiliate"}
              className={sidebarOption === "affiliate" ? "active link jobs-pulse" : " link jobs-pulse"}
              onClick={() => dispatch(setSidebar("affiliate"))}
            >
              <MdOutlineWorkOutline /> Trabajo Remoto
            </Link>

            {
              logged && <Link
              to={"/account"}
              className={sidebarOption === "account" ? "active link" : " link"}
              onClick={() => dispatch(setSidebar("account"))}
            >
               <TbSettingsCode className="navbar__settings"/>
            </Link>
            }

            {
              logged && <Link
              to={"/admin"}
              className={sidebarOption === "admin" ? "active link" : " link"}
              onClick={() => dispatch(setSidebar("admin"))}
            >
               <MdAdminPanelSettings className="navbar__settings"/> Admin
            </Link>
            }

          </ul>

          {/* ACTION BUTTONS */}
          { logged === true ?
            <>
              <ProfileAvatar/> 
            </>
            :
            <div className="navbar__actions">
            <button
              className="login"
              onClick={() => {
                setAuthSection("login");
                setAuthOpen(true);
              }}
            >
              <HiOutlineArrowRightEndOnRectangle size={20} />
            </button>

            <button
              className="signup"
              onClick={() => {
                setAuthSection("signup");
                setAuthOpen(true);
              }}
            >
              Crear Cuenta
            </button>
          </div>
          }
        </div>
      </nav>

      {/* Popup Auth */}
      <Auth
        isOpen={authOpen}
        onClose={() => setAuthOpen(false)}
        initialSection={authSection}
      />
    </>
  );
}

export default Navbar;
