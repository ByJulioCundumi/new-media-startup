import CvRoma from "./cv-roma/CvRoma";
import CvTokyo from "./cv-tokyo/CvTokyo";

export const templates = [
  { id: "Tokio", label: "Tokio", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvTokyo },
  { id: "Roma", label: "Roma", categories: ["Limpio", "Con foto", "Elegante", "Gratis"], component: CvRoma },
  { id: "Tokios", label: "Tokio", categories: ["Limpio", "Con foto", "Elegante"], component: CvTokyo },
  { id: "Romas", label: "Roma", categories: ["Limpio", "Con foto", "Elegante"], component: CvRoma },
  { id: "Romat", label: "Roma", categories: ["Limpio", "Con foto", "Elegante"], component: CvRoma },
];
