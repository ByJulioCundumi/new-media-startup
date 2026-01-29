import "./jobpage.scss";
import { useSelector } from "react-redux";

import JobOffer from "../../components/job-offer/JobOffer";
import JobFaq from "../../components/job-faq/JobFaq";
import { Typewriter } from "react-simple-typewriter";
import type { IState } from "../../interfaces/IState";

function JobPage() {
  const {sidebarOption} = useSelector((state:IState)=>state.sidebar)

  return (
    <section className={`job-page ${sidebarOption === "pricing" && "more-p"}`}>
      {/* ===== WAVE SUPERIOR ===== */}
      <div className="wave-top">
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="wave-top__svg"
        >
          <path d="M0,50 C120,80 240,20 360,30 480,40 600,90 720,70 840,50 960,20 1080,30 1200,40 1320,80 1440,50 L1440,0 L0,0 Z" />
        </svg>

        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="wave-top__svg"
        >
          <path d="M0,50 C120,80 240,20 360,30 480,40 600,90 720,70 840,50 960,20 1080,30 1200,40 1320,80 1440,50 L1440,0 L0,0 Z" />
        </svg>
      </div>

      {/* ===== CONTENIDO ===== */}
      <div className="job-page__hero-page">
        <div className="job-page__commissions">
          <div className="job-page__offer">
            <div className="job-page__offer-box">
              <h2 className="job-page__title">
                Genera Ingresos{" "}
                <span className="job-page__highlight">Como Afiliado</span>
              </h2>

              <p className="job-page__subtitle">
                Gana comisiones en USD de hasta el 50% por promocionar nuestro
                creador de currículums
              </p>

              <h1 className="job-page__badge">
                <span className="job-page__typewriter">
                  <Typewriter
                    words={["¡Exclusivo Para Miembros!"]}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={70}
                  />
                </span>
              </h1>
            </div>

            <JobOffer />
          </div>

        </div>
      </div>
    </section>
  );
}

export default JobPage;
