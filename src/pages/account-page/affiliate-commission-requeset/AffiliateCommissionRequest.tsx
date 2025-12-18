// src/components/AffiliateCommissionRequest.tsx
import React, { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import {
  RiMailSendFill,
  RiUserStarLine,
  RiRefreshLine,
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
        setMessage("Error al cargar la información. Intenta recargar la página.");
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
      const newRequest = await createCommissionRequestApi(form);
      setRequest(newRequest);
      setMessage(
        request?.status === "PENDING"
          ? "¡Datos actualizados correctamente!"
          : "¡Solicitud enviada con éxito!"
      );
    } catch (err: any) {
      setMessage(err.message || "Error al procesar la solicitud.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleCancel = async () => {
    if (!request?.id) return;
    setLoading(true);
    try {
      await cancelCommissionRequestApi(request.id);
      setRequest(null);
      setForm({ hotmartUsername: "", hotmartEmail: "" });
      setMessage("Solicitud cancelada correctamente.");
    } catch (err: any) {
      setMessage(err.message || "Error al cancelar la solicitud.");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(null), 4000);
    }
  };

  const handleRequestNewIncrease = () => {
    setRequest(null);
    setForm({ hotmartUsername: "", hotmartEmail: "" });
    setMessage("Puedes solicitar un nuevo incremento cuando cumplas los requisitos.");
    setTimeout(() => setMessage(null), 4000);
  };

  // Lógica de permisos
  const canEditOrCreate = !request || ["REJECTED", "CANCELLED"].includes(request.status);
  const canUpdatePending = request?.status === "PENDING";
  const canRequestNewAfterApproval = request?.status === "APPROVED";
  const isPending = request?.status === "PENDING";

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
        <h3>
          Comisión actual: <strong>{currentCommission}%</strong>
        </h3>
        <p>Solicita un incremento enviando tus credenciales de Hotmart.</p>
      </header>

      <form onSubmit={handleSubmit} className="affiliate-commission-request__form">
        <div className="affiliate-commission-request__fields">
          <div className="affiliate-commission-request__field">
            <label>Usuario en Hotmart</label>
            <div className="affiliate-commission-request__input-wrapper">
              <RiUserStarLine />
              <input
                type="text"
                name="hotmartUsername"
                value={form.hotmartUsername}
                onChange={handleChange}
                placeholder="tu_usuario_hotmart"
                required
                disabled={!canEditOrCreate && !canUpdatePending || loading}
              />
            </div>
          </div>

          <div className="affiliate-commission-request__field">
            <label>Email registrado en Hotmart</label>
            <div className="affiliate-commission-request__input-wrapper">
              <RiUserStarLine />
              <input
                type="email"
                name="hotmartEmail"
                value={form.hotmartEmail}
                onChange={handleChange}
                placeholder="tuemail@hotmart.com"
                required
                disabled={!canEditOrCreate && !canUpdatePending || loading}
              />
            </div>
          </div>
        </div>

        {/* Estado de la solicitud - Tarjetas visuales mejoradas */}
        {request && (
          <div className={`status-card status-card--${request.status.toLowerCase()}`}>
            <div className="status-card__icon">
              {request.status === "PENDING" && <RiTimeLine />}
              {request.status === "APPROVED" && <RiCheckLine />}
              {request.status === "REJECTED" && <RiCloseLine />}
              {request.status === "CANCELLED" && <RiInformationLine />}
            </div>
            <div className="status-card__content">
              {request.status === "PENDING" && (
                <>
                  <strong>Tu solicitud está en revisión</strong>
                  <p>Gracias por tu interés. Te avisaremos pronto el resultado.</p>
                </>
              )}

              {request.status === "APPROVED" && (
                <>
                  <strong>¡Felicidades! Comisión aumentada</strong>
                  <p>
                    Ahora ganas <strong>{request.approvedCommission}%</strong> por cada venta.
                  </p>
                </>
              )}

              {request.status === "REJECTED" && (
                <>
                  <strong>Solicitud rechazada</strong>
                  <p className="status-card__reason">
                    {request.denyReason ||
                      "Aún no cumples los requisitos mínimos. Mejora tus ventas y vuelve a intentarlo."}
                  </p>
                  <p className="status-card__note">Puedes enviar una nueva solicitud cuando estés listo.</p>
                </>
              )}

              {request.status === "CANCELLED" && (
                <>
                  <strong>Solicitud cancelada</strong>
                  <p>Puedes enviar una nueva solicitud cuando desees.</p>
                </>
              )}
            </div>
          </div>
        )}

        {/* Acciones */}
        <div className="affiliate-commission-request__actions">
          {(canEditOrCreate || canUpdatePending) && (
            <button
              type="submit"
              disabled={
                loading ||
                !form.hotmartUsername.trim() ||
                !form.hotmartEmail.trim()
              }
              className="btn btn--primary"
            >
              <RiMailSendFill />
              {canUpdatePending ? "Actualizar solicitud" : "Enviar solicitud"}
            </button>
          )}

          {canRequestNewAfterApproval && (
            <button
              type="button"
              onClick={handleRequestNewIncrease}
              className="btn btn--secondary"
            >
              <RiRefreshLine />
              Solicitar nuevo incremento
            </button>
          )}

          {isPending && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="btn btn--danger"
            >
              Cancelar solicitud
            </button>
          )}

          {message && (
            <div className={`toast ${message.includes("éxito") || message.includes("correctamente") ? "toast--success" : "toast--error"}`}>
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default AffiliateCommissionRequest;