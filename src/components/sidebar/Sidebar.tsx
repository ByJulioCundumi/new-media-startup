import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./sidebar.scss";
import { setSidebar } from "../../reducers/sidebarSlice";
import { IoCreate, IoCreateOutline, IoPricetagsOutline, IoSearchSharp } from "react-icons/io5";
import { MdOutlineAdminPanelSettings, MdOutlineWorkHistory, MdOutlineWorkOutline, MdWork } from "react-icons/md";
import { LuFileSearch, LuLayoutDashboard, LuPencilLine, LuSettings2, LuUsers } from "react-icons/lu";
import { RiArrowGoBackFill, RiDashboardFill, RiHome2Line, RiLogoutBoxLine } from "react-icons/ri";
import type { IState } from "../../interfaces/IState";
import { TbArrowBack, TbSettingsCode, TbTemplate } from "react-icons/tb";
import { HiHome, HiOutlineCreditCard } from "react-icons/hi2";
import { PiCardsThreeLight } from "react-icons/pi";
import { GrSelect } from "react-icons/gr";
import { FaRegCreditCard } from "react-icons/fa";

const Sidebar: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sidebarOption } = useSelector((state: IState) => state.sidebar);

  const handleLogout = async () => {
    
  };

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <ul className="sidebar__menu">
          {/* --- Home --- */}
          <Link
            to="/"
            onClick={() => dispatch(setSidebar("home"))}
            className={
              sidebarOption === "home"
                ? "sidebar__menu-item-active sidebar__profile-active"
                : "sidebar__menu-item sidebar__profile-active"
            }
          >
            <div className="sidebar__tooltip-container">
              <span className="sidebar__icon">
                <HiHome />
              </span>
              <span className="sidebar__tooltip">Inicio</span>
            </div>
          </Link>

          <Link
            to="/cvs"
            onClick={() => dispatch(setSidebar("cvs"))}
            className={
              sidebarOption === "cvs"
                ? "sidebar__menu-item-active"
                : "sidebar__menu-item"
            }
          >
            <div className="sidebar__tooltip-container">
              <span className="sidebar__icon sidebar__explore-icon">
                {sidebarOption === "cvs" ? <LuPencilLine /> : sidebarOption !== "create" ? <LuPencilLine /> : <RiArrowGoBackFill/>}
              </span>
              <span className="sidebar__tooltip">Mis CV</span>
            </div>
          </Link>

          <Link
            to="/templates"
            onClick={() => dispatch(setSidebar("templates"))}
            className={
              sidebarOption === "templates"
                ? "sidebar__menu-item-active"
                : "sidebar__menu-item"
            }
          >
            <div className="sidebar__tooltip-container">
              <span className="sidebar__icon sidebar__explore-icon">
                <LuFileSearch />
              </span>
              <span className="sidebar__tooltip">Platillas</span>
            </div>
          </Link>

          { 
            <Link
            to="/subscription"
            onClick={() => dispatch(setSidebar("subscription"))}
            className={
              sidebarOption === "subscription"
                ? "sidebar__menu-item-active"
                : "sidebar__menu-item"
            }
          >
            <div className="sidebar__tooltip-container">
              <span className="sidebar__icon">
                <HiOutlineCreditCard />
              </span>
              <span className="sidebar__tooltip">Suscripciones</span>
            </div>
          </Link>
          }
        </ul>
      </div>

      {/* --- Footer --- */}
      <div
        className="sidebar__bottom"
      >
        <Link
              to={`/account`}
              onClick={() => dispatch(setSidebar("account"))}
              className={`sidebar__profile-link ${
                sidebarOption === "account" ? "sidebar__profile-link--active" : ""
              }`}
            >
              <span className="sidebar__icon">
              <TbSettingsCode/>
              </span>
              <span className="sidebar__tooltip">
                Cuenta
              </span>
            </Link>

        <div onClick={handleLogout} className="sidebar__tooltip-container logout" role="button">
          <span className="sidebar__icon">
            <RiLogoutBoxLine />
          </span>
          <span className="sidebar__tooltip">
            Cerrar Sesion
          </span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;