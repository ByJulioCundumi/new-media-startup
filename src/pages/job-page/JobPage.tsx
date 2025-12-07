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

      {/* ====================================================== */}
      {/* ===================== PÁGINA INFO ===================== */}
      {/* ====================================================== */}
      {page === "info" && (
        <div className="fade-page">
          {/* -------- HERO -------- */}
          <Hero/>
        </div>
      )}

    </section>
  );
}

export default JobPage;
