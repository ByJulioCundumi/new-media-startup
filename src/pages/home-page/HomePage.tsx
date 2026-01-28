import React, { useEffect } from "react";
import "./homepage.scss";
import { useDispatch } from "react-redux";
import { setAllowQrCode } from "../../reducers/identitySlice";
import { closePopup, openPopup, restoreDefaults } from "../../reducers/colorFontSlice";
import { resetCvSections } from "../../reducers/cvSectionsSlice";
import { FaAmazon, FaBriefcase, FaBuilding, FaGlobe, FaGoogle, FaIndustry, FaLaptopCode, FaMicrosoft, FaQuoteLeft } from "react-icons/fa";
import JobPage from "../job-page/JobPage";
import CampaignsSection from "../campaigns-section/CampaignsSection";
import VideoSection from "../video-section/VideoSection";
import Hero from "./hero/Hero";
import Footer from "../../components/footer/Footer";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
    <>
      <section className="home-page">
      <Hero/>
      

      {/* ===== EMPRESAS ===== */}
<section className="home-page__companies">
  <span className="eyebrow">Empresas donde aplican nuestros usuarios</span>
  <h2>CVs compatibles con procesos reales de selección</h2>
  <p>
    Nuestros CVs son utilizados para postularse a empresas tecnológicas,
    consultoras y startups a nivel global.
  </p>

  <CampaignsSection/>
</section>

<VideoSection/>

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
<Footer/>
    </>
  );
};

export default HomePage;
