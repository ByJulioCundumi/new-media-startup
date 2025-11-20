import CvTemplate from "./cv-template/CvTemplate";
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
  { id: "test", label: "Minimalista", category: ["limpio", "con foto", "elegante"], component: CvTemplate },
  { id: "default", label: "Tokyo", category: ["limpio", "con foto", "elegante"], component: CvTokyo },
];
