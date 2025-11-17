import "./navbar.scss";
import { SiGamemaker } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";
import { TbVip } from "react-icons/tb";
import { FaIdCardAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  // 🔹 MOCK DE USUARIO
  const user = {
    email: "usuario.mock@example.com",
    hasMembership: true,
    membershipEnds: "2025-04-15",
  };

  const handleBuyMembership = () => {
    alert("Simulación: Compra de membresía.");
  };

  return (
    <nav className="navbar navbar--clean">
      <div className="navbar__left" onClick={() => navigate("/")}>
        <SiGamemaker className="navbar__logo" />
        <span className="navbar__title">
          <span className="navbar__title--strong">Ret</span>tomus
        </span>
      </div>


      <div className="navbar__right">
        <div className="navbar__membership-box">
          {user.hasMembership ? (
            <>
              <FaIdCardAlt className="vip-icon active" />
              <span className="membership-status">
                {user.membershipEnds}
              </span>
            </>
          ) : (
            <>
              <FaIdCardAlt className="vip-icon inactive" />
              <span className="membership-status inactive">
                Obten Tu Membresia
              </span>
            </>
          )}
          <button
            className="membership-btn"
            onClick={handleBuyMembership}
          >
            <PiShoppingCartFill />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
