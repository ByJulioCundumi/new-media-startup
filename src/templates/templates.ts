import CvTemplate from "./cv-template/CvTemplate";

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
  { id: "default", label: "Minimalista", category: ["limpio", "con foto", "elegante"], component: CvTemplate },
];
