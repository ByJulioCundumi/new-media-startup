// src/components/AdminCommissionRequest.tsx
import React, { useState, useEffect, useMemo } from "react";
import SearchBar from "../../../components/search-bar/SearchBar";
import {
  getAllCommissionRequestsApi,
  reviewCommissionRequestApi,
} from "../../../api/commission";
import "./admincommissionrequest.scss";

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

  useEffect(() => {
    const fetchRequests = async () => {
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
    setNewCommission(request.approvedCommission || 50);
    setDecision(null);
    setDenyReason("");
    setShowPopup(true);
  };

  const handleReview = async () => {
    if (!selectedRequest || !decision) return;

    if (decision === "deny" && !denyReason.trim()) {
      alert("Por favor, ingresa un motivo para rechazar la solicitud.");
      return;
    }

    try {
      const response = await reviewCommissionRequestApi(
        selectedRequest.id,
        decision === "approve" ? "APPROVED" : "REJECTED",
        decision === "approve" ? newCommission : undefined,
        decision === "deny" ? denyReason : undefined
      );

      // CORREGIDO: el backend devuelve { message: "...", request: updatedRequest }
      const updatedRequest = response.request;

      setRequests((prev) =>
        prev.map((r) => (r.id === selectedRequest.id ? updatedRequest : r))
      );

      setShowPopup(false);
      alert(
        decision === "approve"
          ? "¡Solicitud aprobada!"
          : "Solicitud rechazada. Se restauraron los datos anteriores si era una reasignación."
      );
    } catch (err: any) {
      alert(err.message || "Error al procesar la decisión.");
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
                  <strong>→ Reasignación solicitada</strong>
                  <p>
                    Beneficiario anterior: <strong>{request.previousHotmartUsername}</strong> (
                    {request.previousHotmartEmail})
                  </p>
                  <p>Comisión anterior: <strong>{request.previousApprovedCommission}%</strong></p>
                  <p className="admin-commission-request__reassign-warning">
                    Si rechazas, se restaurarán los datos y comisión anteriores.
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

      {showPopup && selectedRequest && (
        <div className="admin-commission-request__overlay">
          <div className="admin-commission-request__popup">
            <header className="admin-commission-request__popup-header">
              <div>
                <h3>Revisar solicitud</h3>
                <span>{selectedRequest.user?.userName} ({selectedRequest.user?.email})</span>
              </div>
              <button onClick={() => setShowPopup(false)}>✕</button>
            </header>

            <section className="admin-commission-request__popup-user-box">
              <div>
                <strong>Datos solicitados (nuevos)</strong>
                <span>{selectedRequest.hotmartUsername}</span>
                <span>{selectedRequest.hotmartEmail}</span>
              </div>
            </section>

            {selectedRequest.previousHotmartUsername && (
              <section className="admin-commission-request__popup-user-box admin-commission-request__popup-previous">
                <div>
                  <strong>Datos anteriores (actuales aprobados)</strong>
                  <span>{selectedRequest.previousHotmartUsername}</span>
                  <span>{selectedRequest.previousHotmartEmail}</span>
                  <small>Comisión actual: {selectedRequest.previousApprovedCommission}%</small>
                </div>
              </section>
            )}

            <section className="admin-commission-request__popup-decision">
              <label
                className={`decision-card ${decision === "approve" ? "decision-card--active decision-card--approve" : ""}`}
              >
                <input type="radio" checked={decision === "approve"} onChange={() => setDecision("approve")} />
                <span>Aprobar nueva cuenta</span>
              </label>
              <label
                className={`decision-card ${decision === "deny" ? "decision-card--active decision-card--deny" : ""}`}
              >
                <input type="radio" checked={decision === "deny"} onChange={() => setDecision("deny")} />
                <span>Rechazar (mantener anterior)</span>
              </label>
            </section>

            {decision === "approve" && (
              <div className="admin-commission-request__field">
                <label>Nueva comisión (%)</label>
                <input
                  type="number"
                  min="20"
                  max="100"
                  step="5"
                  value={newCommission}
                  onChange={(e) => setNewCommission(Number(e.target.value))}
                />
              </div>
            )}

            {decision === "deny" && (
              <div className="admin-commission-request__field">
                <label>Motivo del rechazo</label>
                <textarea
                  rows={5}
                  placeholder="Explica el motivo del rechazo..."
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                />
                <small className="admin-commission-request__hint">
                  Los datos y comisión anteriores se restaurarán automáticamente.
                </small>
              </div>
            )}

            <footer className="admin-commission-request__popup-actions">
              <button onClick={() => setShowPopup(false)}>Cancelar</button>
              <button
                className="admin-commission-request__btn--primary"
                disabled={!decision || (decision === "deny" && !denyReason.trim())}
                onClick={handleReview}
              >
                Confirmar decisión
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