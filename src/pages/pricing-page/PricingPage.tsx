import { Check, Sparkles } from "lucide-react";
import "./pricingpage.scss";

function PricingPage() {
  const plans = [
    {
      id: 1,
      name: "Plan Mensual",
      price: "$5.99",
      period: "por mes",
      highlight: false,
      benefits: [
        "Acceso ilimitado a creador de CVs",
        "Plantillas premium elegantes",
        "Descargas ilimitadas en PDF",
        "Soporte prioritario",
      ],
    },
    {
      id: 2,
      name: "Plan Semestral",
      price: "$24.99",
      period: "cada 6 meses",
      highlight: true, // el destacado
      benefits: [
        "Todo lo del plan mensual",
        "Ahorra más del 30%",
        "Acceso prioritario a nuevas funciones",
        "Insignia de miembro pro",
      ],
    },
    {
      id: 3,
      name: "Plan Anual",
      price: "$39.99",
      period: "por año",
      highlight: false,
      benefits: [
        "Todo lo del plan semestral",
        "Ahorro superior al 50%",
        "Regalo exclusivo de bienvenida",
        "Actualizaciones premium sin límite",
      ],
    },
  ];

  return (
    <section className="pricing-page">
      <div className="pricing-header">
        <h1>
          Planes diseñados para <span>impulsar tu carrera</span>
        </h1>
        <p>Elige el plan que mejor se adapte a tus necesidades y comienza a crear tu CV perfecto.</p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`pricing-card ${plan.highlight ? "highlight" : ""}`}
          >
            {plan.highlight && (
              <div className="badge">
                <Sparkles size={18} />
                Más Popular
              </div>
            )}

            <h2>{plan.name}</h2>

            <div className="price">
              <span>{plan.price}</span>
              <small>{plan.period}</small>
            </div>

            <ul className="benefits">
              {plan.benefits.map((b, index) => (
                <li key={index}>
                  <Check size={18} />
                  {b}
                </li>
              ))}
            </ul>

            <button className="btn-select">Elegir plan</button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingPage;
