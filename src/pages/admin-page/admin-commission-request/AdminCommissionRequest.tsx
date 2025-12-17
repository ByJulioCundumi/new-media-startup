import { useMemo, useState } from "react";
import SearchBar from "../../../components/search-bar/SearchBar";
import "./admincommissionrequest.scss";

type RequestStatus = "Pendiente" | "Aprobada" | "Rechazada";

interface CommissionRequest {
  id: string;
  name: string;
  email: string;
  hotmartEmail: string;
  hotmartUser: string;
  currentCommission: number;
  requestedAt: string;
  status: RequestStatus;
  denyReason?: string; // 👈 NUEVO
}

const mockRequests: CommissionRequest[] = [
  {
    id: "1",
    name: "Carlos Gómez",
    email: "carlos@email.com",
    hotmartEmail: "carlos@hotmart.com",
    hotmartUser: "carlosg",
    currentCommission: 20,
    requestedAt: "2024-10-10T10:30:00Z",
    status: "Pendiente",
  },
  {
    id: "2",
    name: "Laura Martínez",
    email: "laura@email.com",
    hotmartEmail: "laura@hotmart.com",
    hotmartUser: "lauram",
    currentCommission: 10,
    requestedAt: "2024-11-02T14:15:00Z",
    status: "Aprobada",
  },
  {
    id: "3",
    name: "Juan Pérez",
    email: "juan@email.com",
    hotmartEmail: "juan@hotmart.com",
    hotmartUser: "juanp",
    currentCommission: 15,
    requestedAt: "2024-11-05T09:10:00Z",
    status: "Rechazada",
    denyReason:
      "El volumen de ventas actual no cumple con el mínimo requerido para el incremento.",
  },
];

