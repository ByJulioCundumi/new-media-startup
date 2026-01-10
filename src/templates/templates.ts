import CvRoma from "./cv-roma/CvRoma";
import CvTokyo from "./cv-tokyo/CvTokyo";
import CvViena from "./cv-viena/CvViena";

export const templates = [
  { id: "Tokio", label: "Tokio", categories: ["Limpio", "Sin foto", "Elegante", "Premium"], component: CvTokyo },
  { id: "Roma", label: "Roma", categories: ["Limpio", "Sin foto", "Elegante", "Premium"], component: CvRoma },
  { id: "Viena", label: "Viena", categories: ["dev", "Limpio", "Con foto", "Elegante", "Premium"], component: CvViena },
];
