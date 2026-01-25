import "./affiliatepage.scss";
import { motion } from "framer-motion";
import JobOffer from "../../components/job-offer/JobOffer";
import JobFaq from "../../components/job-faq/JobFaq";
import Footer from "../../components/footer/Footer";
import YoutubeEmbed from "../../components/youtube-embed/YoutubeEmbed";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useEffect } from "react";
import { setSidebar } from "../../reducers/sidebarSlice";
import { useDispatch } from "react-redux";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";

const AffiliatePage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSidebar("affiliates"));
  }, [dispatch]);

  return (
    <>
      <section className="affiliate">
        <div className="affiliate__container">

          {/* HERO */}
          <motion.div
            className="affiliate__hero"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >

            {/* BADGE + FLOATING CARDS */}
            <div className="affiliate__badge-wrapper">

              {/* LEFT CARD */}
              <motion.div
                className="affiliate__float-card affiliate__float-card--left"
                animate={{ y: [-12, 12] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "linear"
                }}
              >
                <span><GiTrophyCup /></span>
                <p>50% de comisión</p>
              </motion.div>

              {/* BADGE */}
              <span className="affiliate__badge">
                Programa exclusivo para miembros
              </span>

              {/* RIGHT CARD */}
              <motion.div
                className="affiliate__float-card affiliate__float-card--right"
                animate={{ y: [12, -12] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "linear"
                }}
              >
                <span><FaMoneyBillTrendUp /></span>
                <p>Pagos en USD</p>
              </motion.div>

            </div>

            <h1 className="affiliate__title">
              Gana <span>El 50% De Comisión</span>
              <br /> Por Compartir
            </h1>

            <p className="affiliate__subtitle">
              Únete a nuestro programa de afiliados y genera ingresos en USD
              recomendando nuestra plataforma para crear CVs profesionales.
            </p>

          </motion.div>

          {/* CONTENT */}
          <div className="affiliate__job-card">
            <JobOffer />

            <div className="affiliate__video">
              <p>
                <MdKeyboardArrowDown />
                Descubre Cómo Aplicar
                <MdKeyboardArrowDown />
              </p>
              <YoutubeEmbed />
            </div>

            <JobFaq />
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default AffiliatePage;
