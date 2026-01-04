import "./jobpage.scss";
import {
  ArrowRight,
  TrendingUp,
  DollarSign,
  Users,
  Sparkle,
  Award,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";
import Footer from "../../components/footer/Footer";
import JobOffer from "../../components/job-offer/JobOffer";
import { RiArrowDownWideLine } from "react-icons/ri";
import JobFaq from "../../components/job-faq/JobFaq";
import { Typewriter } from "react-simple-typewriter";
import { TbChevronsUp, TbRosetteDiscountCheckFilled } from "react-icons/tb";
import { BsCashCoin, BsFillNodePlusFill, BsGraphUpArrow, BsPatchCheck } from "react-icons/bs";
import { IoCheckmarkDoneOutline } from "react-icons/io5";

function JobPage() {
  const [page, setPage] = useState<"info" | "affiliates" | "request">("info");
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSidebar("affiliate"))
  },[])

  const floatingUsers = [
    { id: 1, name: "María G.", earnings: "+70% de comisión" },
     { id: 2, name: "Juan S.", earnings: "+70% de comisión" },
     { id: 3, name: "María G.", earnings: "+70% de comisión" },
     { id: 4, name: "Juan S.", earnings: "+70% de comisión" },
  ];
  

  return (
    <>
      <section className="job-page">
<div className="job-page__hero-page">

      {/* ---------- TARJETAS FLOTANTES ---------- */}
      <div className="job-page__floating-users">
        {floatingUsers.map((u, index) => (
          <div
            key={u.id}
            className={`job-page__floating-card job-page__card-${index + 1}`}
          >
            <div className="job-page__avatar"><TbRosetteDiscountCheckFilled /></div>
            <div>
              <p className="job-page__user-name">{u.name}</p>
              <span className="job-page__user-earn">{u.earnings}</span>
            </div>
          </div>
        ))}
      </div>

      {/* ---------- HERO SECTION ---------- */}
      <section className="job-page__hero">
        <h1 className="job-page__hero-title">
          <span>Gana Hasta Un <span style={{textDecoration: "underline"}}>70%</span></span> De Comision
        </h1>

        <p className="job-page__hero-subtitle">
          Recibe comisiones en USD por promocionar Nuestra Plataforma para Crear CVs. Comienza con un 50% de comision, con posibilidad de aumento hasta el <strong>70%</strong>.
        </p>

        <p className="job-page__hero-subtitle-b">
          Recibe comisiones en USD por promocionar Nuestro Creador de CVs. Comienza con un 50%, con posibilidad de aumento hasta <strong>70%</strong>.
        </p>

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
      </section>

      


       <div className="job-page__commissions">
        {/* ===== OFERTA LABORAL ===== */}
              <div className="home-page__offer">
                <p style={{textAlign: "center", color: "#818181ff"}}>Unete a cientos de afiliados que ya generan ingresos en linea.</p>
                
                <JobOffer />
              </div>

        <JobFaq/>
      </div>

      {/* ---------- BENEFICIOS ---------- */}
      <section className="job-page__benefits">
        <h2 className="job-page__benefits-title">¿Por qué convertirte en afiliado?</h2>

        <div className="job-page__benefit-grid">

          <div className="job-page__benefit-card">
            <TrendingUp className="job-page__icon" />
            <h3>Comienza sin invertir</h3>
            <p>Únete al programa sin pagar nada. Empieza hoy mismo.</p>
          </div>

          <div className="job-page__benefit-card">
            <Users className="job-page__icon" />
            <h3>Ideal para principiantes</h3>
            <p>No necesitas experiencia. Trabaja 100% en remoto.</p>
          </div>

          <div className="job-page__benefit-card">
            <DollarSign className="job-page__icon" />
            <h3>Comisiones recurrentes</h3>
            <p>Gana un 20% base y sube al 50% si eres usuario suscrito.</p>
          </div>

          <div className="job-page__benefit-card">
            <TrendingUp className="job-page__icon" />
            <h3>Demanda constante</h3>
            <p>Miles de personas requieren CVs cada día. Tú solo nos recomiendas.</p>
          </div>

        </div>
      </section>
    </div>
    </section>
    <Footer/>
    </>
  );
}

export default JobPage;
