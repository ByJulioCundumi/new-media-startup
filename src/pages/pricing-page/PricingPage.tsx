import { Check, Sparkles } from "lucide-react";
import { IoCardOutline, IoDiamondOutline, IoInformation } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";
import "./pricingpage.scss";
import { useEffect } from "react";
import { FaUserPlus } from "react-icons/fa6";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { GrContactInfo } from "react-icons/gr";
import { LuMousePointerClick } from "react-icons/lu";

function PricingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(setSidebar("pricing"));
  }, [dispatch]);

  const plans = [
    {
      name: "Plan Gratuito",
      price: "$0",
      period: "Funciones Limitadas",
      highlight: true,
      isFree: true,
      benefits: [
        "Crea CVs",
        "Guarda hasta 11 CVs online",
        "Plantilas con marca de agua",
        "Descargas en PDF ilimitadas",
        "Programa de afiliados",
        "Comisión de afiliado +20%",
      ],
    },
    {
      name: "Plan Mensual",
      price: "$9.99 US",
      period: "Por Mes",
      highlight: true,
      popular: true,
      benefits: [
        "Crea CVs ilimitados",
        "Guarda CVs ilimitados online",
        "Acceso a todas las plantillas",
        "Plantillas sin marca de agua",
        "Descargas en PDF ilimitadas",
        "Programa de afiliados",
        "Comisión de afiliado +50%",
      ],
    },
    {
      name: "Plan Anual",
      price: "$48.00 US",
      period: "Por Año ⬎",
      monthlyEquivalent: "$4.00/mes",
      savings: "Ahorras 60%",
      highlight: true,
      popular: false,
      benefits: [
        "Crea CVs ilimitados",
        "Guarda CVs ilimitados online",
        "Acceso a todas las plantillas",
        "Plantillas sin marca de agua",
        "Descargas en PDF ilimitadas",
        "Programa de afiliados",
        "Comisión de afiliado +50%",
      ],
    },
  ];

  return (
    <section className="pricing-page">
      <div className="pricing-header">
        <h1>
          Elige un plan Y <span>Consigue Empleo</span>
        </h1>
        <p>
          Crea CVs profesionales que aumentan tus probabilidades de ser contratado, Sorprende a los reclutadores.
        </p>
      </div>

      <div className="pricing-grid">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`pricing-card ${plan.highlight ? "pricing-highlight" : ""} ${plan.isFree ? "pricing-free" : ""}`}
          >
            {plan.popular && (
              <div className="pricing-badge">
                <Sparkles size={18} />
                Más Popular
              </div>
            )}

            <div className="pricing-card-header">
              <h2>
                {plan.isFree ? (
                  <MdOutlineVerifiedUser className="icon" />
                ) : (
                  <IoDiamondOutline className="icon" />
                )}
                {plan.name}
              </h2>
            </div>

            <div className="pricing-price">
              <span className="pricing-amount">{plan.price}</span>
              <small className="pricing-period">{plan.period}</small>
              {plan.monthlyEquivalent && (
                <div className="pricing-equivalent">
                  {plan.monthlyEquivalent}
                  <span className="pricing-savings">{plan.savings}</span>
                </div>
              )}
            </div>

            <ul className="pricing-benefits">
              {plan.benefits.map((benefit, index) => (
                <li key={index}>
                  <Check size={18} />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>

            <button className={`pricing-btn-select ${plan.isFree ? "pricing-free-btn" : ""}`}>
              {plan.isFree ? "Empezar Gratis" : "Elegir Plan"}
            </button>
          </div>
        ))}
      </div>

      {/* SECCIÓN MEJORADA: INVITACIÓN AL PROGRAMA DE AFILIADOS */}
<div className="affiliate-invitation">
    <h2>¿Te Interesa Generar <br /> <span>Ingresos Extras ?</span></h2>
  
  <p className="affiliate-subtitle">
    Únete a nuestro <Link to={"/affiliate"} ><strong className="affiliate-link">Programa de Afiliados</strong></Link> y obtén comisiones recurrentes 
    de hasta el <strong>50%</strong> cada vez que usen tu enlace de afiliado.
  </p>
</div>
    </section>
  );
}

export default PricingPage;