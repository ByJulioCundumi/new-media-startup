import CvRoma from "./cv-roma/CvRoma";
import CvTokyo from "./cv-tokyo/CvTokyo";

export const templates = [
  { id: "Tokio", label: "Tokio", categories: ["limpio", "con foto", "elegante"], component: CvTokyo },
  { id: "Roma", label: "Roma", categories: ["limpio", "con foto", "elegante"], component: CvRoma },
  { id: "Tokios", label: "Tokio", categories: ["limpio", "con foto", "elegante"], component: CvTokyo },
  { id: "Romas", label: "Roma", categories: ["limpio", "con foto", "elegante"], component: CvRoma },
  { id: "Romat", label: "Roma", categories: ["limpio", "con foto", "elegante"], component: CvRoma },
];
