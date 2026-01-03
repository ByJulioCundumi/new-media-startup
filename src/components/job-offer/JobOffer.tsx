import "./jobOffer.scss";
import {
  FaBriefcase,
  FaUsers,
  FaArrowRight,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import { getAllCvsApi, getCvCountApi } from "../../api/cv";
import AffiliateCommissionRequest from "../../pages/account-page/affiliate-commission-requeset/AffiliateCommissionRequest";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { TbNumber, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { MdKeyboardDoubleArrowDown, MdOutlineNumbers, MdOutlineTimelapse, MdPendingActions } from "react-icons/md";
import { GiLaurelsTrophy, GiTrophyCup } from "react-icons/gi";
import { LuExternalLink, LuTimer } from "react-icons/lu";
import { BsEnvelopeArrowUpFill } from "react-icons/bs";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import { IoFootstepsSharp } from "react-icons/io5";

const JobOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [onlineCvs, setOnlineCvs] = useState(0);
  const [loadingCvs, setLoadingCvs] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isLogged = useSelector((state: IState) => state.user.logged);
  const {commissionRequestStatus, subscriptionExpiresAt} = useSelector((state: IState) => state.user);

  const openModal = async () => {
    // Caso 1: No está logueado
    if (!isLogged) {
      setErrorMessage("Debes iniciar sesión para postularte.");
      return;
    }

    // Caso 2: Está logueado → verificar CVs online
    setLoadingCvs(true);
    try {
      const count = await getCvCountApi();

      if (count === 0 || !hasValidSubscriptionTime(subscriptionExpiresAt)) {
        setErrorMessage(
          "Crea al menos Un CV (Sin Marca De Agua) para postular."
        );
        return;
      }

      // Caso 3: Todo OK → abrir modal
      setOnlineCvs(count);
      setIsModalOpen(true);
      setErrorMessage(null);
    } catch (err) {
      console.warn("Error cargando CVs online:", err);
      setErrorMessage("Hubo un error al verificar tus CVs. Inténtalo más tarde.");
    } finally {
      setLoadingCvs(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeError = () => {
    setErrorMessage(null);
  };

  return (
    <>
      <section className="job-offer-card-container">
        <article className="job-offer-card">
              <a href="#" style={{textDecoration: "underline"}} className="job-stat-info">
                <IoFootstepsSharp /> Solicitar Afiliacion
                <LuExternalLink />
              </a>

          <aside className="job-action">
            {
              (commissionRequestStatus === "CANCELLED" || commissionRequestStatus === "REJECTED" || commissionRequestStatus === null || commissionRequestStatus === "") && <button className="apply-button" onClick={openModal} disabled={loadingCvs}>
               <IoFootstepsSharp /> {loadingCvs ? "Verificando..." : "Enviar Datos"} <BsEnvelopeArrowUpFill />
            </button>
            }
            {
              commissionRequestStatus === "PENDING" && <button className="apply-button" onClick={openModal} disabled={loadingCvs}>
              En Revision... <MdPendingActions />
            </button>
            }
            {
              commissionRequestStatus === "APPROVED" && <button className="apply-button" onClick={openModal} disabled={loadingCvs}>
              ¡Fuiste Aceptado! 
            </button>
            }
            <p className="action-note">
              *Requisito: Ser Usuario Suscrito En <span style={{textDecoration: "underline"}}>cvremoto.com</span>
            </p>
          </aside>
        </article>
      </section>

      {/* Mensaje de error flotante */}
      {errorMessage && (
        <div className="error-toast">
          <p>{errorMessage}</p>
          <button className="error-close" onClick={closeError}>
            <FaTimes />
          </button>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content job-offer-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closeModal}>
              <FaTimes />
            </button>

            <div>
              <h2>¡Completa tu postulación!</h2>
              <p className="modal-subtitle">
                <strong>Nro. (1) </strong> <a href="#">Haz clic aqui</a> y solicita tu afiliacion desde hotmart. (Crea una cuenta si no tienes). <br />
                <strong>Nro. (2) </strong> Completa los campos <span>Nombre y Email</span> de la cuenta que solicitó la afiliacion y envia a revision.
              </p>
            </div>

            {/* Formulario de comisión solo si hay CVs online */}
            {onlineCvs > 0 && (
              <div className="commission-form-container">
                <AffiliateCommissionRequest />
              </div>
            )}

            <p className="modal-footer">
              ¡Trabaja Con Nosotros! Ya hay más de 1.248 Postulantes aceptadas.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default JobOffer;