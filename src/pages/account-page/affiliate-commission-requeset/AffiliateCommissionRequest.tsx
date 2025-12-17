import React, { useState, type ChangeEvent, type FormEvent } from "react";
import { FaSave, FaPercentage } from "react-icons/fa";
import { RiMailSendFill, RiMailSendLine, RiUserStarLine } from "react-icons/ri";
import "./affiliatecommissisonrequest.scss";

type RequestStatus = "pending" | "approved" | null;

const AffiliateCommissionRequest: React.FC = () => {
  const [form, setForm] = useState({
    hotmartUsername: "",
    hotmartEmail: "",
  });

  const [status, setStatus] = useState<RequestStatus>(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // 👉 aquí iría la llamada real al backend
    console.log("Solicitud incremento comisión:", form);

    setStatus("pending");
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form
      className="affiliate-commission-request"
      onSubmit={handleSubmit}
    >
      <header className="affiliate-commission-request__header">
        <h3>Incremento de Comisión al 50%</h3>
        <p>
          Solicita el aumento de tu comisión hasta el{" "}
          <strong>50%</strong> enviando tus datos de afiliado de{" "}
          <strong>Hotmart</strong>.
        </p>
      </header>

      <div className="affiliate-commission-request__content">
        <div className="affiliate-commission-request__field">
          <label>Nombre de Usuario Afiliado (En Hotmart)</label>
          <div className="affiliate-commission-request__input-icon">
            <RiUserStarLine />
            <input
              type="text"
              name="hotmartUsername"
              value={form.hotmartUsername}
              onChange={handleChange}
              placeholder="usuario_hotmart"
              required
              disabled={status === "approved"}
            />
          </div>
        </div>

        <div className="affiliate-commission-request__field">
          <label>Tu Email de Afiliado (En Hotmart)</label>
          <div className="affiliate-commission-request__input-icon">
            <RiUserStarLine />
            <input
              type="email"
              name="hotmartEmail"
              value={form.hotmartEmail}
              onChange={handleChange}
              placeholder="email@hotmart.com"
              required
              disabled={status === "approved"}
            />
          </div>
        </div>

        {/* ===== Estado de la solicitud ===== */}
        {status && (
          <div
            className={`affiliate-commission-request__status affiliate-commission-request__status--${status}`}
          >
            {status === "pending" && "⏳ Solicitud pendiente de revisión"}
            {status === "approved" &&
              "✅ Solicitud aprobada — Comisión activa al 50%"}
          </div>
        )}
      </div>

      <div className="affiliate-commission-request__actions">
        {status !== "approved" && (
          <button
            type="submit"
            className="affiliate-commission-request__save-btn"
          >
            <RiMailSendFill /> Enviar Solicitud
          </button>
        )}

        {saved && (
          <span className="affiliate-commission-request__success">
            ✓ Solicitud enviada
          </span>
        )}
      </div>
    </form>
  );
};

export default AffiliateCommissionRequest;
