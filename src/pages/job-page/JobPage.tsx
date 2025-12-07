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
import ProfileAvatar from "../../components/profile-avatar/ProfileAvatar";
import Hero from "./hero/Hero";
import Affiliates from "./affiliates/Affiliates";
import CommissionRequest from "./commission-request/CommissionRequest";
import { useDispatch } from "react-redux";
import { setSidebar } from "../../reducers/sidebarSlice";

function JobPage() {
  const [page, setPage] = useState<"info" | "affiliates" | "request">("info");
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(setSidebar("affiliate"))
  },[])

  return (
    <section className="job-page">

      {/* ---------- NAVBAR FIXED ---------- */}
      <nav className="jp-navbar">
        <div className="jp-nav-logo">Afiliados</div>

        <div className="jp-nav-links">
          <button
            onClick={() => setPage("info")}
            className={page === "info" ? "active" : ""}
          >
            Info
          </button>

          <button
            onClick={() => setPage("affiliates")}
            className={page === "affiliates" ? "active" : ""}
          >
            Miembros
          </button>

          <button
            onClick={() => setPage("request")}
            className={page === "request" ? "active" : ""}
          >
            Solicitar 70% 
          </button>
        </div>

        <ProfileAvatar/>
      </nav>


      {/* ====================================================== */}
      {/* ===================== PÁGINA INFO ===================== */}
      {/* ====================================================== */}
      {page === "info" && (
        <div className="fade-page">
          {/* -------- HERO -------- */}
          <Hero/>
        </div>
      )}


      {/* ====================================================== */}
      {/* ================= PÁGINA AFILIADOS =================== */}
      {/* ====================================================== */}
      {page === "affiliates" && (
        <div className="fade-page">
          <Affiliates/>
        </div>
      )}


      {/* ====================================================== */}
      {/* =================== PÁGINA REQUEST ==================== */}
      {/* ====================================================== */}
      {page === "request" && (
        <div className="fade-page">
          <CommissionRequest/>
        </div>
      )}

    </section>
  );
}

export default JobPage;
