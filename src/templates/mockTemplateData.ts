import type { ITemplateProps } from "../interfaces/ITemplateProps";
import { initialSections, initialOrder } from "../reducers/cvSectionsSlice";

export const mockTemplateData: ITemplateProps = {
   identitySection: {
    photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyW1LFVLrTeSynKd6fZW2JFbbIwM3-jBJilg&s",
    firstName: "Julio",
    lastName: "Cundumi",
    jobTitle: "Desarrollador Web",
    allowCvPhoto: false,
    allowQrCode: false,
    qrCodeUrl: ""
  },

  personalInfo: [
    { id: "1", name: "direccion", value: "+57 300 123 4567" },
    { id: "2", name: "nacionalidad", value: "usuario@mail.com" },
  ],

  contactSection: [
    { id: "ct1", type: "Email", value: "usuario@mail.com" },
    { id: "ct2", type: "WhatsApp", value: "+57 300 123 4567" }
  ],

  profileSection: "Profesional con experiencia en desarrollo web, orientado a resultados y resolución de problemas.",

  educationSection: [
    {
      id: "e1",
      institution: "Universidad Nacional",
      location: "Bogotá",
      title: "Ingeniería de Sistemas",
      startMonth: "Enero",
      startYear: "2016",
      endMonth: "Diciembre",
      endYear: "2020",
      present: false,
      description: "Enfoque en desarrollo frontend y backend.",
      showExtraInfo: true
    }
  ],

  experienceSection: [
    {
      id: "x1",
      position: "Desarrollador Frontend",
      employer: "Tech Solutions",
      location: "Medellín",
      startMonth: "Marzo",
      startYear: "2021",
      endMonth: "",
      endYear: "",
      present: true,
      description: "Construcción de interfaces modernas con React."
    },
    {
      id: "x2",
      position: "Desarrollador Frontend",
      employer: "Tech Solutions",
      location: "Medellín",
      startMonth: "Marzo",
      startYear: "2021",
      endMonth: "",
      endYear: "",
      present: true,
      description: "Construcción de interfaces modernas con React."
    }
  ],

  skillSection: [
    { id: "s1", name: "React", level: "Profesional" },
    { id: "s2", name: "TypeScript", level: "Profesional" },
    { id: "s3", name: "CSS", level: "Bueno" }
  ],

  languageSection: [
    { id: "l1", name: "Español", level: "Nativo" },
    { id: "l2", name: "Inglés", level: "B2" }
  ],

  linkSection: [
    { id: "lk1", name: "LinkedIn", url: "linkedin.com/user", visible: true },
    { id: "lk2", name: "GitHub", url: "github.com/user", visible: true }
  ],

  courseSection: [
    {
      id: "c1",
      name: "React Avanzado",
      institution: "Udemy",
      startDate: "2022",
      endDate: "2022",
      description: "Hooks, contextos y optimización."
    }
  ],

  hobbieSection: [
    { id: "h1", name: "Fotografía" },
    { id: "h2", name: "Ciclismo" }
  ],

  referenceSection: [
    {
      id: "r1",
      name: "Carlos Pérez",
      company: "TechSoft",
      phone: "+57 300 987 6543",
      email: "carlos@empresa.com"
    }
  ],

  awardSection: [
    {
      id: "a1",
      name: "Mejor Desarrollador",
      date: "2023",
      description: "Entrega anual de Tech Solutions"
    }
  ],

  customSection: [
    {
      id: "ct1",
      value: "Disponible para trabajo remoto e híbrido."
    }
  ],

  sectionsConfig: initialSections,
  sectionsOrder: initialOrder
};
