// src/components/AffiliateCommissionRequest.tsx
import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  RiMailSendFill,
  RiUserStarLine,
  RiTimeLine,
  RiCheckLine,
  RiCloseLine,
  RiInformationLine,
} from "react-icons/ri";
import {
  getMyCommissionRequestApi,
  createCommissionRequestApi,
  cancelCommissionRequestApi,
} from "../../../api/commission";
import { getMyCommissionApi } from "../../../api/auth";
import "./affiliatecommissisonrequest.scss";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

interface CommissionRequestData {
  id: string;
  status: RequestStatus;
  hotmartUsername: string;
  hotmartEmail: string;
  denyReason?: string;
  approvedCommission?: number;
  previousHotmartUsername?: string | null;
  previousHotmartEmail?: string | null;
  previousApprovedCommission?: number | null;
}

const AffiliateCommissionRequest: React.FC = () => {
  const [currentCommission, setCurrentCommission] = useState<number>(20);
  const [request, setRequest] = useState<CommissionRequestData | null>(null);
  const [form, setForm] = useState({ hotmartUsername: "", hotmartEmail: "" });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const prevRequestRef = React.useRef<CommissionRequestData | null>(null);

  const loadData = async () => {
    setInitialLoading(true);
    try {
      const [commission, myRequest] = await Promise.all([
        getMyCommissionApi(),
        getMyCommissionRequestApi().catch(() => null),
      ]);

      setCurrentCommission(commission);

      if (myRequest) {
        setRequest(myRequest);
        setForm({
          hotmartUsername: myRequest.hotmartUsername,
          hotmartEmail: myRequest.hotmartEmail,
        });

        if (myRequest.status === "APPROVED" && myRequest.approvedCommission) {
          setCurrentCommission(myRequest.approvedCommission);
        }

        if (
          prevRequestRef.current?.status === "PENDING" &&
          myRequest.status === "APPROVED" &&
          prevRequestRef.current.previousHotmartUsername !== null
        ) {
          setMessage("Tu actualización de datos fue rechazada o cancelada.");
        }
      } else {
        setRequest(null);
        setForm({ hotmartUsername: "", hotmartEmail: "" });
      }

      prevRequestRef.current = myRequest;
    } catch (err: any) {
      setMessage("Error al cargar la información.");
    } finally {
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.hotmartUsername.trim() || !form.hotmartEmail.trim()) return;

    setLoading(true);
    setMessage(null);

    try {
      const response = await createCommissionRequestApi(form);
      const updatedRequest = response.request || response;

      setRequest(updatedRequest);
      setForm({
        hotmartUsername: updatedRequest.hotmartUsername,
        hotmartEmail: updatedRequest.hotmartEmail,
      });

      if (request?.status === "APPROVED" && updatedRequest.status === "PENDING") {
        setCurrentCommission(20);
        setMessage("Actualización de datos solicitada.");
      } else if (!request || ["CANCELLED", "REJECTED"].includes(request.status)) {
        setMessage("¡Solicitud enviada con éxito!");
      }
    } catch (err: any) {
      setMessage(err.message || "Error al procesar la solicitud.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 8000);
    }
  };

  const handleCancel = async () => {
    if (!request?.id) return;

    setLoading(true);
    try {
      // Validación fresca del estado
      const freshRequest = await getMyCommissionRequestApi().catch(() => null);

      if (!freshRequest || freshRequest.status !== "PENDING") {
        setMessage("El estado de la solicitud ha cambiado. Actualizando...");
        setTimeout(() => window.location.reload(), 1500);
        return;
      }

      // Si sigue pendiente, procedemos a cancelar
      await cancelCommissionRequestApi(request.id);
      setMessage("Solicitud cancelada exitosamente.");
      setTimeout(() => window.location.reload(), 1500);
    } catch (err: any) {
      setMessage(err.message || "Error al intentar cancelar la solicitud.");
      setTimeout(() => setMessage(null), 6000);
    } finally {
      setLoading(false);
    }
  };

  const isPending = request?.status === "PENDING";
  const isApproved = request?.status === "APPROVED";
  const isRejected = request?.status === "REJECTED" && request.previousHotmartUsername === null;
  const isCancelled = request?.status === "CANCELLED" && request.previousHotmartUsername === null;

  const showSubmitButton = !isPending && (form.hotmartUsername.trim() || form.hotmartEmail.trim() || !request);

  const getSubmitButtonText = () => {
    if (!request || isCancelled || isRejected) {
      return "Solicitar Incremento de Comisión";
    }
    if (isApproved) {
      return "Actualizar Mis Datos De Afiliado";
    }
    return "Solicitar Incremento de Comisión";
  };

  if (initialLoading) {
    return (
      <div className="affiliate-commission-request">
        <p className="loading-text">Cargando tu información de comisión...</p>
      </div>
    );
  }

  return (
    <div className="affiliate-commission-request">
      <header className="affiliate-commission-request__header">
        <h3>Incremento de Comisión al 50%</h3>
        <p>Envía tus datos de afiliado en Hotmart para solicitar o gestionar tu incremento de comisión.</p>
      </header>

      <form onSubmit={(e) => e.preventDefault()} className="affiliate-commission-request__form">
        <div className="affiliate-commission-request__fields">
          <div className="affiliate-commission-request__field">
            <label>Nombre de Usuario (Hotmart)</label>
            <div className="affiliate-commission-request__input-wrapper">
              <RiUserStarLine />
              <input
                type="text"
                name="hotmartUsername"
                value={form.hotmartUsername}
                onChange={handleChange}
                placeholder="tu_usuario_hotmart"
                required
                disabled={loading || isPending} // Deshabilitado mientras esté pendiente
              />
            </div>
          </div>

          <div className="affiliate-commission-request__field">
            <label>Email de Afiliado (Hotmart)</label>
            <div className="affiliate-commission-request__input-wrapper">
              <RiUserStarLine />
              <input
                type="email"
                name="hotmartEmail"
                value={form.hotmartEmail}
                onChange={handleChange}
                placeholder="tuemail@hotmart.com"
                required
                disabled={loading || isPending}
              />
            </div>
          </div>
        </div>

        {request && (
          <div className={`status-card status-card--${request.status.toLowerCase()}`}>
            <div className="status-card__icon">
              {isPending && <RiTimeLine />}
              {isApproved && <RiCheckLine />}
              {request.status === "REJECTED" && <RiCloseLine />}
              {request.status === "CANCELLED" && <RiInformationLine />}
            </div>
            <div className="status-card__content">
              {isPending && (
                <>
                  <strong>Solicitud en revisión</strong>
                  <p>Recibirás una respuesta dentro de poco.</p>
                  <p className="status-card__note">Mientras tanto, puedes cancelar la solicitud si lo deseas.</p>
                </>
              )}

              {isApproved && (
                <>
                  <strong>¡Comisión Aumentada: {request.approvedCommission}%!</strong>
                  <p>Estás ganando más por cada venta.</p>
                  <p className="status-card__note">
                    Si cambiaste de cuenta Hotmart, actualiza tus datos de afiliado para recuperar tu comisión del {request.approvedCommission}%.
                  </p>
                </>
              )}

              {request.status === "REJECTED" && (
                <>
                  <strong>Solicitud rechazada</strong>
                  <p>Motivo: {request.denyReason || "No especificado."}</p>
                  <p className="status-card__note">
                    <strong>¡Puedes reintentar!</strong> Envía nuevamente tus datos.
                  </p>
                </>
              )}

              {request.status === "CANCELLED" && (
                <>
                  <strong>Solicitud cancelada</strong>
                  <p>Puedes solicitar el incremento nuevamente cuando lo desees.</p>
                </>
              )}
            </div>
          </div>
        )}

        {request?.denyReason && isApproved && (
          <p className="status-card__rejection">
            <strong>Actualización de datos rechazada.<br /></strong>
            <span className="status-alert">{request.denyReason}</span>
          </p>
        )}

        <div className="affiliate-commission-request__actions">
          {/* Botón de enviar/actualizar: SOLO si NO está pending */}
          {!isPending && showSubmitButton && (
            <button
              type="button"
              disabled={loading}
              className="btn btn--primary"
              onClick={() => setShowSubmitConfirm(true)}
            >
              <RiMailSendFill />
              {getSubmitButtonText()}
            </button>
          )}

          {/* Botón de cancelar: SOLO si está pending */}
          {isPending && (
            <button
              type="button"
              onClick={() => setShowCancelConfirm(true)}
              disabled={loading}
              className="btn btn--danger"
            >
              Cancelar Solicitud
            </button>
          )}

          {message && (
            <div className="toast toast--info">{message}</div>
          )}
        </div>
      </form>

      {/* Modal de confirmación para enviar solicitud */}
      {showSubmitConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <p>¿Tus nuevos datos son correctos?</p>
            <p>{form.hotmartUsername} <br /> {form.hotmartEmail}</p>
            <div className="modal-actions">
              <button
                className="btn btn--secondary"
                onClick={() => setShowSubmitConfirm(false)}
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                className="btn btn--primary"
                onClick={() => {
                  setShowSubmitConfirm(false);
                  handleSubmit(new Event("submit") as any);
                }}
                disabled={loading}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para cancelar */}
      {showCancelConfirm && (
        <div className="modal-overlay">
          <div className="modal">
            <h4>¿Cancelar solicitud?</h4>
            <p>Esta acción no se puede deshacer.</p>
            <div className="modal-actions">
              <button
                className="btn btn--secondary"
                onClick={() => setShowCancelConfirm(false)}
                disabled={loading}
              >
                No
              </button>
              <button
                className="btn btn--danger"
                onClick={() => {
                  setShowCancelConfirm(false);
                  handleCancel();
                }}
                disabled={loading}
              >
                Sí, cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AffiliateCommissionRequest;