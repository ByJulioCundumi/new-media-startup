import React, { useEffect } from "react";
import "./homepage.scss";
import { setSidebar } from "../../reducers/sidebarSlice";
import { useDispatch } from "react-redux";
import { setAllowQrCode } from "../../reducers/identitySlice";
import { closePopup, openPopup, restoreDefaults } from "../../reducers/colorFontSlice";
import { resetCvSections } from "../../reducers/cvSectionsSlice";
import { FaAmazon, FaBriefcase, FaBuilding, FaGlobe, FaGoogle, FaIndustry, FaLaptopCode, FaMicrosoft, FaQuoteLeft } from "react-icons/fa";
import JobPage from "../job-page/JobPage";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

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

<JobPage/>
    </section>
  );
};

export default HomePage;
