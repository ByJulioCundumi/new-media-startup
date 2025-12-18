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

  const prevRequestRef = React.useRef<CommissionRequestData | null>(null);

  useEffect(() => {
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

          // Detectar restauración tras rechazo/cancelación de reasignación
          if (
            prevRequestRef.current?.status === "PENDING" &&
            myRequest.status === "APPROVED" &&
            prevRequestRef.current.previousHotmartUsername !== null
          ) {
            setMessage("Tu reasignación fue rechazada o cancelada. Se restauraron tus datos y comisión anteriores.");
          }
        } else {
          setRequest(null);
          setForm({ hotmartUsername: "", hotmartEmail: "" });
        }

        prevRequestRef.current = myRequest;
      } catch (err: any) {
        setMessage("Error al cargar la información. Por favor, recarga la página.");
      } finally {
        setInitialLoading(false);
      }
    };

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
      const updatedRequest = response.request || response; // compatibilidad

      setRequest(updatedRequest);
      setForm({
        hotmartUsername: updatedRequest.hotmartUsername,
        hotmartEmail: updatedRequest.hotmartEmail,
      });

      if (request?.status === "APPROVED" && updatedRequest.status === "PENDING") {
        setCurrentCommission(20);
        setMessage("Reasignación solicitada. Tu comisión vuelve temporalmente al 20% hasta nueva aprobación.");
      } else if (!request || ["CANCELLED", "REJECTED"].includes(request.status)) {
        setMessage("¡Solicitud enviada con éxito! Pronto será revisada.");
      } else if (request.status === "PENDING") {
        setMessage("Datos actualizados. Tu solicitud sigue en revisión.");
      }
    } catch (err: any) {
      setMessage(err.message || "Error al procesar la solicitud.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 8000);
    }
  };

  const handleCancel = async () => {
    if (!request?.id || request.status !== "PENDING") return;

    setLoading(true);
    try {
      await cancelCommissionRequestApi(request.id);
      setMessage("Solicitud cancelada. Se restauró tu estado anterior si correspondía.");
      window.location.reload();
    } catch (err: any) {
      setMessage(err.message || "Error al cancelar.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 6000);
    }
  };

  const isPending = request?.status === "PENDING";
  const isApproved = request?.status === "APPROVED";
  const isRejected = request?.status === "REJECTED" && request.previousHotmartUsername === null;
  const isCancelled = request?.status === "CANCELLED" && request.previousHotmartUsername === null;

  const isSubmitEnabled = !loading && form.hotmartUsername.trim() && form.hotmartEmail.trim();

  const getSubmitButtonText = () => {
    if (!request || isCancelled || isRejected) return "Solicitar Incremento de Comisión";
    if (isPending) return "Actualizar Datos";
    if (isApproved) return "Reasignar mi Comisión";
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

      <form onSubmit={handleSubmit} className="affiliate-commission-request__form">
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
                disabled={loading}
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
                disabled={loading}
              />
            </div>
          </div>
        </div>

        {request && (
          <div className={`status-card status-card--${request.status.toLowerCase()}`}>
            <div className="status-card__icon">
              {isPending && <RiTimeLine />}
              {isApproved && <RiCheckLine />}
              {isRejected && <RiCloseLine />}
              {isCancelled && <RiInformationLine />}
            </div>
            <div className="status-card__content">
              {isPending && (
                <>
                  <strong>Solicitud en revisión</strong>
                  <p>El administrador la revisará pronto.</p>
                  <p className="status-card__note">Puedes actualizar tus datos o cancelar la solicitud.</p>
                </>
              )}

              {isApproved && (
                <>
                  <strong>¡Comisión aprobada: {request.approvedCommission}%!</strong>
                  <p>Estás ganando más por cada venta.</p>
                  <p className="status-card__note">
                    Si cambiaste de cuenta Hotmart, pulsa "Reasignar mi Comisión" para solicitar una nueva revisión.
                  </p>
                </>
              )}

              {isRejected && (
                <>
                  <strong>Solicitud rechazada</strong>
                  <p>Motivo: {request.denyReason || "No especificado."}</p>
                  <p className="status-card__note">
                    <strong>¡Puedes reintentar!</strong> Envía nuevamente tus datos.
                  </p>
                </>
              )}

              {isCancelled && (
                <>
                  <strong>Solicitud cancelada</strong>
                  <p>Puedes solicitar el incremento nuevamente cuando lo desees.</p>
                </>
              )}
            </div>
          </div>
        )}

        {isApproved && request.denyReason && (
                <span>Reasignacion Rechazada: {request.denyReason}</span>
              )}

        <div className="affiliate-commission-request__actions">
          <button type="submit" disabled={!isSubmitEnabled} className="btn btn--primary">
            <RiMailSendFill />
            {getSubmitButtonText()}
          </button>

          {isPending && (
            <button type="button" onClick={handleCancel} disabled={loading} className="btn btn--danger">
              Cancelar Solicitud
            </button>
          )}

          {message && (
            <div
              className={`toast ${
                message.includes("rechazada") || message.includes("restaur") || message.includes("cancelada")
                  ? "toast--info"
                  : message.includes("éxito") || message.includes("enviado")
                  ? "toast--success"
                  : "toast--error"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AffiliateCommissionRequest;