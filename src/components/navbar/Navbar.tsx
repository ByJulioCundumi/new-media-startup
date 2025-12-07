import "./navbar.scss";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";
import type { IState } from "../../interfaces/IState";
import { Link } from "react-router-dom";

function Navbar() {
  const dispatch = useDispatch()
  const [menuOpen, setMenuOpen] = useState(false);
  const {sidebarOption} = useSelector((state:IState)=> state.sidebar)

  return (
    <nav className="navbar">
      <div className="navbar__content">

        {/* LOGO */}
        <Link to={"/"} className="navbar__logo" onClick={()=>dispatch(setSidebar("home"))}>
          <div className="logo-icon"></div>
          <span className="logo-text">CVBuilder</span>
        </Link>

        {/* DESKTOP MENU */}
        <ul className="navbar__links">
          <Link to={"/"}
            className={sidebarOption === "home" ? "active link" : " link"}
            onClick={()=>dispatch(setSidebar("home"))}
          >
            Inicio
          </Link>

          <Link to={"/cvs"}
            className={sidebarOption === "cvs" ? "active link" : " link"}
            onClick={()=>dispatch(setSidebar("cvs"))}
          >
            Crea un CV
          </Link>

          <Link to={"/templates"}
            className={sidebarOption === "templates" ? "active link" : " link"}
            onClick={()=>dispatch(setSidebar("templates"))}
          >
            Plantillas CV
          </Link>

          <Link to={"/affiliate"}
            className={sidebarOption === "affiliate" ? "active link jobs-pulse" : " link jobs-pulse"}
            onClick={()=>dispatch(setSidebar("affiliate"))}
          >
            Trabaja Con Nosotros
          </Link>
        </ul>

        {/* ACTION BUTTONS */}
        <div className="navbar__actions">
          <button className="login">Iniciar sesión</button>
          <button className="signup">Crear Cuenta</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
