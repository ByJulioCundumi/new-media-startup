import "./jobpage.scss";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Sparkle,
  Award,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";

function JobPage() {
  const [page, setPage] = useState<"info" | "affiliates" | "request">("info");
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSidebar("affiliate"))
  },[])

  const floatingUsers = [
    { id: 1, name: "María G.", earnings: "+70% de comisión" },
    { id: 2, name: "Carlos L.", earnings: "+70% de comisión" },
    { id: 3, name: "Ana P.", earnings: "+70% de comisión" },
  ];
  

  return (
    <section className="job-page">
<div className="hero-page">

      {/* ---------- TARJETAS FLOTANTES ---------- */}
      <div className="floating-users">
        {floatingUsers.map((u, index) => (
          <div
            key={u.id}
            className={`floating-card card-${index + 1}`}
          >
            <div className="avatar">{u.name.charAt(0)}</div>
            <div>
              <p className="user-name">{u.name}</p>
              <span className="user-earn">{u.earnings}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- HERO SECTION ---------- */}
      <section className="hero">

        <h1 className="hero-title">
          Trabaja En Remoto, Sin Experiencia
          <span>Gana Dinero Promocionando Nuestra Plataforma</span>
        </h1>

        <p className="hero-subtitle">
          Monetiza tu tiempo libre y Tabaja desde cualquier lugar sin horarios.  
          Gana un <strong>20% de comisiones recurrentes desde el primer día</strong> y solicita
          un aumento al <strong>70%</strong> si tienes una suscripción activa.
        </p>

        <div className="cta-container">
          <button className="cta-button">
            Afiliarme Gratis <ArrowRight size={18} />
          </button>

          <button className="cta-button outline">
            Solicitar 70%
          </button>
        </div>
      </section>

      {/* ---------- BENEFICIOS ---------- */}
      <section className="benefits">
        <h2 className="benefits-title">¿Por qué convertirte en afiliado?</h2>

        <div className="benefit-grid">

          <div className="benefit-card">
            <TrendingUp className="icon" />
            <h3>Comienza sin invertir</h3>
            <p>Únete al programa sin pagar nada. Empieza hoy mismo.</p>
          </div>

          <div className="benefit-card">
            <Users className="icon" />
            <h3>Ideal para principiantes</h3>
            <p>No necesitas experiencia. Trabaja 100% en remoto.</p>
          </div>

          <div className="benefit-card">
            <DollarSign className="icon" />
            <h3>Comisiones recurrentes</h3>
            <p>Gana un 20% base y sube al 70% si eres usuario suscrito.</p>
          </div>

          <div className="benefit-card">
            <TrendingUp className="icon" />
            <h3>Demanda constante</h3>
            <p>Miles de personas requieren CVs cada día. Tú solo recomiendas.</p>
          </div>

        </div>
      </section>
    </div>
    </section>
  );
}

export default JobPage;
