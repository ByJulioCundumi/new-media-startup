import "./jobpage.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";

import JobOffer from "../../components/job-offer/JobOffer";
import JobFaq from "../../components/job-faq/JobFaq";
import { Typewriter } from "react-simple-typewriter";

function JobPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebar("affiliate"));
  }, [dispatch]);

  return (
    <section className="job-page">
      <div className="job-page__hero-page">
        <div className="job-page__commissions">
          {/* ===== OFERTA ===== */}
          <div className="job-page__offer">
            <div className="job-page__offer-box">
              <h2 className="job-page__title">
              Eres miembro suscrito de{" "}
              <span className="job-page__highlight">cvremoto.com?</span>
            </h2>

            <p className="job-page__subtitle">
              Gana comisiones en USD de hasta el 50% por promocionar nuestro
              creador de currículums
            </p>

            {/* ===== BADGE ===== */}
          <h1 className="job-page__badge">
            <span className="job-page__typewriter light"></span>
            <span className="job-page__typewriter">
              <Typewriter
                words={["¡Exclusivo Para Miembros!"]}
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

            <JobOffer />
          </div>

          <JobFaq />
        </div>
      </div>
    </section>
  );
}

export default JobPage;
