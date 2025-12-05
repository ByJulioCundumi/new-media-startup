import CvRoma from "./cv-roma/CvRoma";
import CvTokyo from "./cv-tokyo/CvTokyo";

export const templates = [
  { id: "default", label: "Tokio", category: ["limpio", "con foto", "elegante"], component: CvTokyo },
  { id: "Roma", label: "Roma", category: ["limpio", "con foto", "elegante"], component: CvRoma },
  { id: "Roma", label: "Roma", category: ["limpio", "con foto", "elegante"], component: CvRoma },
  { id: "Roma", label: "Roma", category: ["limpio", "con foto", "elegante"], component: CvRoma },
];
