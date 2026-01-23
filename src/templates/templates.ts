import CvGinebra from "./cv-ginebra/CvGinebra";
import CvLima from "./cv-lima/CvLima";
import CvMedellin from "./cv-medellin/CvMedellin";
import CvMiami from "./cv-miami/CvMiami";
import CvParis from "./cv-paris/CvParis";
import CvPortland from "./cv-portland/CvPortland";
import CvPraga from "./cv-praga/CvPraga";
import CvRio from "./cv-rio/CvRio";
import CvRoma from "./cv-roma/CvRoma";
import CvSeul from "./cv-seul/CvSeul";
import CvTokyo from "./cv-tokyo/CvTokyo";
import CvViena from "./cv-viena/CvViena";

export const templates = [
  { id: "Medellin", label: "Medellin", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvMedellin },
  { id: "Tokio", label: "Tokio", categories: ["Limpio", "Sin foto", "Elegante", "Premium"], component: CvTokyo },
  { id: "Roma", label: "Roma", categories: ["Limpio", "Sin foto", "Elegante", "Premium"], component: CvRoma },
  { id: "Viena", label: "Viena", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvViena },
  { id: "Paris", label: "Paris", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvParis },
  { id: "Seul", label: "Seul", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvSeul },
  { id: "Ginebra", label: "Ginebra", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvGinebra },
  { id: "Miami", label: "Miami", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvMiami },
  { id: "Rio", label: "Rio", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvRio },
  { id: "Portland", label: "Portland", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvPortland },
  { id: "Lima", label: "Lima", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvLima },
  { id: "Praga", label: "Praga", categories: ["Limpio", "Con foto", "Elegante", "Premium"], component: CvPraga },
];
