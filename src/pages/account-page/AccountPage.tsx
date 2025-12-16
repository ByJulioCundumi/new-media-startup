import { useDispatch } from "react-redux";
import "./accountpage.scss";
import GeneralInfoForm from "./general-info-form/GeneralInfoForm";
import PasswordSettings from "./password-settings/PasswordSettings";
import { useEffect } from "react";
import { setSidebar } from "../../reducers/sidebarSlice";
import AffiliateCommissionRequest from "./affiliate-commission-requeset/AffiliateCommissionRequest";
import { FiLogOut, FiTrash2 } from "react-icons/fi";
import { HiOutlineArrowLeftStartOnRectangle, HiOutlineArrowRightEndOnRectangle } from "react-icons/hi2";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";

function AccountPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebar("account"));
  }, [dispatch]);

  const handleLogout = () => {
    // 👉 aquí va tu lógica real de logout
    console.log("Cerrar sesión");
  };

  const handleDeleteAccount = () => {
    // 👉 aquí va confirm modal + llamada backend
    console.log("Eliminar cuenta");
  };

  return (
    <section className="account-page">
      <GeneralInfoForm />
      <AffiliateCommissionRequest />
      <PasswordSettings />

      {/* ===== ACCIONES DE CUENTA ===== */}
      <div className="account-page__actions">
        <button
          className="account-page__logout-btn"
          onClick={handleLogout}
        >
          <HiOutlineArrowLeftStartOnRectangle />
          Cerrar sesión
        </button>

        <button
          className="account-page__delete-btn"
          onClick={handleDeleteAccount}
        >
          <FiTrash2 />
          Eliminar cuenta
        </button>
      </div>
    </section>
  );
}

export default AccountPage;
