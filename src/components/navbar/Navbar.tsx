import "./navbar.scss";
import { SiGamemaker } from "react-icons/si";
import { useNavigate } from "react-router-dom";
import { PiShoppingCartFill } from "react-icons/pi";
import { TbVip } from "react-icons/tb";
import { FaIdCardAlt } from "react-icons/fa";
import ProfileAvatar from "../profile-avatar/ProfileAvatar";
import SearchBar from "../search-bar/SearchBar";

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
      <SearchBar textHolder="Buscar"/>

      <div className="navbar__right">
        <ProfileAvatar/>
      </div>
    </nav>
  );
}

export default Navbar;
