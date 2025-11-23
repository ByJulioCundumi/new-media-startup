import CvTemplate from "./cv-rio/CvRio";
import CvTokyo from "./cv-tokyo/CvTokyo";

/*
categorias - Estilo visual

Clásico
Moderno
Minimalista
Profesional
Elegante
Creativo
Corporativo
Colorido
Simple
Sin foto
Con foto
Llamativo
Limpio 
Contemporáneo
*/

export const templates = [
  { id: "default", label: "Rio", category: ["limpio", "con foto", "elegante"], component: CvTemplate },
  { id: "klm", label: "Tokyo", category: ["limpio", "con foto", "elegante"], component: CvTokyo },
];
