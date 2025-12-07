import { ArrowRight, DollarSign, TrendingUp, Users, Sparkle } from "lucide-react";
import "./hero.scss";

function Hero() {
  const plans = [
    {
      id: 1,
      name: "Plan Mensual",
      price: 5.99,
      icon: <DollarSign size={34} />,
    },
    {
      id: 2,
      name: "Plan Semestral",
      price: 19.99,
      icon: <TrendingUp size={34} />,
    },
    {
      id: 3,
      name: "Plan Anual",
      price: 29.99,
      icon: <Sparkle size={34} />,
    },
  ];

  return (
    <div className="hero-page">

      {/* ---------- HERO SECTION ---------- */}
      <div className="hero">
        <h1 className="hero-title">
          Trabaja En Remoto, Sin Experiencia
          <span>Gana Dinero Promocionando Nuestra Plataforma</span>
        </h1>

        <p className="hero-subtitle">
              Monetiza tu tiempo libre y Tabaja desde cualquier lugar sin horarios.  
              Gana un <strong>20% de comisión desde el primer día</strong> y solicita
              un aumento al <strong>70%</strong> si tienes una suscripción activa.
        </p>

        <button className="cta-button">
          Afiliarme Gratis <ArrowRight size={18} />
        </button>

         <button className="cta-button">
          Solicitar 70%
        </button>
      </div>

      {/* ---------- BENEFICIOS ---------- */}
      <div className="benefits">
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
            <h3>Comisiones superiores</h3>
            <p>Gana un 20% base y sube al 70% si eres usuario suscrito.</p>
          </div>

          <div className="benefit-card">
            <TrendingUp className="icon" />
            <h3>Demanda constante</h3>
            <p>Miles de usuarios requieren CVs cada día. Tú solo recomiendas.</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Hero;
