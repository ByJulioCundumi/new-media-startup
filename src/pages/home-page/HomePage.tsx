import React, { useEffect } from "react";
import "./homepage.scss";
import { setSidebar } from "../../reducers/sidebarSlice";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Hero from "./hero/Hero";
import { setAllowQrCode } from "../../reducers/identitySlice";
import JobOffer from "../../components/job-offer/JobOffer";
import ColorFontPopup from "../../components/color-font-popup/ColorFontPopup";
import { closePopup, openPopup, restoreDefaults } from "../../reducers/colorFontSlice";
import SectionProgress from "../../components/section-progress/SectionProgress";
import QrBoxEditor from "../../components/qr-box-editor/QrBoxEditor";
import { resetCvSections } from "../../reducers/cvSectionsSlice";
import type { IState } from "../../interfaces/IState";
import { FaAmazon, FaBriefcase, FaBuilding, FaGlobe, FaGoogle, FaIndustry, FaLaptopCode, FaMicrosoft, FaQuoteLeft } from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { sidebarOption } = useSelector((state: IState) => state.sidebar);

  useEffect(() => {
    dispatch(setSidebar("home"));
    dispatch(setAllowQrCode(true));
    dispatch(openPopup());

    return () => {
      dispatch(setAllowQrCode(false));
      dispatch(restoreDefaults());
      dispatch(resetCvSections());
      dispatch(closePopup())
    };
  }, []);

  return (
    <section className="home-page">
      <Hero /> 

      {/* ===== CONTENIDO PRINCIPAL ===== */}
      <div className="home-page__content">
        <div className="home-page__content--text">
          <h2>
            Personaliza  {" "}
            <span style={{ color: "#ffb120ff", fontWeight: "500" }}>
              Tus CVs
            </span>
          </h2>
          <p>Puedes Modificar el orden de las secciones en tu cv, elejir los colores de tu preferencia, asignar un QR para ver tus cvs en linea y mucho màs.</p>
        </div>

        <div className="home-page__content--tools">
          {sidebarOption === "home" && <div className="home-page__content--box-one"><SectionProgress /></div> }
          {sidebarOption === "home" && <div className="home-page__content--box-two"><ColorFontPopup /></div> }
          {sidebarOption === "home" && <div className="home-page__content--box-three"><QrBoxEditor /></div> }
        </div>
      </div>

      {/* ===== EMPRESAS ===== */}
<section className="home-page__companies">
  <span className="eyebrow">Empresas donde aplican nuestros usuarios</span>
  <h2>CVs compatibles con procesos reales de selección</h2>
  <p>
    Nuestros CVs son utilizados para postularse a empresas tecnológicas,
    consultoras y startups a nivel global.
  </p>

  <div className="companies-grid">
    <div className="company-icon">
      <FaGoogle />
      <span>Google</span>
    </div>

    <div className="company-icon">
      <FaAmazon />
      <span>Amazon</span>
    </div>

    <div className="company-icon">
      <FaMicrosoft />
      <span>Microsoft</span>
    </div>

    <div className="company-icon">
      <FaLaptopCode />
      <span>Tech Companies</span>
    </div>

    <div className="company-icon">
      <FaIndustry />
      <span>Consultoras</span>
    </div>

    <div className="company-icon">
      <FaBriefcase />
      <span>Corporativos</span>
    </div>

    <div className="company-icon">
      <FaBuilding />
      <span>Startups</span>
    </div>

    <div className="company-icon">
      <FaGlobe />
      <span>Empresas Remotas</span>
    </div>
  </div>

  <small className="companies-note">
    Los íconos representan categorías y tipos de empresas.
  </small>
</section>

      {/* ===== TESTIMONIOS ===== */}
<section className="home-page__testimonials">
  <h2>Lo que dicen nuestros usuarios</h2>

  <div className="testimonials-carousel">
    <div className="carousel-track">
      {/* Grupo 1 */}
      <div className="testimonial-card">
        <FaQuoteLeft />
        <p>
          En menos de una semana conseguí dos entrevistas. El diseño del CV
          marca una diferencia enorme.
        </p>
        <div className="author">
          <strong>Ana Rodríguez</strong>
          <span>Diseñadora UX</span>
        </div>
      </div>

      <div className="testimonial-card">
        <FaQuoteLeft />
        <p>
          Nunca había sido tan fácil crear un CV moderno y adaptable para
          diferentes ofertas.
        </p>
        <div className="author">
          <strong>Carlos Méndez</strong>
          <span>Desarrollador Frontend</span>
        </div>
      </div>

      <div className="testimonial-card">
        <FaQuoteLeft />
        <p>
          El QR con mi CV online fue clave. Los reclutadores lo mencionan en
          las entrevistas.
        </p>
        <div className="author">
          <strong>Laura Gómez</strong>
          <span>Marketing Digital</span>
        </div>
      </div>

      {/* Grupo 2 (duplicado para loop infinito) */}
      <div className="testimonial-card">
        <FaQuoteLeft />
        <p>
          En menos de una semana conseguí dos entrevistas. El diseño del CV
          marca una diferencia enorme.
        </p>
        <div className="author">
          <strong>Ana Rodríguez</strong>
          <span>Diseñadora UX</span>
        </div>
      </div>

      <div className="testimonial-card">
        <FaQuoteLeft />
        <p>
          Nunca había sido tan fácil crear un CV moderno y adaptable para
          diferentes ofertas.
        </p>
        <div className="author">
          <strong>Carlos Méndez</strong>
          <span>Desarrollador Frontend</span>
        </div>
      </div>

      <div className="testimonial-card">
        <FaQuoteLeft />
        <p>
          El QR con mi CV online fue clave. Los reclutadores lo mencionan en
          las entrevistas.
        </p>
        <div className="author">
          <strong>Laura Gómez</strong>
          <span>Marketing Digital</span>
        </div>
      </div>
    </div>
  </div>
</section>


      {/* ===== OFERTA LABORAL ===== */}
      <div className="job-page__commissions">
        {/* ===== OFERTA LABORAL ===== */}
              <div className="home-page__offer">
                <h2 className="home-page__job">
                  Programa {""}
                  <span style={{ color: "#ffb120ff", fontWeight: "500" }}>
                      De Afiliados
                    </span>
                </h2>
                <p style={{textAlign: "center", color: "#818181ff"}}>Gana comisiones de hasta el 70% por promocionar nuestro creador de Curriculums</p>
                
                <JobOffer />
              </div>

              <h1 className="job-page__badge">
          <span className="job-page__typewriter" style={{fontWeight: 300}}>¡Solo </span>{" "}
          <span className="job-page__typewriter">
            <Typewriter
              words={["Miembros Activos!"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </span>
        </h1>
              </div>

      <Footer />
    </section>
  );
};

export default HomePage;