function AdminCommissionRequest() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<RequestStatus | "Todas">("Todas");

  const [selectedRequest, setSelectedRequest] =
    useState<CommissionRequest | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const [decision, setDecision] = useState<"approve" | "deny" | null>(null);
  const [newCommission, setNewCommission] = useState(0);
  const [denyReason, setDenyReason] = useState("");

  const filteredRequests = useMemo(() => {
    return [...mockRequests]
      .sort(
        (a, b) =>
          new Date(a.requestedAt).getTime() -
          new Date(b.requestedAt).getTime()
      )
      .filter((req) => {
        const searchLower = search.toLowerCase();

        const matchesSearch =
          req.name.toLowerCase().includes(searchLower) ||
          req.email.toLowerCase().includes(searchLower) ||
          req.hotmartEmail.toLowerCase().includes(searchLower) ||
          req.hotmartUser.toLowerCase().includes(searchLower) 

        const matchesStatus =
          statusFilter === "Todas" ? true : req.status === statusFilter;

        return matchesSearch && matchesStatus;
      });
  }, [search, statusFilter]);

  const openPopup = (request: CommissionRequest) => {
    setSelectedRequest(request);
    setNewCommission(request.currentCommission);
    setDecision(null);
    setDenyReason("");
    setShowPopup(true);
  };

  const handleSubmit = () => {
    if (decision === "deny" && !denyReason.trim()) return;

    // 🔗 Backend:
    // approve -> enviar nueva comisión
    // deny -> enviar motivo

    setShowPopup(false);
    setSelectedRequest(null);
  };

  return (
    <section className="admin-commission-request">
      {/* HEADER */}
      <header className="admin-commission-request__header">
        <div>
          <h2 className="admin-commission-request__title">
            Incremento de comisiónes
          </h2>
          <span className="admin-commission-request__total">
            Total: {filteredRequests.length}
          </span>
        </div>

        <div className="admin-commission-request__controls">
          <SearchBar
            textHolder="Buscar por usuario, email o Hotmart"
            value={search}
            onChange={setSearch}
          />

          <select
            className="admin-commission-request__select"
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value as typeof statusFilter)
            }
          >
            <option value="Todas">Todas</option>
            <option value="Pendiente">Pendientes</option>
            <option value="Aprobada">Aprobadas</option>
            <option value="Rechazada">Rechazadas</option>
          </select>
        </div>
      </header>

      {/* GRID */}
      <div className="admin-commission-request__grid">
        {filteredRequests.map((request) => (
          <div key={request.id} className="admin-commission-request__card">
            <div className="admin-commission-request__identity">
              <div>
                <span className="admin-commission-request__name">
                  {request.name}
                </span>
                <span className="admin-commission-request__email">
                  {request.email}
                </span>
              </div>

              <span
                className={`admin-commission-request__status admin-commission-request__status--${request.status.toLowerCase()}`}
              >
                {request.status}
              </span>
            </div>

            <div className="admin-commission-request__details">
              <Detail label="Usuario en Hotmart" value={request.hotmartUser} />
              <Detail label="Email de Hotmart" value={request.hotmartEmail} />
              <div className="admin-commission-request__details--box">
                <p>03/08/2026</p>
                <span>Comision {"20%"}</span>
              </div>
            </div>

            {request.status === "Rechazada" && request.denyReason && (
            <div className="admin-commission-request__deny-reason">
                <span className="admin-commission-request__deny-title">
                Motivo del rechazo
                </span>
                <p className="admin-commission-request__deny-text">
                {request.denyReason}
                </p>
            </div>
            )}


            {request.status === "Pendiente" && (
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

      {/* POPUP */}
      {showPopup && selectedRequest && (
  <div className="admin-commission-request__overlay">
    <div className="admin-commission-request__popup">
      
      {/* HEADER */}
      <header className="admin-commission-request__popup-header">
        <div>
          <h3 className="admin-commission-request__popup-title">
            Revisión de solicitud
          </h3>
          <span className="admin-commission-request__popup-subtitle">
            Incremento de comisión
          </span>
        </div>

        <button
          className="admin-commission-request__popup-close"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>
      </header>

      {/* USER INFO */}
      <section className="admin-commission-request__popup-user-box">
        <div className="admin-commission-request__user">
          <strong>{selectedRequest.name}</strong>
          <span>{selectedRequest.email}</span>
        </div>

        <div className="admin-commission-request__popup-commission">
          Comisión actual
          <strong>{selectedRequest.currentCommission}%</strong>
        </div>
      </section>

      {/* DECISION */}
      <section className="admin-commission-request__popup-decision">
        <label
          className={`decision-card ${
            decision === "approve" ? "decision-card--active decision-card--approve" : ""
          }`}
        >
          <input
            type="radio"
            checked={decision === "approve"}
            onChange={() => setDecision("approve")}
          />
          <span>Aprobar</span>
        </label>

        <label
          className={`decision-card ${
            decision === "deny" ? "decision-card--active decision-card--deny" : ""
          }`}
        >
          <input
            type="radio"
            checked={decision === "deny"}
            onChange={() => setDecision("deny")}
          />
          <span>Rechazar</span>
        </label>
      </section>

      {/* FORM */}
      {decision === "approve" && (
        <div className="admin-commission-request__field">
          <label>Nueva comisión (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            value={newCommission}
            onChange={(e) => setNewCommission(+e.target.value)}
          />
        </div>
      )}

      {decision === "deny" && (
        <div className="admin-commission-request__field">
          <label>Motivo del rechazo</label>
          <textarea
            rows={4}
            placeholder="Explica brevemente el motivo..."
            value={denyReason}
            onChange={(e) => setDenyReason(e.target.value)}
          />
        </div>
      )}

      {/* ACTIONS */}
      <footer className="admin-commission-request__popup-actions">
        <button
          className="admin-commission-request__btn admin-commission-request__btn--secondary"
          onClick={() => setShowPopup(false)}
        >
          Cancelar
        </button>

        <button
          className="admin-commission-request__btn admin-commission-request__btn--primary"
          disabled={!decision || (decision === "deny" && !denyReason)}
          onClick={handleSubmit}
        >
          Confirmar Accion
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
      <span className="admin-commission-request__detail-value">{value}</span>
    </div>
  );
}

export default AdminCommissionRequest;
