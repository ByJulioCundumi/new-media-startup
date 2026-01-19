import "./jobOffer.scss";
import {
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { IState } from "../../interfaces/IState";
import AffiliateCommissionRequest from "../../pages/account-page/affiliate-commission-requeset/AffiliateCommissionRequest";
import {  MdPendingActions } from "react-icons/md";
import { LuExternalLink } from "react-icons/lu";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import { useNavigate } from "react-router-dom";
import { openAuthModal } from "../../reducers/authModalSlice";

const JobOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingCvs, setLoadingCvs] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const isLogged = useSelector((state: IState) => state.user.logged);
  const {commissionRequestStatus, subscriptionExpiresAt} = useSelector((state: IState) => state.user);

  const openModal = async () => {
    // Caso 1: No está logueado
    if (!isLogged) {
      alert("Debes iniciar sesión para postularte.");
      dispatch(openAuthModal({}))
      return;
    }

    // Caso 2: Está logueado → verificar CVs online
    setLoadingCvs(true);
    try {
      if (!hasValidSubscriptionTime(subscriptionExpiresAt)) {
        alert(
          "Este programa solo esta disponible para usuarios con una suscripcion activa."
        );
        navigate("/pricing")
        return;
      }

      // Caso 3: Todo OK → abrir modal
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
                 Solicitar Mi Afiliacion 
                <LuExternalLink />
              </a>

          <aside className="job-action">
            {
              (commissionRequestStatus === "CANCELLED" || commissionRequestStatus === "REJECTED" || commissionRequestStatus === null || commissionRequestStatus === "") && <button className="apply-button" onClick={openModal} disabled={loadingCvs}>
                {loadingCvs ? "Verificando..." : "Validar Solicitud"} 
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
              *Solo Para Usuarios con suscripcion activa en  <span style={{textDecoration: "underline"}}>cvremoto.com</span>
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
                <strong>Paso. (1) </strong> <a href="#">Solicita tu afiliacion</a> desde hotmart. <br />
              </p>
              <p className="modal-subtitle">
                <strong>Paso. (2) </strong> Completa los campos de la cuenta hotmart solicitante.
              </p>
            </div>

            {/* Formulario de comisión solo si hay CVs online */}
            {(
              <div className="commission-form-container">
                <AffiliateCommissionRequest />
              </div>
            )}

            <p className="modal-footer">
              ¡únete a cientos de afiliados que ya generan ingresos en linea!
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default JobOffer;