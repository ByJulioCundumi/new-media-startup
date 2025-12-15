import { Check, Sparkles } from "lucide-react";
import { IoCardOutline, IoDiamondOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";
import "./pricingpage.scss";
import { useEffect } from "react";

function PricingPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebar("pricing"));
  }, [dispatch]);

  const plans = [
    {
      name: "Plan Gratuito",
      price: "$0",
      period: "Beneficios Limitado",
      highlight: false,
      isFree: true,
      benefits: [
        "Crear CVs ilimitados en local",
        "Guarda hasta 11 CVs online",
        "Plantilas con marca de agua",
        "Descargas en PDF ilimitadas",
        "Programa de afiliados",
        "Comisión de afiliado +20%",
        "Comisiones recurrentes cada mes",
      ],
    },
    {
      name: "Plan Mensual",
      price: "$14.99",
      period: "por mes",
      highlight: false,
      benefits: [
        "Crear CVs ilimitados en local",
        "Guarda CVs ilimitados online",
        "Acceso a todas las plantillas",
        "Plantillas sin marca de agua",
        "Descargas en PDF ilimitadas",
        "Programa de afiliados",
        "Comisión de afiliado +70%",
        "Comisiones recurrentes cada mes",
      ],
    },
    {
      name: "Plan Anual",
      price: "$59.99",
      period: "por año",
      monthlyEquivalent: "$5.00/mes",
      savings: "Ahorras 67%",
      highlight: true,
      popular: true,
      benefits: [
        "Crear CVs ilimitados en local",
        "Guarda CVs ilimitados online",
        "Acceso a todas las plantillas",
        "Plantillas sin marca de agua",
        "Descargas en PDF ilimitadas",
        "Programa de afiliados",
        "Comisión de afiliado +70%",
        "Comisiones recurrentes cada mes",
      ],
    },
  ];

  return (
    <section className="pricing-page">
      <div className="pricing-header">
        <h1>
          Planes diseñados para <span>impulsar tu carrera</span>
        </h1>
        <p>
          Crea CVs profesionales con o sin marca de agua. Todos los planes incluyen acceso al
          programa de afiliados con comisiones recurrentes.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.highlight ? "highlight" : ""} ${plan.isFree ? "free" : ""}`}
          >
            {plan.popular && (
              <div className="badge">
                <Sparkles size={18} />
                Más Popular
              </div>
            )}

            <div className="card-header">
              <h2>
                {plan.isFree ? (
                  <IoCardOutline className="icon" />
                ) : (
                  <IoDiamondOutline className="icon" />
                )}
                {plan.name}
              </h2>
            </div>

            <div className="price">
              <span className="amount">{plan.price}</span>
              <small className="period">{plan.period}</small>
              {plan.monthlyEquivalent && (
                <div className="equivalent">
                  {plan.monthlyEquivalent}
                  <span className="savings">{plan.savings}</span>
                </div>
              )}
            </div>

            <ul className="benefits">
              {plan.benefits.map((benefit, index) => (
                <li key={index}>
                  <Check size={18} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button className={`btn-select ${plan.isFree ? "free-btn" : ""}`}>
              {plan.isFree ? "Empezar Gratis" : "Elegir Plan"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default PricingPage;