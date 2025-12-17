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
import Footer from "../../components/footer/Footer";

function JobPage() {
  const [page, setPage] = useState<"info" | "affiliates" | "request">("info");
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSidebar("affiliate"))
  },[])

  const floatingUsers = [
    { id: 1, name: "María G.", earnings: "+50% de comisión" },
    { id: 2, name: "Carlos L.", earnings: "+50% de comisión" },
    { id: 3, name: "Ana P.", earnings: "+50% de comisión" },
  ];
  

  return (
    <>
      <section className="job-page">
<div className="job-page__hero-page">

      {/* ---------- TARJETAS FLOTANTES ---------- */}
      <div className="job-page__floating-users">
        {floatingUsers.map((u, index) => (
          <div
            key={u.id}
            className={`job-page__floating-card job-page__card-${index + 1}`}
          >
            <div className="job-page__avatar">{u.name.charAt(0)}</div>
            <div>
              <p className="job-page__user-name">{u.name}</p>
              <span className="job-page__user-earn">{u.earnings}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- HERO SECTION ---------- */}
      <section className="job-page__hero">

        <h1 className="job-page__hero-title">
          Trabaja En Remoto, Sin Experiencia
          <span>Gana Dinero Promocionando Nuestras Herramientas</span>
        </h1>

        <p className="job-page__hero-subtitle">
          Monetiza tu tiempo libre y Tabaja desde cualquier lugar sin horarios.  
          Gana un <strong>20% de comisiones recurrentes desde el primer día</strong> y solicita
          un aumento al <strong>50%</strong> si tienes una suscripción activa.
        </p>

        <div className="job-page__cta-container">
          <button className="job-page__cta-button">
            Afiliarme Gratis <ArrowRight size={18} />
          </button>

          <button className="job-page__cta-button outline">
            Solicitar 50%
          </button>
        </div>
      </section>

      {/* ---------- BENEFICIOS ---------- */}
      <section className="job-page__benefits">
        <h2 className="job-page__benefits-title">¿Por qué convertirte en afiliado?</h2>

        <div className="job-page__benefit-grid">

          <div className="job-page__benefit-card">
            <TrendingUp className="job-page__icon" />
            <h3>Comienza sin invertir</h3>
            <p>Únete al programa sin pagar nada. Empieza hoy mismo.</p>
          </div>

          <div className="job-page__benefit-card">
            <Users className="job-page__icon" />
            <h3>Ideal para principiantes</h3>
            <p>No necesitas experiencia. Trabaja 100% en remoto.</p>
          </div>

          <div className="job-page__benefit-card">
            <DollarSign className="job-page__icon" />
            <h3>Comisiones recurrentes</h3>
            <p>Gana un 20% base y sube al 50% si eres usuario suscrito.</p>
          </div>

          <div className="job-page__benefit-card">
            <TrendingUp className="job-page__icon" />
            <h3>Demanda constante</h3>
            <p>Miles de personas requieren CVs cada día. Tú solo nos recomiendas.</p>
          </div>

        </div>
      </section>
    </div>
    </section>
    <Footer/>
    </>
  );
}

export default JobPage;
