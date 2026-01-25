import "./joboffer.scss";
import { FaTimes } from "react-icons/fa";
import { MdPendingActions } from "react-icons/md";
import { RiMailSendLine } from "react-icons/ri";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import type { IState } from "../../interfaces/IState";
import AffiliateCommissionRequest from "../../pages/account-page/affiliate-commission-requeset/AffiliateCommissionRequest";
import { hasValidSubscriptionTime } from "../../util/checkSubscriptionTime";
import { openAuthModal } from "../../reducers/authModalSlice";
import toast from "react-hot-toast";

const JobOffer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { logged, commissionRequestStatus, subscriptionExpiresAt } =
    useSelector((state: IState) => state.user);

  const handleOpenModal = async () => {
    if (!logged) {
      dispatch(openAuthModal({}));
      toast.error("Debes iniciar sesión para postularte.", {
        duration: 5000,
        icon: '🔒',
      });
      return
    }

    if (!hasValidSubscriptionTime(subscriptionExpiresAt)) {
      toast.error("Este programa es exclusivo para miembros suscritos.", {
        duration: 6000,
      });
      return navigate("/pricing");
    }

    try {
      setLoading(true);
      setIsModalOpen(true);
      setError(null);
    } catch {
      const msg = "Error al verificar la información. Intenta más tarde.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const renderActionButton = () => {
    switch (commissionRequestStatus) {
      case "PENDING":
        return (
          <button className="apply-button pending" disabled>
            En revisión <MdPendingActions />
          </button>
        );
      case "APPROVED":
        return (
          <button className="apply-button success" disabled>
            ¡Fuiste aceptado!
          </button>
        );
      default:
        return (
          <button
            className="apply-button"
            onClick={handleOpenModal}
            disabled={loading}
          >
            {loading ? "Verificando..." : "Validar solicitud"}
          </button>
        );
    }
  };

  return (
    <>
      <section className="job-offer">
        <article className="job-offer__card">
          <a className="job-offer__badge">
            <RiMailSendLine />
            <span>Solicitar afiliación</span>
            <RiMailSendLine />
          </a>

          <aside className="job-offer__action">
            {renderActionButton()}
            <p className="job-offer__note">
              * Solo para miembros suscritos en{" "}
              <span>cvremoto.com</span>
            </p>
          </aside>
        </article>
      </section>

      {/* ERROR */}
      {error && (
        <div className="toast-error">
          <p>{error}</p>
          <button onClick={() => setError(null)}>
            <FaTimes />
          </button>
        </div>
      )}

      {/* MODAL */}
      {isModalOpen && (
        <div className="modal" onClick={() => setIsModalOpen(false)}>
          <div className="modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="modal__close" onClick={() => setIsModalOpen(false)}>
              <FaTimes />
            </button>

            <h2>Completa tu postulación</h2>

            <p className="modal__step">
              <strong>Paso 1:</strong> Solicita tu afiliación desde Hotmart
            </p>
            <p className="modal__step">
              <strong>Paso 2:</strong> Completa los datos de la cuenta solicitante
            </p>

            <AffiliateCommissionRequest />

            <p className="modal__footer">
              Únete a cientos de afiliados que ya generan ingresos online
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default JobOffer;
