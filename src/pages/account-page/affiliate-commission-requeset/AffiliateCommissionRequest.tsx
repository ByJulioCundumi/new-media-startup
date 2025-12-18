import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { RiMailSendFill, RiUserStarLine, RiRefreshLine } from "react-icons/ri";
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
}

const AffiliateCommissionRequest: React.FC = () => {
  const [currentCommission, setCurrentCommission] = useState<number>(20);
  const [request, setRequest] = useState<CommissionRequestData | null>(null);
  const [form, setForm] = useState({ hotmartUsername: "", hotmartEmail: "" });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

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
        }
      } catch (err: any) {
        console.error("Error cargando datos:", err);
        setMessage("No pudimos cargar tu información. Por favor, recarga la página.");
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
    setLoading(true);
    setMessage(null);

    try {
      const newRequest = await createCommissionRequestApi(form);
      setRequest(newRequest);
      setMessage("Tu solicitud ha sido enviada correctamente");
    } catch (err: any) {
      setMessage(err.message || "Ocurrió un error al enviar tu solicitud. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleCancel = async () => {
    if (!request?.id) return;
    setLoading(true);
    try {
      await cancelCommissionRequestApi(request.id);
      setRequest(null);
      setForm({ hotmartUsername: "", hotmartEmail: "" });
      setMessage("Tu solicitud ha sido cancelada. Puedes enviar una nueva cuando quieras.");
    } catch (err: any) {
      setMessage(err.message || "No se pudo cancelar la solicitud. Inténtalo más tarde.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const handleUpdateForNewRequest = () => {
    setRequest(null);
    setForm({ hotmartUsername: "", hotmartEmail: "" });
    setMessage("Ahora puedes solicitar un nuevo incremento de comisión cuando lo desees.");
    setTimeout(() => setMessage(null), 3000);
  };

  const canSendNewRequest = !request || request.status === "REJECTED" || request.status === "CANCELLED";
  const canUpdateForNewRequest = request?.status === "APPROVED";
  const isPending = request?.status === "PENDING";

  if (initialLoading) {
    return (
      <div className="affiliate-commission-request">
        <p style={{ textAlign: "center", padding: "2.5rem", color: "#4b5563" }}>
          Cargando tu información de comisión...
        </p>
      </div>
    );
  }

  return (
    <div className="affiliate-commission-request">
      <header className="affiliate-commission-request__header">
        <h3>
          Tu comisión actual: <strong>{currentCommission}%</strong>
        </h3>
        <p>
          ¿Quieres ganar más por cada venta? Solicita un incremento de comisión enviando tus datos de Hotmart.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="affiliate-commission-request__content">
        <div className="affiliate-commission-request__field">
          <label>Usuario en Hotmart</label>
          <div className="affiliate-commission-request__input-icon">
            <RiUserStarLine />
            <input
              type="text"
              name="hotmartUsername"
              value={form.hotmartUsername}
              onChange={handleChange}
              placeholder="Ej: tu_usuario_hotmart"
              required
              disabled={!canSendNewRequest || loading}
            />
          </div>
        </div>

        <div className="affiliate-commission-request__field">
          <label>Email registrado en Hotmart</label>
          <div className="affiliate-commission-request__input-icon">
            <RiUserStarLine />
            <input
              type="email"
              name="hotmartEmail"
              value={form.hotmartEmail}
              onChange={handleChange}
              placeholder="Ej: tuemail@hotmart.com"
              required
              disabled={!canSendNewRequest || loading}
            />
          </div>
        </div>

        {/* Mensajes de estado mejorados */}
        {request && (
          <div className={`affiliate-commission-request__status affiliate-commission-request__status--${request.status.toLowerCase()}`}>
            {request.status === "PENDING" && (
              <>
                <strong>⏳ Tu solicitud está en revisión</strong>
                <p>¡Gracias por tu interés!</p>
                <p>Te notificaremos el resultado muy pronto.</p>
              </>
            )}

            {request.status === "APPROVED" && (
              <>
                <strong>¡Tu comisión ha sido aumentada!</strong>
                <p>
                  Ahora ganaras un <strong>{request.approvedCommission}%</strong> de comision por cada venta realizada.
                </p>
              </>
            )}

            {request.status === "REJECTED" && (
              <>
                <strong>❌ Tu solicitud fue rechazada</strong>
                <div className="affiliate-commission-request__reject-reason">
                  <p className="affiliate-commission-request__reject-text">
                    {request.denyReason || "No se especificó un motivo detallado. Por favor, sigue mejorando tus ventas para cumplir con los requisitos."}
                  </p>
                </div>
              </>
            )}

            {request.status === "CANCELLED" && (
              <>
                <strong>ℹ️ Solicitud cancelada</strong>
                <p>Solicita tu incremento de comision cuando lo consideres oportuno.</p>
              </>
            )}
          </div>
        )}

        <div className="affiliate-commission-request__actions">
          {canSendNewRequest && (
            <button
              type="submit"
              disabled={loading || !form.hotmartUsername.trim() || !form.hotmartEmail.trim()}
              className="affiliate-commission-request__save-btn"
            >
              <RiMailSendFill />
              {request?.status === "REJECTED" || request?.status === "CANCELLED"
                ? "Volver a Solicitar"
                : "Solicitar Incremento de Comisión"}
            </button>
          )}

          {canUpdateForNewRequest && (
            <button
              type="button"
              onClick={handleUpdateForNewRequest}
              className="affiliate-commission-request__update-btn"
            >
              <RiRefreshLine />
              Actualizar mi datos
            </button>
          )}

          {isPending && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="affiliate-commission-request__cancel-btn"
            >
              Cancelar solicitud actual
            </button>
          )}

          {message && (
            <span
              className={`affiliate-commission-request__message ${
                message.includes("éxito") || message.includes("Perfecto") || message.includes("Listo")
                  ? "success"
                  : "error"
              }`}
            >
              {message}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AffiliateCommissionRequest;