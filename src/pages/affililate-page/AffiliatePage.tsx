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

const AffiliatePage = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setSidebar("affiliates"));
      }, []);

  return (
    <>
        <section className="affiliate">
      <div className="affiliate__container">

        {/* HERO */}
        <motion.div
          className="affiliate__hero"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="affiliate__badge">Programa exclusivo para miembros</span>
          <h1 className="affiliate__title">
            Gana <span>El 50% De Comisión</span> <br /> Por Compartir
          </h1>
          <p className="affiliate__subtitle">
            Únete a nuestro programa de afiliados y genera ingresos en USD
            recomendando nuestra plataformas para crear CVs
            profesionales.
          </p>
        </motion.div>

        <div className="affiliate__job-card">
            <JobOffer/>
            <div className="affiliate__video">
                <p><MdKeyboardArrowDown /> Descubre Como Aplicar <MdKeyboardArrowDown /></p>
                <YoutubeEmbed/>
            </div>
            <JobFaq/>
        </div>

      </div>
    </section>
    <Footer/>
    </>
  );
};

export default AffiliatePage;
