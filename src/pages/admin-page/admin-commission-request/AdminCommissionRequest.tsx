// src/components/AdminCommissionRequest.tsx
import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../../../components/search-bar/SearchBar";
import {
  getAllCommissionRequestsApi,
  reviewCommissionRequestApi,
} from "../../../api/commission";
import "./admincommissionrequest.scss";
import AdminSetUserCommissionButton from "./set-user-commission/AdminSetUserCommissionButton";

type RequestStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

interface CommissionRequest {
  id: string;
  user: { userName: string; email: string } | null;
  hotmartUsername: string;
  hotmartEmail: string;
  status: RequestStatus;
  requestedAt: string;
  denyReason?: string;
  approvedCommission?: number;
  previousHotmartUsername?: string | null;
  previousHotmartEmail?: string | null;
  previousApprovedCommission?: number | null;
}

function AdminCommissionRequest() {
  const [requests, setRequests] = useState<CommissionRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | RequestStatus>("ALL");
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState<CommissionRequest | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [decision, setDecision] = useState<"approve" | "deny" | null>(null);
  const [newCommission, setNewCommission] = useState(50);
  const [denyReason, setDenyReason] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const data = await getAllCommissionRequestsApi();
        setRequests(data);
      } catch (err) {
        console.error("Error cargando solicitudes:", err);
        alert("No se pudieron cargar las solicitudes.");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredRequests = useMemo(() => {
    return requests
      .filter((req) => {
        const lowerSearch = search.toLowerCase();
        const userName = req.user?.userName || "";
        const userEmail = req.user?.email || "";
        const matchesSearch =
          userName.toLowerCase().includes(lowerSearch) ||
          userEmail.toLowerCase().includes(lowerSearch) ||
          req.hotmartUsername.toLowerCase().includes(lowerSearch) ||
          req.hotmartEmail.toLowerCase().includes(lowerSearch);

        const matchesStatus = statusFilter === "ALL" || req.status === statusFilter;

        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }, [requests, search, statusFilter]);

  const openPopup = (request: CommissionRequest) => {
    if (request.status !== "PENDING") return;

    setSelectedRequest(request);
    setDecision(null);
    setDenyReason("");
    setNewCommission(request.approvedCommission || 50);
    setShowPopup(true);
  };

  // Función auxiliar para obtener solicitud fresca por ID
  const fetchRequestById = async (id: string): Promise<CommissionRequest> => {
    const res = await fetch(`http://localhost:4000/api/commission/request/${id}`, {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.message || "Error al verificar la solicitud");
    }

    return await res.json();
  };

  const handleReview = async () => {
    if (!selectedRequest || !decision || processing) return;

    if (decision === "deny" && !denyReason.trim()) {
      alert("Por favor, ingresa un motivo para rechazar la solicitud.");
      return;
    }

    setProcessing(true);

    try {
      // 1. Verificar estado actual de la solicitud
      const currentRequest = await fetchRequestById(selectedRequest.id);

      if (currentRequest.status !== "PENDING") {
        alert("La solicitud ya no está pendiente. La página se actualizará para reflejar el estado actual.");
        window.location.reload();
        return;
      }

      // 2. Si sigue pendiente → proceder con la revisión
      const response = await reviewCommissionRequestApi(
        selectedRequest.id,
        decision === "approve" ? "APPROVED" : "REJECTED",
        decision === "approve" ? newCommission : undefined,
        decision === "deny" ? denyReason : undefined
      );

      const updatedRequest = response.request;

      // Actualizar lista local
      setRequests((prev) =>
        prev.map((r) => (r.id === selectedRequest.id ? updatedRequest : r))
      );

      setShowPopup(false);
      alert(
        decision === "approve"
          ? "¡Solicitud aprobada exitosamente!"
          : "Solicitud rechazada correctamente."
      );
    } catch (err: any) {
      alert(err.message || "No se pudo procesar la decisión. Es posible que la solicitud ya haya cambiado de estado.");
      window.location.reload();
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <section className="admin-commission-request">
        <p className="loading-message">Cargando solicitudes...</p>
      </section>
    );
  }

  return (
    <section className="admin-commission-request">
      <header className="admin-commission-request__header">
        <div>
          <h2 className="admin-commission-request__title">Gestión de Incremento de Comisiones</h2>
        </div>

        <div className="admin-commission-request__controls">
          <SearchBar
            textHolder="Buscar por nombre, email o datos de Hotmart..."
            value={search}
            onChange={setSearch}
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "ALL" | RequestStatus)}
            className="admin-commission-request__select"
          >
            <option value="ALL">Todas</option>
            <option value="PENDING">Pendientes</option>
            <option value="APPROVED">Aprobadas</option>
            <option value="REJECTED">Rechazadas</option>
            <option value="CANCELLED">Canceladas</option>
          </select>
        </div>
      </header>

      {filteredRequests.length === 0 ? (
        <div className="empty-state">
          <p>No hay solicitudes que coincidan con el filtro actual.</p>
        </div>
      ) : (
        <div className="admin-commission-request__grid">
          {filteredRequests.map((request) => (
            <div key={request.id} className="admin-commission-request__card">
              <div className="admin-commission-request__identity">
                <div>
                  <span className="admin-commission-request__name">
                    {request.user?.userName || "Usuario desconocido"}
                  </span>
                  <span className="admin-commission-request__email">
                    {request.user?.email || "sin email"}
                  </span>
                </div>
                <span
                  className={`admin-commission-request__status admin-commission-request__status--${request.status.toLowerCase()}`}
                >
                  {request.status === "PENDING" && "Pendiente"}
                  {request.status === "APPROVED" && "Aprobada"}
                  {request.status === "REJECTED" && "Rechazada"}
                  {request.status === "CANCELLED" && "Cancelada"}
                </span>
              </div>

              <div className="admin-commission-request__details">
                <Detail label="Usuario Hotmart" value={request.hotmartUsername} />
                <Detail label="Email Hotmart" value={request.hotmartEmail} />
                <div className="admin-commission-request__details--box">
                  <p>{new Date(request.requestedAt).toLocaleString("es-ES")}</p>
                  {request.status === "APPROVED" && request.approvedCommission && (
                    <span>Comisión: {request.approvedCommission}%</span>
                  )}
                </div>
              </div>

              {request.status === "PENDING" && request.previousHotmartUsername && (
                <div className="admin-commission-request__reassign-info">
                  <h3>Reasignación solicitada: {request.previousApprovedCommission}% (Usuario Anterior)</h3>
                  <p>
                    <strong>{request.previousHotmartUsername}</strong>
                    <br />
                    <strong>{request.previousHotmartEmail}</strong>
                  </p>
                </div>
              )}

              {request.status === "REJECTED" && request.denyReason && (
                <div className="admin-commission-request__deny-reason">
                  <span className="admin-commission-request__deny-title">Motivo del rechazo:</span>
                  <p>{request.denyReason}</p>
                </div>
              )}

              {request.status === "PENDING" && (
                <div className="admin-commission-request__footer">
                  <button
                    className="admin-commission-request__btn admin-commission-request__btn--primary"
                    onClick={() => openPopup(request)}
                  >
                    Revisar solicitud
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Popup */}
      {showPopup && selectedRequest && (
        <div className="admin-commission-request__overlay" onClick={() => !processing && setShowPopup(false)}>
          <div className="admin-commission-request__popup" onClick={(e) => e.stopPropagation()}>
            <header className="admin-commission-request__popup-header">
              <div>
                <h3 className="admin-commission-request__popup-title">Revisar solicitud</h3>
                <p className="admin-commission-request__popup-subtitle">
                  {selectedRequest.user?.userName} ({selectedRequest.user?.email})
                </p>
              </div>
              <button
                className="admin-commission-request__popup-close"
                onClick={() => setShowPopup(false)}
                disabled={processing}
              >
                ✕
              </button>
            </header>

            <section className="admin-commission-request__popup-decision">
              <label className={`decision-card ${decision === "approve" ? "decision-card--active decision-card--approve" : ""}`}>
                <input
                  type="radio"
                  name="decision"
                  checked={decision === "approve"}
                  onChange={() => setDecision("approve")}
                  disabled={processing}
                />
                <span>Aprobar</span>
              </label>

              <label className={`decision-card ${decision === "deny" ? "decision-card--active decision-card--deny" : ""}`}>
                <input
                  type="radio"
                  name="decision"
                  checked={decision === "deny"}
                  onChange={() => setDecision("deny")}
                  disabled={processing}
                />
                <span>Rechazar</span>
              </label>
            </section>

            {decision === "approve" && (
              <div className="admin-commission-request__field">
                <label htmlFor="commission">Nueva comisión (%)</label>
                <input
                  id="commission"
                  type="number"
                  min="20"
                  max="100"
                  step="5"
                  value={newCommission}
                  onChange={(e) => setNewCommission(Number(e.target.value))}
                  disabled={processing}
                />
              </div>
            )}

            {decision === "deny" && (
              <div className="admin-commission-request__field">
                <label htmlFor="deny-reason">Motivo del rechazo</label>
                <textarea
                  id="deny-reason"
                  rows={5}
                  placeholder="Explica el motivo del rechazo..."
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                  disabled={processing}
                />
                <small className="admin-commission-request__hint">
                  Los datos y comisión anteriores se restaurarán automáticamente.
                </small>
              </div>
            )}

            <footer className="admin-commission-request__popup-actions">
              <button
                className="admin-commission-request__btn admin-commission-request__btn--secondary"
                onClick={() => setShowPopup(false)}
                disabled={processing}
              >
                Cancelar
              </button>
              <button
                className="admin-commission-request__btn admin-commission-request__btn--primary"
                disabled={processing || !decision || (decision === "deny" && !denyReason.trim())}
                onClick={handleReview}
              >
                {processing ? "Procesando..." : "Confirmar decisión"}
              </button>
            </footer>
          </div>
        </div>
      )}
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div className="admin-commission-request__detail">
      <span className="admin-commission-request__detail-label">{label}</span>
      <span className="admin-commission-request__detail-value">{value || "—"}</span>
    </div>
  );
}

export default AdminCommissionRequest;