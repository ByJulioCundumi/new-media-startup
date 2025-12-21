import { Check, Sparkles, X } from "lucide-react";
import { IoDiamondOutline } from "react-icons/io5";
import { MdOutlineVerifiedUser, MdWorkOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";
import "./pricingpage.scss";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";
import type { IState } from "../../interfaces/IState";
import { FiAlertTriangle } from "react-icons/fi";
import { LuBadgeInfo } from "react-icons/lu";
import { TbInfoTriangleFilled, TbMessageFilled } from "react-icons/tb";
import { openAuthModal } from "../../reducers/authModalSlice";

function PricingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: IState) => state.user);

  // Estado para el modal
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [pendingCheckoutUrl, setPendingCheckoutUrl] = useState<string | null>(null);

  useEffect(() => {
    dispatch(setSidebar("pricing"));
  }, [dispatch]);

  const HOTMART_PRODUCT_ID = "G103443003O";

  const OFFER_CODES = {
    MONTHLY: "dfgvrzyz",
    ANNUAL: "2kgiqim6",
  };

  const handleSelectPlan = (planName: string) => {
    if (planName === "Plan Gratuito") {
      navigate("/cvs");
      return;
    }

    if (!user.logged) {
      dispatch(openAuthModal({}))
      return;
    }

    let offerCode = "";
    if (planName === "Plan Mensual") offerCode = OFFER_CODES.MONTHLY;
    if (planName === "Plan Anual") offerCode = OFFER_CODES.ANNUAL;

    if (!offerCode) {
      console.error("Código de oferta no encontrado para:", planName);
      alert("Error: Plan no reconocido. Contacta soporte.");
      return;
    }

    const checkoutUrl = new URL(`https://pay.hotmart.com/${HOTMART_PRODUCT_ID}`);
    checkoutUrl.searchParams.append("off", offerCode);

    if (user.email) {
      checkoutUrl.searchParams.append("email", user.email);
    }

    if (user.userName) {
      checkoutUrl.searchParams.append("name", user.userName.trim());
    }

    checkoutUrl.searchParams.append("checkoutMode", "10");

    // Mostrar modal antes de redirigir
    setPendingCheckoutUrl(checkoutUrl.toString());
    setShowEmailModal(true);
  };

  const proceedToCheckout = () => {
    if (pendingCheckoutUrl) {
      window.location.href = pendingCheckoutUrl;
    }
    setShowEmailModal(false);
  };

  const closeModal = () => {
    setShowEmailModal(false);
    setPendingCheckoutUrl(null);
  };

  const plans = [
    {
      name: "Plan Gratuito",
      price: "$0",
      period: "Funciones Limitadas",
      highlight: true,
      isFree: true,
      popular: false,
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
      price: "$9.99",
      period: "USD / Por Mes",
      highlight: true,
      isFree: false,
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
    {
      name: "Plan Anual",
      price: "$4.99",
      period: "USD / Por Mes",
      monthlyEquivalent: "Cobro Anual / $59.99",
      savings: "Ahorras 50%",
      highlight: true,
      isFree: false,
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
  ];

  return (
    <>
      <section className="pricing-page">
        <div className="pricing-header">
          <h1>
            Elige un plan Y <span>Consigue Empleo</span>
          </h1>
          <p>
            Crea CVs profesionales que aumentan tus probabilidades de ser contratado. Sorprende a los reclutadores.
          </p>
        </div>

        <div className="pricing-grid">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card ${
                plan.highlight ? "pricing-highlight" : ""
              } ${plan.isFree ? "pricing-free" : ""}`}
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
                <small className="pricing-period">
                  {plan.period}{" "}
                  {plan.savings && (
                    <span className="pricing-savings">{plan.savings}</span>
                  )}
                </small>
                {plan.monthlyEquivalent && (
                  <div className="pricing-equivalent">
                    {plan.monthlyEquivalent}
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

              <button
                onClick={() => handleSelectPlan(plan.name)}
                className={`pricing-btn-select ${
                  plan.isFree ? "pricing-free-btn" : ""
                }`}
              >
                {plan.isFree ? "Empezar Gratis" : "Elegir Plan"}
              </button>
            </div>
          ))}
        </div>

        {/* SECCIÓN DE AFILIADOS */}
        <div className="affiliate-invitation">
          <h2>
            ¿Te Interesa Generar <br /> <span>Ingresos Extras?</span>
          </h2>

          <p className="affiliate-subtitle">
            Únete a nuestro{" "}
            <Link to={"/affiliate"}>
              <strong className="affiliate-link">
                <MdWorkOutline /> Programa de Afiliados
              </strong>
            </Link>{" "}
            y obtén comisiones recurrentes de hasta el <strong>50%</strong> cada
            vez que alguien compre con tu enlace.
          </p>
        </div>
      </section>

      <Footer />

      {/* ==================== MODAL DE ADVERTENCIA EMAIL ==================== */}
      {showEmailModal && (
        <div className="email-modal-overlay" onClick={closeModal}>
          <div className="email-modal" onClick={(e) => e.stopPropagation()}>
            <button className="email-modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <div className="email-modal-icon">
              <div className="email-modal-icon-circle">
                <TbMessageFilled size={32} />
              </div>
            </div>

            <h2>¡Antes de continuar!</h2>

            <p className="email-modal-text">
              Usa <strong style={{textDecoration: "underline"}}>el mismo email</strong> de tu cuenta <strong style={{textDecoration: "underline"}}>CV Remoto</strong> en el checkout al comprar.
            </p>

            <div className="email-modal-highlight">
              <strong>Tu email:</strong>
              <span>{user.email}</span>
            </div>

            <p className="email-modal-text">
              Si usas un email diferente, no sera posible vincular el plan seleccionado a tu cuenta.
            </p>

            <div className="email-modal-buttons">
              <button className="email-modal-btn-primary" onClick={proceedToCheckout}>
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PricingPage;