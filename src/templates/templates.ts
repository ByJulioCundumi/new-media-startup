import CvRoma from "./cv-roma/CvRoma";
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
  { id: "adfsdf", label: "Tokio", category: ["limpio", "con foto", "elegante"], component: CvTokyo },
  { id: "default", label: "Roma", category: ["limpio", "con foto", "elegante"], component: CvRoma },
];
