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
}

function AdminCommissionRequest() {
  const [requests, setRequests] = useState<CommissionRequest[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RequestStatus>("PENDING");
  const [loading, setLoading] = useState(true);

  const [selectedRequest, setSelectedRequest] = useState<CommissionRequest | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  const [decision, setDecision] = useState<"approve" | "deny" | null>(null);
  const [newCommission, setNewCommission] = useState(50);
  const [denyReason, setDenyReason] = useState("");

  // Cargar todas las solicitudes
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getAllCommissionRequestsApi();
        setRequests(data);
      } catch (err) {
        console.error("Error cargando solicitudes:", err);
        alert("No se pudieron cargar las solicitudes. Intenta recargar la página.");
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

        return req.status === statusFilter;
      })
      .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
  }, [requests, search, statusFilter]);

  const openPopup = (request: CommissionRequest) => {
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
      const updated = await reviewCommissionRequestApi(
        selectedRequest.id,
        decision === "approve" ? "APPROVED" : "REJECTED",
        decision === "approve" ? newCommission : undefined,
        decision === "deny" ? denyReason : undefined
      );

      // Actualizar la lista localmente
      setRequests((prev) =>
        prev.map((r) =>
          r.id === selectedRequest.id
            ? { ...r, ...updated.updated, user: r.user }
            : r
        )
      );

      setShowPopup(false);
      setDecision(null);
      setDenyReason("");
      alert(
        decision === "approve"
          ? "¡Solicitud aprobada exitosamente!"
          : "Solicitud rechazada correctamente."
      );
    } catch (err: any) {
      alert(err.message || "Error al procesar la solicitud. Inténtalo de nuevo.");
    }
  };

  if (loading) {
    return (
      <section className="admin-commission-request">
        <p style={{ textAlign: "center", padding: "3rem", fontSize: "1.1rem", color: "#6b7280" }}>
          Cargando solicitudes de incremento de comisión...
        </p>
      </section>
    );
  }

  return (
    <section className="admin-commission-request">
      <header className="admin-commission-request__header">
        <div>
          <h2 className="admin-commission-request__title">
            Gestión de Incremento de Comisiones
          </h2>
          <span className="admin-commission-request__total">
            Total: {filteredRequests.length} solicitud{filteredRequests.length !== 1 ? "es" : ""}
          </span>
        </div>

        <div className="admin-commission-request__controls">
          <SearchBar
            textHolder="Buscar por nombre, email o datos de Hotmart"
            value={search}
            onChange={setSearch}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as RequestStatus)}
            className="admin-commission-request__select"
          >
            <option value="PENDING">Pendientes</option>
            <option value="APPROVED">Aprobadas</option>
            <option value="REJECTED">Rechazadas</option>
            <option value="CANCELLED">Canceladas</option>
          </select>
        </div>
      </header>

      {filteredRequests.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#6b7280" }}>
          <p>No hay solicitudes {statusFilter === "PENDING" ? "pendientes" : "con este estado"} en este momento.</p>
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
                    {request.user?.email || "sin email registrado"}
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
                  <p>{new Date(request.requestedAt).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}</p>
                  <span>Solicita hasta {request.approvedCommission || 50}%</span>
                </div>
              </div>

              {request.status === "REJECTED" && request.denyReason && (
                <div className="admin-commission-request__deny-reason">
                  <span className="admin-commission-request__deny-title">Motivo del rechazo</span>
                  <p className="admin-commission-request__deny-text">{request.denyReason}</p>
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

      {/* Popup de revisión */}
      {showPopup && selectedRequest && (
        <div className="admin-commission-request__overlay">
          <div className="admin-commission-request__popup">
            <header className="admin-commission-request__popup-header">
              <div>
                <h3>Revisión de solicitud de incremento</h3>
                <span>
                  Usuario: {selectedRequest.user?.userName || "Desconocido"} ({selectedRequest.user?.email || "sin email"})
                </span>
              </div>
              <button onClick={() => setShowPopup(false)}>✕</button>
            </header>

            <section className="admin-commission-request__popup-user-box">
              <div>
                <strong>{selectedRequest.user?.userName || "Usuario desconocido"}</strong>
                <span>{selectedRequest.user?.email || "sin email registrado"}</span>
              </div>
              <div>
                <strong>Datos Hotmart:</strong>
                <span>{selectedRequest.hotmartUsername} / {selectedRequest.hotmartEmail}</span>
              </div>
            </section>

            <section className="admin-commission-request__popup-decision">
              <label className={`decision-card ${decision === "approve" ? "decision-card--active decision-card--approve" : ""}`}>
                <input
                  type="radio"
                  checked={decision === "approve"}
                  onChange={() => setDecision("approve")}
                />
                <span>Aprobar solicitud</span>
              </label>

              <label className={`decision-card ${decision === "deny" ? "decision-card--active decision-card--deny" : ""}`}>
                <input
                  type="radio"
                  checked={decision === "deny"}
                  onChange={() => setDecision("deny")}
                />
                <span>Rechazar solicitud</span>
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
                  placeholder="Ej: 50"
                />
                <small>Comisión actual del usuario: información no disponible en esta vista</small>
              </div>
            )}

            {decision === "deny" && (
              <div className="admin-commission-request__field">
                <label>Motivo del rechazo (obligatorio)</label>
                <textarea
                  rows={5}
                  placeholder="Explica claramente el motivo para que el afiliado pueda mejorar y volver a solicitar..."
                  value={denyReason}
                  onChange={(e) => setDenyReason(e.target.value)}
                />
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